import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray} from 'formik'
import * as yup from 'yup';
import styles from "./FormCreate.module.css"
import axios from 'axios';

const FormCreate = () => {
    const genresMovie =["Crime", "Drama", "Action", "Adventure", "Sci-Fi", "Biography", "History", "Fantasy", "Horror", "Mystery", "Thriller", "Western", "Comedy", "Romance", "Animation", "Family", "War", "Biography", "Music"];
    const genresSerie=["Drama", "Action", "War", "Crime", "Thriller", "Nature", "Adventure", "Science-Fiction", "Western", "Mystery", "Supernatural", "Family", "Romance", "Comedy", "Fantasy", "Medical", "Anime", "Food", "Travel", "History"];
    const week=["Lunes", "Martes","Miércles","Jueves", "Sábado", "Domingo"];
    const initialValuesMoviesCreate = {
        id: '',
        actors: [],
        actorName: '',
        Poster_Link: '',
        Series_Title: '',
        Released_Year: '',
        Certificate: '',
        Runtime: '',
        Genre:[],
        IMDB_Rating: '',
        Overview: '',
        Meta_score: '',
        Director: '',
        Star1: '',
        Star2: '',
        Star3: '',
        Star4: '',
        No_of_Votes: '',
        Gross: '',
        deshabilitar: 'null',
        
    }
    const initialValuesSeriesCreate = {
        id: '',
        url: '',
        name: '',
        type: '',
        language: '',
        genres: [],
        status: '',
        runtime: '',
        premiered: '',
        officialSite: '',
        schedule: {
        time: '',
        days: [],
        },
        rating: {
        average: '',
        },
        weight: '',
        network: {
        id: '',
        name: '',
        
        country: {
            name: '',
            code: '',
            timezone: '',
        },},
        webChannel: '',
        externals: {
        tvrage: '',
        thetvdb: '',
        imdb: '',
        },
        image: {
        medium: '',
        original: '',
        },
        summary: '',
        updated: '',
        _links: {
        self: {
            href: '',
        },
        previousepisode: {
            href: '',
        }, },
        deshabilitar: 'null' 
        }
    const [sentForm, setSentForm] = useState(false);
    const [contentType, setContentType] = useState('');
    const [buttonPressed, setButtonPressed] = useState(null);
    const [initialValuesMovies, setInitialValuesMovies] =useState(initialValuesMoviesCreate);
    const [initialValuesSeries, setInitialValuesSeries] =useState(initialValuesSeriesCreate);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false)
    const {type, id} = useParams();

    useEffect(()=>{
        if (id && type == "movie"){

            async function getMovieById() {
                try {
                    const {data} = await (axios.get(`http://localhost:3001/movies/byObjectId/${id}`))
                    console.log(data)
                    data.Genre = data.Genre.split(',').map(genre => genre.trim());
                    console.log(data)
                    setInitialValuesMovies(data)
                    
                } catch (error) {
                    console.log(error)
                }
            }
            getMovieById();
            
        } else if (id && type == "serie"){
            
            async function getSerieById() {
                try {
                    const {data} = await (axios.get(`http://localhost:3001/series/${id}`))
                    setInitialValuesSeries(data)
                } catch (error) {
                    console.log(error)
                }
            }
            getSerieById();
            
        }
    }, [id, type])
   

    const handleContentType = (type) =>{
        setContentType(type);
    }
    async function handleFileUpload(event) {
        const files = event.target.files;
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', 'imagesPF');
        setLoading(true)
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dzrp4xd2g/image/upload`, formData);
            console.log(response)
            const imageURL = response.data.secure_url;
            console.log(imageURL)
            setImage(imageURL)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    }
    


    const FormSchemaMovies = yup.object().shape({
        // id: yup.number()
        // .typeError("Debe ingresar un número")
        // .required("Debe completar este campo"),
              
        Series_Title: yup
        .string()
        .required("Debe completar este campo"),
        Released_Year: yup
        .number()
        .typeError("Debe ingresar un número")
        .required("Debe completar este campo"),
        // Certificate: yup
        // .string()
        // .required("Debe completar este campo"),
        Runtime: yup
        .string()
        .typeError("Debe ingresar un número")
        .required("Debe completar este campo"),
        Genre: yup.array().of(yup.string()).min(1, 'Debes seleccionar al menos un género'),
        // IMDB_Rating: yup
        // .number()
        // .typeError("Debe ingresar un número")
        // .required("Debe completar este campo"),
        Overview: yup
        .string()
        .required("Debe completar este campo"),
        Meta_score: yup
        .number()
        .typeError("Debe ingresar un número")
        .required("Debe completar este campo"),
        Director: yup
        .string()
        .required("Debe ingresar el director de la película"),
        // Star1: yup
        // .string()
        // .required("Debe completar este campo"),
        // Star2: yup
        // .string()
        // .required("Debe completar este campo"),
        // Star3: yup
        // .string()
        // .required("Debe completar este campo"),
        // Star4: yup
        // .string()
        // .required("Debe completar este campo"),
        // No_of_Votes: yup.number()
        // .typeError("Debe ingresar un número")
        // .required("Debe completar este campo"),
        Gross: yup
        .string()
        .required("Debe completar este campo"),

        
    })
    const FormSchemaSeries = yup.object().shape({
        // url: yup.string().url("Debes ingresar una URL válida").required('Debe completar este campo'),
        name: yup.string().required('Debe completar este campo'),
        type: yup.string().required('Debe completar este campo'),
        language: yup.string().required('Debe completar este campo'),
        genres: yup.array().of(yup.string()).min(1, 'Debes seleccionar al menos un género'),
        status: yup.string().required('Debe completar este campo'),
        runtime: yup.number().typeError("Debe ingresar un número").required('Debes completar este campo'),
        premiered: yup.date().required('Debe completar este campo'),
        officialSite: yup.string().url('Ingresa una URL válida').required('Debes completar este campo'),
        // schedule: yup.object().shape({
        //     time: yup.string().required('Debe completar este campo'),
        //     days: yup.array().of(yup.string()).min(1, 'Debes seleccionar al menos un día'),
        // }),
        rating: yup.object().shape({
            average: yup.number().typeError("Debe ingresar un número").required('Debes completar este campo'),
        }),
        weight: yup.number().typeError("Debe ingresar un número").required('Debes completar este campo'),
        network: yup.object().shape({
            id: yup.number().typeError("Debe ingresar un número").required('Debes completar este campo'),
            name: yup.string().required('Debe completar este campo'), 
        country: yup.object().shape({
            name: yup.string().required('Debe completar este campo'),
            code: yup.string().required('Debe completar este campo'),
            timezone: yup.string().required('Debe completar este campo'),
            }),
        }),
        webChannel: yup.string().nullable(),
        externals: yup.object().shape({
            tvrage: yup.number().typeError("Debe ingresar un número").required('Debes completar este campo'),
            thetvdb: yup.number().typeError("Debe ingresar un número").required('Debes completar este campo'),
            imdb: yup.string().required('Debe completar este campo'),
        }),
        image: yup.object().shape({
            medium: yup.string().url('Ingresa una URL válida para la imagen media').required('Debes completar este campo'),
            original: yup.string().url('Ingresa una URL válida para la imagen original').required('Debes completar este campo'),
        }),
        summary: yup.string().required('Debe completar este campo'),
        updated: yup.number().typeError("Debe ingresar un número").required('Debes completar este campo'),
        _links: yup.object().shape({
            self: yup.object().shape({
            href: yup.string().url('Ingresa una URL válida para el enlace self').required('Debes completar este campo'),
            }),
            previousepisode: yup.object().shape({
            href: yup.string().url('Ingresa una URL válida para el enlace previousepisode').required('Debes completar este campo'),
            }),
  })
        
    })
    
    
  return (
    <>  
   <div className="flex justify-center items-center mt-10">
  <div className="bg-white p-4 rounded-md shadow-md text-dark font-poppins">
    <label className="text-xl mb-2 text-moradito">Elija una opción:</label>
    
    <div className="flex items-center mb-2">
      <input
        type="radio"
        id="movie"
        name="content-type"
        value="movie"
        checked={contentType === "movie"}
        onChange={() => handleContentType("movie")}
        className="mr-2"
      />
      <label htmlFor="movie" className="text-lg font-poppins text-moradito">Película</label>
    </div>

    <div className="flex items-center">
      <input
        type="radio"
        id="serie"
        name="content-type"
        value="serie"
        checked={contentType === "serie"}
        onChange={() => handleContentType("serie")}
        className="mr-2"
      />
      <label htmlFor="serie" className="text-lg font-poppins text-moradito">Serie</label>
    </div>
  </div>
</div>


        
        {contentType === "movie" && (
            
            <Formik
            initialValues={initialValuesMovies}
            
            validationSchema={FormSchemaMovies}

            onSubmit={(values, {resetForm}) =>{
                //Aqui debo agregar la ruta del post de movies pasandolé values
                console.log(values)
                // const updatedValues = {
                //     ...values,
                //     actors: [...values.actors, values.actorName],
                //   };
                //   console.log(updatedValues)
                  
                if (buttonPressed === 'create') {
                    console.log(image)
                    const genresAsString = values.Genre.join(', ');
                    const dataToSend = {
                        ...values,
                        Genre: genresAsString,
                        Poster_Link: image
                      };
                    delete dataToSend.actorName;
                     
                    // async function postMovie() {
                    //     try {
                    //         await axios.post(`http://localhost:3001/movies`, values)
                            
                    //     } catch (error) {
                    //         console.log(error)
                    //     }
                    // }
                    // postMovie();
                    console.log(dataToSend)
                    console.log("axios.post")
                  } else if (buttonPressed === 'edit') {
                    // async function putMovie() {
                    //     try {
                    //         await axios.put(`http://localhost:3001/movies/byObjectId/${id}`, values)
                            
                    //     } catch (error) {
                    //         console.log(error)
                    //     }
                    // }
                    // putMovie();
                    console.log("axios.put")
                  }
                setButtonPressed("")
                resetForm(initialValuesMovies);
                setSentForm(true)
                // setTimeout(()=> setSentForm(false), 4000)
            }}
        >
            {({errors, values, setFieldValue}) => (
                <Form className="text-moradito font-poppins flex flex-col items-center space-y-4 mt-10">
                    {console.log(errors)}
                {/* {
                    type==="movie" ?
                    
                    <div className="flex flex-col space-y-2">
                    <label className="text-lg" htmlFor="id">ID:</label>
                    <Field
                    className="p-2 border border-lila rounded-md"
                    type="number" 
                    id="id" 
                    name="id" />
                    <ErrorMessage name= "id" component={()=>(
                        <div className={styles.formError}>{errors.id}</div>
                    )}></ErrorMessage>
                    </div>
                    : null
                } */}
                {
                    type==="movie" ?
                    
                    <div className="flex flex-col space-y-2">
                    <label className="text-lg" htmlFor="Poster_Link">URL imagen</label>
                    <Field
                    className="p-2 border border-lila rounded-md"
                    type="string" 
                    id="Poster_Link" 
                    name="Poster_Link" />
                    <ErrorMessage name= "Poster_Link" component={()=>(
                        <div className={styles.formError}>{errors.Poster_Link}</div>
                    )}></ErrorMessage>
                    </div>
                    : 
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="Poster_Link">Carga una imagen</label>
                    <Field 
                    className="p-2  rounded-md ml-3 mb-2"
                    type="file" 
                    id="Poster_Link" 
                    name="Poster_Link" 
                    onChange={handleFileUpload}/>
                    {loading? (<h3>Cargando imagen...</h3>) : (<img src={image} style={{width: "300px"}}></img>)}
                    
                    <ErrorMessage name= "Poster_Link" component={()=>(
                        <div className={styles.formError}>{errors.Poster_Link}</div>
                    )}></ErrorMessage>
                    </div>
                }
                
                
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="Series_Title">Título de la película</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    type="text" 
                    id="Series_Title" 
                    name="Series_Title" />
                    <ErrorMessage name= "Series_Title" component={()=>(
                        <div className={styles.formError}>{errors.Series_Title}</div>
                    )}></ErrorMessage>
                </div>

                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="Released_Year">Año de estreno</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    type="number" 
                    id="Released_Year" 
                    name="Released_Year" />
                    
                    <ErrorMessage name= "Released_Year" component={()=>(
                        <div className={styles.formError}>{errors.Released_Year}</div>
                    )}></ErrorMessage>
                </div>
                {
                    type==="movie" ?
                    
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="Certificate">Certificado</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    type="text" 
                    id="Certificate" 
                    name="Certificate" />
                    
                    <ErrorMessage name= "Certificate" component={()=>(
                        <div className={styles.formError}>{errors.Certificate}</div>
                    )}></ErrorMessage>
                    </div>
                    : null
                }
                
                
                <div className="flex flex-col">
                <label className="text-lg" htmlFor="Runtime">Duración</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    type="text" 
                    id="Runtime" 
                    name="Runtime" />
                    
                    <ErrorMessage name= "Runtime" component={()=>(
                        <div className={styles.formError}>{errors.Runtime}</div>
                    )}></ErrorMessage>
                </div>

                <div className="flex flex-col">
                    
                    <label className="text-lg" htmlFor="Genre">Géneros</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    as="select" 
                    id="Genre" 
                    name="Genre" 
                    multiple={true}
                    >
                    {
                        genresMovie.map((g, index)=>  <option key={index} value={g}>{g}</option>)
                    }
                    </Field>
                    <ErrorMessage name= "Genre" component={()=>(
                        <div className={styles.formError}>{errors.Genre}</div>
                    )}></ErrorMessage>
                </div>
                {
                    type==="movie" ?
                    
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="IMDB_Rating">Rating de IMDB</label>
                        <Field 
                        className="p-2 border border-lila rounded-md ml-3 mb-2"
                        type="number" 
                        id="IMDB_Rating" 
                        name="IMDB_Rating" />
                        
                        <ErrorMessage name= "IMDB_Rating" component={()=>(
                            <div className={styles.formError}>{errors.IMDB_Rating}</div>
                        )}></ErrorMessage>
                    </div>
                    : null
                }
                

                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="Overview">Descripción de IMDB</label>
                    <Field 
                    className="p-4 border border-lila rounded-md ml-3 mb-4"
                    name="Overview"
                    as="textarea"
                    />
                    
                    <ErrorMessage name= "Overview" component={()=>(
                        <div className={styles.formError}>{errors.Overview}</div>
                    )}></ErrorMessage>
                </div>
                {
                    type==="movie" ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="Meta_score">Puntuación promedio</label>
                        <Field 
                        className="p-2 border border-lila rounded-md ml-3 mb-2"
                        type="number" 
                        id="Meta_score" 
                        name="Meta_score" />
                        
                        <ErrorMessage name= "Meta_score" component={()=>(
                            <div className={styles.formError}>{errors.Meta_score}</div>
                        )}></ErrorMessage>
                    </div>
                    : null
                }
                

                <div className="flex flex-col">
                <label className="text-lg" htmlFor="Director">Director</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    type="text" 
                    id="Director" 
                    name="Director" />
                    
                    <ErrorMessage name= "Director" component={()=>(
                        <div className={styles.formError}>{errors.Director}</div>
                    )}></ErrorMessage>
                </div>
                {
                    type==="movie" ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="Star1">Estrella 1</label>
                        <Field 
                        className="p-2 border border-lila rounded-md ml-3 mb-2"
                        type="text" 
                        id="Star1" 
                        name="Star1" />
                        
                        <ErrorMessage name= "Star1" component={()=>(
                            <div className={styles.formError}>{errors.Star1}</div>
                        )}></ErrorMessage>
                    </div>
                    : null
                }
                
                {
                    type==="movie" ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="Star2">Estrella 2</label>
                        <Field 
                        className="p-2 border border-lila rounded-md ml-3 mb-2"
                        type="text" 
                        id="Star2" 
                        name="Star2" />
                        
                        <ErrorMessage name= "Star2" component={()=>(
                            <div className={styles.formError}>{errors.Star2}</div>
                        )}></ErrorMessage>
                    </div>
                    : null
                }
                
                {
                    type==="movie" ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="Star3">Estrella 3</label>
                        <Field 
                        className="p-2 border border-lila rounded-md ml-3 mb-2"
                        type="text" 
                        id="Star3" 
                        name="Star3" />
                        
                        <ErrorMessage name= "Star3" component={()=>(
                            <div className={styles.formError}>{errors.Star3}</div>
                        )}></ErrorMessage>
                    </div>
                    : null
                }
                
                {
                    type==="movie" ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="Star4">Esterlla 4</label>
                        <Field 
                        className="p-2 border border-lila rounded-md ml-3 mb-2"
                        type="text" 
                        id="Star4" 
                        name="Star4" />
                        
                        <ErrorMessage name= "Star4" component={()=>(
                            <div className={styles.formError}>{errors.Star4}</div>
                        )}></ErrorMessage>
                    </div>
                    : null
                }
                {
                    type!=="movie"  ?
                    <div className="flex flex-col">
                        <label className="text-lg" htmlFor="actorName">Actores principales</label>
                        <Field
                        className="p-2 border border-lila rounded-md ml-3 mb-2"
                        name="actorName"
                        type="text"
                        placeholder="Nombre del actor"
                        />
                        <FieldArray name="actors">
                        {arrayHelpers => (
                            <div>
                            <button
                                className="text-sm font-poppins bg-white  border border-moradito  text-moradito  py-1 px-2 rounded-xl"
                                type="button"
                                onClick={() => {
                                arrayHelpers.push(values.actorName);
                                actions.setFieldValue('actorName', ''); // Limpiar el campo actorName
                                }}
                            >
                                Agregar Actor
                            </button>
                            <div>
                                <ul>
                                {values.actors.map((actor, index) => (
                                    <li key={index}>{actor}<button className='text-sm ml-2 text-red-500' type='button' onClick={() => arrayHelpers.remove(index)}>X</button></li>
                                ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    </FieldArray>
                </div>
                    : null
                }
                
                {
                    type==="movie" ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="No_of_Votes">Número de votos</label>
                        <Field 
                        className="p-2 border border-lila rounded-md ml-3 mb-2"
                        type="number" 
                        id="No_of_Votes" 
                        name="No_of_Votes" />
                        
                        <ErrorMessage name= "No_of_Votes" component={()=>(
                            <div className={styles.formError}>{errors.No_of_Votes}</div>
                        )}></ErrorMessage>
                    </div>
                    : null
                }

                <div className="flex flex-col">
                <label className="text-lg" htmlFor="Gross">Ganancia de IMDB</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    type="text" 
                    id="Gross" 
                    name="Gross" />
                    
                    <ErrorMessage name= "Gross" component={()=>(
                        <div className={styles.formError}>{errors.Gross}</div>
                    )}></ErrorMessage>
                </div>
                {
                    type==="movie" ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="deshabilitar">Vista</label>
                    <Field
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    as="select" 
                    id="deshabilitar" 
                    name="deshabilitar" >
                    <option value="null">Habilitar</option>
                    <option value="true">Deshabilitar</option>
                    </Field>
                    <ErrorMessage name= "deshabilitar" component={()=>(
                        <div className={styles.formError}>{errors.deshabilitar}</div>
                    )}></ErrorMessage>
                    </div>
                    : null
                }
                

                {sentForm && <p className="text-lg text-morado font-poppins">Formulario enviado con éxito!</p>}
                <div className="flex space-x-4 mb-20">
                    {type === "movie" ? 
                    <button className="text-lg font-poppins bg-moradito text-white hover:bg-lila  py-2 px-4 rounded-xl" type='submit' onClick={() => setButtonPressed('edit')}>Editar</button>
                    :
                    <button className="text-lg font-poppins bg-moradito text-white hover:bg-lila py-2 px-4 rounded-xl" type='submit' onClick={() => setButtonPressed('create')}>Crear</button>
                    }
                </div>           
            </Form>
            )}

        </Formik>
        )}


        {contentType === "serie" && (
           
            <Formik
            initialValues={initialValuesSeries}
            
            validationSchema={FormSchemaSeries}

            onSubmit={(values, {resetForm}) =>{
                console.log(values)
                if (buttonPressed === 'create') {
                    const dataToSend = {
                        ...values,
                        url: image
                      };
                    console.log(dataToSend)
                    // async function postSerie() {
                    //     try {
                    //         await axios.post(`http://localhost:3001/postSeries`, values)
                            
                    //     } catch (error) {
                    //         console.log(error)
                    //     }
                    // }
                    // postSerie();
                    console.log("axios.post")
                    
                  } else if (buttonPressed === 'edit') {
                    console.log(values)
                    // async function putSerie() {
                    //     try {
                    //         await axios.put(`http://localhost:3001/series/${id}`, values)
                            
                    //     } catch (error) {
                    //         console.log(error)
                    //     }
                    // }
                    // putSerie();
                    console.log("axios.put")
                    
                  }
                setButtonPressed("")
                resetForm(initialValuesSeries);
                setSentForm(true)
                // setTimeout(()=> setSentForm(false), 4000)
            }}
        >
            {({errors}) => (
                <Form className="text-moradito font-poppins flex flex-col items-center space-y-4 mt-10">
                    {console.log(errors)}

                {/* <div className="flex flex-col">
                    <label className="text-lg" htmlFor="id">ID</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="id" 
                    name="id" />
                    <ErrorMessage name= "id" component={()=>(
                        <div className={styles.formError}>{errors.id}</div>
                    )}></ErrorMessage>
                </div>   */}
                {
                    type === 'serie' ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="url">URL imagen</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    type="text" 
                    id="url" 
                    name="url" />
                    <ErrorMessage name= "url" component={()=>(
                        <div className={styles.formError}>{errors.url}</div>
                    )}></ErrorMessage>
                    </div>
                    : 
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="url">Carga una imagen</label>
                    <Field 
                    className="p-2  rounded-md ml-3 mb-2"
                    type="file" 
                    id="url" 
                    name="url" 
                    onChange={handleFileUpload}/>
                    {loading? (<h3>Cargando imagen...</h3>) : (<img src={image} style={{width: "300px"}}></img>)}
                    
                    <ErrorMessage name= "url" component={()=>(
                        <div className={styles.formError}>{errors.url}</div>
                    )}></ErrorMessage>
                    </div>
                }
                   
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="name">Título de la serie</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="name" 
                    name="name" />
                    <ErrorMessage name= "name" component={()=>(
                        <div className={styles.formError}>{errors.name}</div>
                    )}></ErrorMessage>
                </div>
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="type">Tipo</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="type" 
                    name="type" />
                    <ErrorMessage name= "type" component={()=>(
                        <div className={styles.formError}>{errors.type}</div>
                    )}></ErrorMessage>
                </div>
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="language">Lenguaje</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="language" 
                    name="language" />
                    
                    <ErrorMessage name= "language" component={()=>(
                        <div className={styles.formError}>{errors.language}</div>
                    )}></ErrorMessage>
                </div>
                <div className="flex flex-col">
                <label className="text-lg" htmlFor="genres">Géneros</label>
                    <Field
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    as="select" 
                    id="genres" 
                    name="genres" 
                    multiple={true} >
                        {
                        genresSerie.map(a=>  <option key={a} value={a}>{a}</option>)
                        }
                    </Field> 
                        {/* {
                        genresSelect.map(b => <div key={b}><span>{b}<button name={b} type='button' onClick={remove}>x</button></span></div>)
                        
                        }  */}
                        

                    <ErrorMessage name= "genres" component={()=>(
                        <div className={styles.formError}>{errors.genres}</div>
                    )}></ErrorMessage>
                </div>

                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="status">Estado</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="status" 
                    name="status" />
                    
                    <ErrorMessage name= "status" component={()=>(
                        <div className={styles.formError}>{errors.status}</div>
                    )}></ErrorMessage>                    
                </div>
                <div className="flex flex-col">
                <label className="text-lg" htmlFor="runtime">Duración</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="number" 
                    id="runtime" 
                    name="runtime" />
                    
                    <ErrorMessage name= "runtime" component={()=>(
                        <div className={styles.formError}>{errors.runtime}</div>
                    )}></ErrorMessage>
                </div>
                <div className="flex flex-col">
                <label className="text-lg" htmlFor="premiered">Fecha de estreno</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="date" 
                    id="premiered" 
                    name="premiered" />
                    
                    <ErrorMessage name= "premiered" component={()=>(
                        <div className={styles.formError}>{errors.premiered}</div>
                    )}></ErrorMessage>
                </div>
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="officialSite">Sitio oficial</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="officialSite" 
                    name="officialSite" />
                    
                    <ErrorMessage name= "officialSite" component={()=>(
                        <div className={styles.formError}>{errors.officialSite}</div>
                    )}></ErrorMessage>
                </div>

                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="schedule.time">Hora de transmisión</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="schedule.time" 
                    name="schedule.time" />
                    
                    <ErrorMessage name= "schedule.time" component={()=>(
                        <div className={styles.formError}>{errors.schedule.time}</div>
                    )}></ErrorMessage>
                </div>
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="schedule.days">Días de transmisión</label>
                    <Field
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    as="select" 
                    id="schedule.days" 
                    name="schedule.days" 
                    multiple={true}>
                        {
                        week.map(d=>  <option key={d} value={d}>{d}</option>)
                        }
                    </Field> 
                    <ErrorMessage name= "schedule.days" component={()=>(
                        <div className={styles.formError}>{errors.schedule.days}</div>
                    )}></ErrorMessage>
                </div>
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="rating.average">Promedio de calificación</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="number" 
                    id="rating.average" 
                    name="rating.average" />
                    
                    <ErrorMessage name= "rating.average" component={()=>(
                        <div className={styles.formError}>{errors.rating.average}</div>
                    )}></ErrorMessage>
                </div>
                {
                    type==="serie" ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="weight">Peso</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="number" 
                    id="weight" 
                    name="weight" />
                    
                    <ErrorMessage name= "weight" component={()=>(
                        <div className={styles.formError}>{errors.weight}</div>
                    )}></ErrorMessage>
                    </div>
                    : null
                }
                
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="network.id">ID de la red</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="number" 
                    id="network.id" 
                    name="network.id" />
                    
                    <ErrorMessage name= "network.id" component={()=>(
                        <div className={styles.formError}>{errors.network.id}</div>
                    )}></ErrorMessage>
                </div>
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="network.name">Nombre de la red</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="network.name" 
                    name="network.name" />
                    
                    <ErrorMessage name= "network.name" component={()=>(
                        <div className={styles.formError}>{errors.network.name}</div>
                    )}></ErrorMessage>
                </div>
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="network.country.name">Nombre del pais</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="network.country.name" 
                    name="network.country.name" />
                    
                    <ErrorMessage name= "network.country.name" component={()=>(
                        <div className={styles.formError}>{errors.network.country.name}</div>
                    )}></ErrorMessage>
                </div>
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="network.country.code">Código postal</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="network.country.code" 
                    name="network.country.code" />
                    
                    <ErrorMessage name= "network.country.code" component={()=>(
                        <div className={styles.formError}>{errors.network.country.code}</div>
                    )}></ErrorMessage>
                </div>
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="network.country.timezone">Zona horaria del país</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="network.country.timezone" 
                    name="network.country.timezone" />
                    
                    <ErrorMessage name= "network.country.timezone" component={()=>(
                        <div className={styles.formError}>{errors.network.country.timezone}</div>
                    )}></ErrorMessage>
                </div>
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="webChannel">Canal web</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="webChannel" 
                    name="webChannel" />
                    
                    <ErrorMessage name= "webChannel" component={()=>(
                        <div className={styles.formError}>{errors.webChannel}</div>
                    )}></ErrorMessage>
                </div>
                {
                    type==="serie" ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="externals.tvrage">TVRage</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="number" 
                    id="externals.tvrage" 
                    name="externals.tvrage" />
                    
                    <ErrorMessage name= "externals.tvrage" component={()=>(
                        <div className={styles.formError}>{errors.externals.tvrage}</div>
                    )}></ErrorMessage>
                     </div>
                    : null
                }
                {
                    type==="serie" ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="externals.thetvdb">TheTVDB</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="number" 
                    id="externals.thetvdb" 
                    name="externals.thetvdb" />
                    
                    <ErrorMessage name= "externals.thetvdb" component={()=>(
                        <div className={styles.formError}>{errors.externals.thetvdb}</div>
                    )}></ErrorMessage>
                    </div>
                    : null
                }
                {
                    type==="serie" ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="externals.imdb">IMDb</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="externals.imdb" 
                    name="externals.imdb" />
                    
                    <ErrorMessage name= "externals.imdb" component={()=>(
                        <div className={styles.formError}>{errors.externals.imdb}</div>
                    )}></ErrorMessage>
                    </div>
                    : null
                }
                {
                    type==="serie" ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="image.medium">Imagen Media</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="image.medium" 
                    name="image.medium" />
                    
                    <ErrorMessage name= "image.medium" component={()=>(
                        <div className={styles.formError}>{errors.image.medium}</div>
                    )}></ErrorMessage>
                    </div>
                    : null
                }
                {
                    type==="serie" ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="image.original">Imagen Original</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="image.original" 
                    name="image.original" />
                    
                    <ErrorMessage name= "image.original" component={()=>(
                        <div className={styles.formError}>{errors.image.original}</div>
                    )}></ErrorMessage>
                    </div>
                    : null
                }
                
                
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="summary">Descripción de IMDB</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    name="summary"
                    as="textarea" 
                    placeholder="Resumen..." 
                     />
                    
                    <ErrorMessage name= "summary" component={()=>(
                        <div className={styles.formError}>{errors.summary}</div>
                    )}></ErrorMessage>
                </div>
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="updated">Valor de actualización</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="number" 
                    id="updated" 
                    name="updated" />
                    
                    <ErrorMessage name= "updated" component={()=>(
                        <div className={styles.formError}>{errors.updated}</div>
                    )}></ErrorMessage>
                </div>
                
                {
                    type==="serie" ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="_links.self.href">Enlace self</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="_links.self.href" 
                    name="_links.self.href" />
                    
                    <ErrorMessage name= "_links.self.href" component={()=>(
                        <div className={styles.formError}>{errors._links.self.href}</div>
                    )}></ErrorMessage>
                     </div>
                    : null
                }
                {
                    type==="serie" ?
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="_links.previousepisode.href">Enlace episodio previo</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="_links.previousepisode.href" 
                    name="_links.previousepisode.href" />
                    
                    <ErrorMessage name= "_links.previousepisode.href" component={()=>(
                        <div className={styles.formError}>{errors._links.previousepisode.href}</div>
                    )}></ErrorMessage>
                    </div>
                    : null
                }
                
                {
                    type==="serie" ?
                    
                    <div className="flex flex-col">
                    <label className="text-lg" htmlFor="deshabilitar">Vista</label>
                    <Field
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    as="select" 
                    id="deshabilitar" 
                    name="deshabilitar" >
                    <option value="null">Habilitar</option>
                    <option value="true">Deshabilitar</option>
                    </Field>
                    <ErrorMessage name= "deshabilitar" component={()=>(
                        <div className={styles.formError}>{errors.deshabilitar}</div>
                    )}></ErrorMessage>
                    </div>
                    : null
                }
                
                
                {sentForm && <p className={styles.formSucces}>Formulario enviado con éxito!</p>}
                <div className="flex space-x-4 mb-20">
                {type === "serie" ? 
                    <button className="text-lg font-poppins bg-moradito text-white hover:bg-lila  py-2 px-4 rounded-xl" type='submit' onClick={() => setButtonPressed('edit')}>Editar</button>
                    :
                    <button className="text-lg font-poppins bg-moradito text-white hover:bg-lila py-2 px-4 rounded-xl" type='submit' onClick={() => setButtonPressed('create')}>Crear</button>
                    }
                </div>
            </Form>
            )}

        </Formik>
        )}
        
    </>
  )
}

export default FormCreate