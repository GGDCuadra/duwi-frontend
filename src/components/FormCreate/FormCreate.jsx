import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as yup from 'yup';
import styles from './FormCreate.module.css'

const FormCreate = () => {
    const genresMovie =["Crime", "Drama", "Action", "Adventure", "Sci-Fi", "Biography", "History", "Fantasy", "Horror", "Mystery", "Thriller", "Western", "Comedy", "Romance", "Animation", "Family", "War", "Biography", "Music"];
    const genresSerie=["Drama", "Action", "War", "Crime", "Thriller", "Nature", "Adventure", "Science-Fiction", "Western", "Mystery", "Supernatural", "Family", "Romance", "Comedy", "Fantasy", "Medical", "Anime", "Food", "Travel", "History"];
    const week=["Lunes", "Martes","Miércles","Jueves", "Sábado", "Domingo"];
    const initialValuesMoviesCreate = {
        id: '',
        Poster_Link: '',
        Series_Title: '',
        Released_Year: '',
        Certificate: '',
        Runtime: '',
        Genre: '',
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
        deshabilitar: '',
        
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
        },
    }}
    const [sentForm, setSentForm] = useState(false);
    const [contentType, setContentType] = useState('');
    const [buttonPressed, setButtonPressed] = useState(null);
    const [initialValuesMovies, setInitialValuesMovies] =useState(initialValuesMoviesCreate);
    const [initialValuesSeries, setInitialValuesSeries] =useState(initialValuesSeriesCreate);
    const {type, id} = useParams();

    useEffect(()=>{
        if (!isNaN(id) && type == "movie"){
            setInitialValuesMovies( {
                "id": 99,
              "Poster_Link": "https://image.tmdb.org/t/p/original/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg",
              "Series_Title": "The Shawshank Redemption",
              "Released_Year": 1994,
              "Certificate": "R",
              "Runtime": "142 min",
              "Genre": "Drama",
              "IMDB_Rating": 9,
              "Overview": "Una descripción actualizada de la película",
              "Meta_score": 80,
              "Director": "Frank Darabont",
              "Star1": "Tim Robbins",
              "Star2": "Morgan Freeman",
              "Star3": "Bob Gunton",
              "Star4": "William Sadler",
              "No_of_Votes": 2343110,
              "Gross": "28,341,469",
              "deshabilitar": "true"
            })
            // data = getmoviesbyid
            //setInitialValues(data)
        } else if (!isNaN(id) && type == "serie"){
            
            let data = {
                "_id": "65272476997ab46b311cb693",
                "url": "http://www.tvmaze.com/shows/465/band-of-brothers",
                "name": "Band of Brothers",
                "type": "Scripted",
                "language": "English",
                "genres": [
                  "Drama",
                  "Action",
                  "War"
                ],
                "status": "Ended",
                "runtime": 60,
                "premiered": "2001-09-09",
                "officialSite": "http://www.hbo.com/band-of-brothers",
                "schedule": {
                  "time": "20:00",
                  "days": [
                    "Sunday"
                  ]
                },
                "rating": {
                  "average": 9.5
                },
                "weight": 96,
                "network": {
                  "id": 8,
                  "name": "HBO",
                  "country": {
                    "name": "United States",
                    "code": "US",
                    "timezone": "America/New_York"
                  }
                },
                "webChannel": null,
                "externals": {
                  "tvrage": 2708,
                  "thetvdb": 74205,
                  "imdb": "tt0185906"
                },
                "image": {
                  "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/80/201679.jpg",
                  "original": "http://static.tvmaze.com/uploads/images/original_untouched/80/201679.jpg"
                },
                "summary": "<p>Drawn from interviews with survivors of Easy Company, as well as their journals and letters, <b>Band of Brothers</b> chronicles the experiences of these men from paratrooper training in Georgia through the end of the war. As an elite rifle company parachuting into Normandy early on D-Day morning, participants in the Battle of the Bulge, and witness to the horrors of war, the men of Easy knew extraordinary bravery and extraordinary fear - and became the stuff of legend. Based on Stephen E. Ambrose's acclaimed book of the same name.</p>",
                "updated": 1581996681,
                "_links": {
                  "self": {
                    "href": "http://api.tvmaze.com/shows/465"
                  },
                  "previousepisode": {
                    "href": "http://api.tvmaze.com/episodes/42799"
                  }
                },
                "self": "http://api.tvmaze.com/shows/465",
                "previousepisode": "http://api.tvmaze.com/episodes/42799",
                "deshabilitar": "deshabilitada"
              }
              console.log(data)
            const cleanData ={}
            Object.keys(data).forEach((key) =>{
                cleanData[key] = data[key] !== null ? data[key] : '';
            })
            console.log(data)
            setInitialValuesSeries(data)
            //data = getseriesbyid
            //setInitialValues(data)
        }
    }, [id, type])
   

    const handleContentType = (type) =>{
        setContentType(type);
    }
    


    const FormSchemaMovies = yup.object().shape({
        id: yup.number()
        .typeError("Debe ingresar un número")
        .required("Debe completar este campo"),
        Poster_Link: yup.string().url("Debes ingresar una URL válida").required('Debe completar este campo'),        
        Series_Title: yup
        .string()
        .required("Debe completar este campo"),
        Released_Year: yup
        .number()
        .typeError("Debe ingresar un número")
        .required("Debe completar este campo"),
        Certificate: yup
        .string()
        .required("Debe completar este campo"),
        Runtime: yup
        .number()
        .typeError("Debe ingresar un número")
        .required("Debe completar este campo"),
        Genre: yup
        .string()
        .required("Debe completar este campo"),
        IMDB_Rating: yup
        .number()
        .typeError("Debe ingresar un número")
        .required("Debe completar este campo"),
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
        Star1: yup
        .string()
        .required("Debe completar este campo"),
        Star2: yup
        .string()
        .required("Debe completar este campo"),
        Star3: yup
        .string()
        .required("Debe completar este campo"),
        Star4: yup
        .string()
        .required("Debe completar este campo"),
        No_of_Votes: yup.number()
        .typeError("Debe ingresar un número")
        .required("Debe completar este campo"),
        Gross: yup
        .string()
        .required("Debe completar este campo"),

        
    })
    const FormSchemaSeries = yup.object().shape({
        url: yup.string().url("Debes ingresar una URL válida").required('Debe completar este campo'),
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
        webChannel: yup.string().url('Ingresa una URL válida').nullable(),
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
                if (buttonPressed === 'create') {
                    console.log("axios.post")
                  } else if (buttonPressed === 'edit') {
                    console.log("axios.put")
                  }
                setButtonPressed("")
                resetForm(initialValuesMovies);
                setSentForm(true)
                // setTimeout(()=> setSentForm(false), 4000)
            }}
        >
            {({errors}) => (
                <Form className="text-moradito font-poppins flex flex-col items-center space-y-4 mt-10">
                    {console.log(errors)}
                
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
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="Poster_Link">URL imagen</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    type="text" 
                    id="Poster_Link" 
                    name="Poster_Link" />
                    
                    <ErrorMessage name= "Poster_Link" component={()=>(
                        <div className={styles.formError}>{errors.Poster_Link}</div>
                    )}></ErrorMessage>
                </div>
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
                    
                    <label className="text-lg" htmlFor="Genre">Género</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    as="select" 
                    id="Genre" 
                    name="Genre" 
                    >
                    {
                        genresMovie.map((g, index)=>  <option key={index} value={g}>{g}</option>)
                    }
                    </Field>
                    <ErrorMessage name= "Genre" component={()=>(
                        <div className={styles.formError}>{errors.Genre}</div>
                    )}></ErrorMessage>
                </div>
                
                
                <div className="flex flex-col">
                <label className="text-lg" htmlFor="IMDB_Rating">Rating</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    type="number" 
                    id="IMDB_Rating" 
                    name="IMDB_Rating" />
                    
                    <ErrorMessage name= "IMDB_Rating" component={()=>(
                        <div className={styles.formError}>{errors.IMDB_Rating}</div>
                    )}></ErrorMessage>
                </div>

                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="Overview">Descripción</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    name="Overview"
                    as="textarea"
                    placeholder="Overview"/>
                    
                    <ErrorMessage name= "Overview" component={()=>(
                        <div className={styles.formError}>{errors.Overview}</div>
                    )}></ErrorMessage>
                </div>

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

                <div className="flex flex-col">
                <label className="text-lg" htmlFor="Star3">Esterlla 3</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    type="text" 
                    id="Star3" 
                    name="Star3" />
                    
                    <ErrorMessage name= "Star3" component={()=>(
                        <div className={styles.formError}>{errors.Star3}</div>
                    )}></ErrorMessage>
                </div>

                <div className="flex flex-col">
                <label className="text-lg" htmlFor="Star4">Director</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    type="text" 
                    id="Star4" 
                    name="Star4" />
                    
                    <ErrorMessage name= "Star4" component={()=>(
                        <div className={styles.formError}>{errors.Star4}</div>
                    )}></ErrorMessage>
                </div>

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

                <div className="flex flex-col">
                <label className="text-lg" htmlFor="Gross">Ganancia</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    type="text" 
                    id="Gross" 
                    name="Gross" />
                    
                    <ErrorMessage name= "Gross" component={()=>(
                        <div className={styles.formError}>{errors.Gross}</div>
                    )}></ErrorMessage>
                </div>
                <div className="flex flex-col">
                <label className="text-lg" htmlFor="deshabilitar">Deshabilitar</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2"
                    type="text" 
                    id="deshabilitar" 
                    name="deshabilitar" />
                    
                    <ErrorMessage name= "deshabilitar" component={()=>(
                        <div className={styles.formError}>{errors.deshabilitar}</div>
                    )}></ErrorMessage>
                </div>

                {sentForm && <p className="text-lg text-morado font-poppins">Formulario enviado con éxito!</p>}
                <div className="flex space-x-4 mb-20">
                <button className="text-lg font-poppins bg-moradito text-white hover:bg-lila py-2 px-4 rounded-xl" type='submit' onClick={() => setButtonPressed('create')}>Crear</button>
                <button className="text-lg font-poppins bg-moradito text-white hover:bg-lila  py-2 px-4 rounded-xl" type='submit' onClick={() => setButtonPressed('edit')}>Editar</button>
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
                    console.log("axios.post")
                    
                  } else if (buttonPressed === 'edit') {
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
                    <label className="text-lg" htmlFor="schedule.time">Hora</label>
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
                    <label className="text-lg" htmlFor="schedule.days">Días</label>
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
                    <label className="text-lg" htmlFor="network.country.timezone">Zona horaria</label>
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
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="summary">Resumen</label>
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
                <div className="flex flex-col">
                    <label className="text-lg" htmlFor="deshabilitar">Deshabilitar</label>
                    <Field 
                    className="p-2 border border-lila rounded-md ml-3 mb-2" 
                    type="text" 
                    id="deshabilitar" 
                    name="deshabilitar" />
                    
                    <ErrorMessage name= "deshabilitar" component={()=>(
                        <div className={styles.formError}>{errors.deshabilitar}</div>
                    )}></ErrorMessage>
                </div>
                
                {sentForm && <p className={styles.formSucces}>Formulario enviado con éxito!</p>}
                <div className="flex space-x-4 mb-20">
                <button className="text-lg font-poppins bg-moradito text-white hover:bg-lila py-2 px-4 rounded-xl" type='submit' onClick={() => setButtonPressed('create')}>Crear</button>
                <button className="text-lg font-poppins bg-moradito text-white hover:bg-lila py-2 px-4 rounded-xl" type='submit' onClick={() => setButtonPressed('edit')}>Editar</button>
                </div>
            </Form>
            )}

        </Formik>
        )}
        
    </>
  )
}

export default FormCreate