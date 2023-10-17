import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as yup from 'yup';
import styles from './FormCreate.module.css'

const FormCreate = () => {
    const [sentForm, setSentForm] = useState(false);
    const [contentType, setContentType] = useState('');
    // const [genresSelect, setGenresSelect] =useState([]);
    const genresMovie =["Crime", "Drama", "Action", "Adventure", "Sci-Fi", "Biography", "History", "Fantasy", "Horror", "Mystery", "Thriller", "Western", "Comedy", "Romance", "Animation", "Family", "War", "Biography", "Music"];
    const genresSerie=["Drama", "Action", "War", "Crime", "Thriller", "Nature", "Adventure", "Science-Fiction", "Western", "Mystery", "Supernatural", "Family", "Romance", "Comedy", "Fantasy", "Medical", "Anime", "Food", "Travel", "History"]
    const week=["Lunes", "Martes","Miércoles","jueves", "Sábado", "Domingo"]

    const handleContentType = (type) =>{
        setContentType(type);
    }
    // const handleChange = (e) =>{
        
    //     if (!genresSelect.includes(e.target.value)) {
    //         setGenresSelect([...genresSelect, e.target.value]);
    //       }
    // }
    // const remove = (e) =>{
    //     const newGenres = genresSelect.filter((g)=> g !== e.target.name)
        
    //     setGenresSelect(newGenres)
    // }

    const FormSchemaMovies = yup.object().shape({
        id: yup.number()
        .typeError("Debe ingresar un número")
        .required("Debe completar este campo"),
        Poster_Link: yup
        .mixed()
        .required("Debe cargar un archivo"),        
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
        webChannel: yup.string().url('Ingresa una URL válida'),
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
        <div>
            <label className={styles.formLabel}> Elija la opción que desea crear:</label>
            
            <input 
                type="radio" 
                id="movie" 
                name="content-type" 
                value="movie"
                checked={contentType === "movie"}
                onChange={() => handleContentType("movie")}></input>
            <label htmlFor="movie">Película</label>
            <input 
                type="radio" 
                id="serie" 
                name="content-type" 
                value="serie"
                checked={contentType === "serie"}
                onChange={() => handleContentType("serie")}></input>
            <label htmlFor="serie">Serie</label>
        </div>
        
        {contentType === "movie" && (
            <Formik
            initialValues={{
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
                
            }}
            
            validationSchema={FormSchemaMovies}

            onSubmit={(values, {resetForm}) =>{
                //Aqui debo agregar la ruta del post de movies pasandolé values
                resetForm();
                setSentForm(true)
                setTimeout(()=> setSentForm(false), 4000)
            }}
        >
            {({errors}) => (
                <Form className={styles.form}>
                    {console.log(errors)}
                
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="id">ID:</label>
                    <Field
                    className={styles.formInput} 
                    type="id" 
                    id="id" 
                    name="id" />
                    <ErrorMessage name= "id" component={()=>(
                        <div className={styles.formError}>{errors.id}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="Poster_Link">Subir poster</label>
                    <Field 
                    type="file" 
                    id="Poster_Link" 
                    name="Poster_Link" />
                    
                    <ErrorMessage name= "Poster_Link" component={()=>(
                        <div className={styles.formError}>{errors.Poster_Link}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="Series_Title">Título de la película</label>
                    <Field 
                    className={styles.formInput}
                    type="Series_Title" 
                    id="Series_Title" 
                    name="Series_Title" />
                    <ErrorMessage name= "Series_Title" component={()=>(
                        <div className={styles.formError}>{errors.Series_Title}</div>
                    )}></ErrorMessage>
                </div>

                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="Released_Year">Año de estreno</label>
                    <Field 
                    className={styles.formInput}
                    type="text" 
                    id="Released_Year" 
                    name="Released_Year" />
                    
                    <ErrorMessage name= "Released_Year" component={()=>(
                        <div className={styles.formError}>{errors.Released_Year}</div>
                    )}></ErrorMessage>
                </div>

                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="Certificate">Certificado</label>
                    <Field 
                    className={styles.formInput}
                    type="text" 
                    id="Certificate" 
                    name="Certificate" />
                    
                    <ErrorMessage name= "Certificate" component={()=>(
                        <div className={styles.formError}>{errors.Certificate}</div>
                    )}></ErrorMessage>
                </div>
                
                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="Runtime">Duración</label>
                    <Field 
                    className={styles.formInput}
                    type="text" 
                    id="Runtime" 
                    name="Runtime" />
                    
                    <ErrorMessage name= "Runtime" component={()=>(
                        <div className={styles.formError}>{errors.Runtime}</div>
                    )}></ErrorMessage>
                </div>

                <div className={styles.formDiv}>
                    
                    <label className={styles.formLabel} htmlFor="Genre">Género</label>
                    <Field 
                    className={styles.formInput} 
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
                
                
                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="IMDB_Rating">Rating</label>
                    <Field 
                    className={styles.formInput}
                    type="text" 
                    id="IMDB_Rating" 
                    name="IMDB_Rating" />
                    
                    <ErrorMessage name= "IMDB_Rating" component={()=>(
                        <div className={styles.formError}>{errors.IMDB_Rating}</div>
                    )}></ErrorMessage>
                </div>

                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="Overview">Descripción</label>
                    <Field 
                    className={styles.formTextarea}
                    name="Overview"
                    as="textarea"
                    placeholder="Overview"/>
                    
                    <ErrorMessage name= "Overview" component={()=>(
                        <div className={styles.formError}>{errors.Overview}</div>
                    )}></ErrorMessage>
                </div>

                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="Meta_score">Puntuación promedio</label>
                    <Field 
                    className={styles.formInput}
                    type="text" 
                    id="Meta_score" 
                    name="Meta_score" />
                    
                    <ErrorMessage name= "Meta_score" component={()=>(
                        <div className={styles.formError}>{errors.Meta_score}</div>
                    )}></ErrorMessage>
                </div>

                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="Director">Director</label>
                    <Field 
                    className={styles.formInput}
                    type="text" 
                    id="Director" 
                    name="Director" />
                    
                    <ErrorMessage name= "Director" component={()=>(
                        <div className={styles.formError}>{errors.Director}</div>
                    )}></ErrorMessage>
                </div>

                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="Star1">Estrella 1</label>
                    <Field 
                    className={styles.formInput}
                    type="text" 
                    id="Star1" 
                    name="Star1" />
                    
                    <ErrorMessage name= "Star1" component={()=>(
                        <div className={styles.formError}>{errors.Star1}</div>
                    )}></ErrorMessage>
                </div>

                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="Star2">Estrella 2</label>
                    <Field 
                    className={styles.formInput}
                    type="text" 
                    id="Star2" 
                    name="Star2" />
                    
                    <ErrorMessage name= "Star2" component={()=>(
                        <div className={styles.formError}>{errors.Star2}</div>
                    )}></ErrorMessage>
                </div>

                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="Star3">Esterlla 3</label>
                    <Field 
                    className={styles.formInput}
                    type="text" 
                    id="Star3" 
                    name="Star3" />
                    
                    <ErrorMessage name= "Star3" component={()=>(
                        <div className={styles.formError}>{errors.Star3}</div>
                    )}></ErrorMessage>
                </div>

                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="Star4">Director</label>
                    <Field 
                    className={styles.formInput}
                    type="text" 
                    id="Star4" 
                    name="Star4" />
                    
                    <ErrorMessage name= "Star4" component={()=>(
                        <div className={styles.formError}>{errors.Star4}</div>
                    )}></ErrorMessage>
                </div>

                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="No_of_Votes">Número de votos</label>
                    <Field 
                    className={styles.formInput}
                    type="text" 
                    id="No_of_Votes" 
                    name="No_of_Votes" />
                    
                    <ErrorMessage name= "No_of_Votes" component={()=>(
                        <div className={styles.formError}>{errors.No_of_Votes}</div>
                    )}></ErrorMessage>
                </div>

                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="Gross">Gross</label>
                    <Field 
                    className={styles.formInput}
                    type="text" 
                    id="Gross" 
                    name="Gross" />
                    
                    <ErrorMessage name= "Gross" component={()=>(
                        <div className={styles.formError}>{errors.Gross}</div>
                    )}></ErrorMessage>
                </div>

                {sentForm && <p className={styles.formSucces}>Formulario enviado con éxito!</p>}
                <button className={styles.formButton} type='submit'>Subir</button>
    
            </Form>
            )}

        </Formik>
        )}


        {contentType === "serie" && (
            <Formik
            initialValues={{
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
            }}}
            
            validationSchema={FormSchemaSeries}

            onSubmit={(values, {resetForm}) =>{
                //Aqui debo agregar la ruta post de series pasandolé values
                resetForm();
                setSentForm(true)
                setTimeout(()=> setSentForm(false), 4000)
            }}
        >
            {({errors}) => (
                <Form className={styles.form}>
                    {console.log(errors)}

                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="url">URL</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="url" 
                    name="url" />
                    <ErrorMessage name= "url" component={()=>(
                        <div className={styles.formError}>{errors.url}</div>
                    )}></ErrorMessage>
                </div>    
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="name">Título de la serie</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="name" 
                    name="name" />
                    <ErrorMessage name= "name" component={()=>(
                        <div className={styles.formError}>{errors.name}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="type">Tipo</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="type" 
                    name="type" />
                    <ErrorMessage name= "type" component={()=>(
                        <div className={styles.formError}>{errors.type}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="language">Lenguaje</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="language" 
                    name="language" />
                    
                    <ErrorMessage name= "language" component={()=>(
                        <div className={styles.formError}>{errors.language}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="genres">Géneros</label>
                    <Field
                    className={styles.formInput} 
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

                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="status">Estado</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="status" 
                    name="status" />
                    
                    <ErrorMessage name= "status" component={()=>(
                        <div className={styles.formError}>{errors.status}</div>
                    )}></ErrorMessage>                    
                </div>
                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="runtime">Duración</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="runtime" 
                    name="runtime" />
                    
                    <ErrorMessage name= "runtime" component={()=>(
                        <div className={styles.formError}>{errors.runtime}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="premiered">Fecha de estreno</label>
                    <Field 
                    className={styles.formInput} 
                    type="date" 
                    id="premiered" 
                    name="premiered" />
                    
                    <ErrorMessage name= "premiered" component={()=>(
                        <div className={styles.formError}>{errors.premiered}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="officialSite">Sitio oficial</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="officialSite" 
                    name="officialSite" />
                    
                    <ErrorMessage name= "officialSite" component={()=>(
                        <div className={styles.formError}>{errors.officialSite}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="schedule.time">Hora</label>
                    <Field 
                    className={styles.formInput} 
                    type="time" 
                    id="schedule.time" 
                    name="schedule.time" />
                    
                    <ErrorMessage name= "schedule.time" component={()=>(
                        <div className={styles.formError}>{errors.schedule.time}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="schedule.days">Días</label>
                    <Field
                    className={styles.formInput} 
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
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="rating.average">Promedio de calificación</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="rating.average" 
                    name="rating.average" />
                    
                    <ErrorMessage name= "rating.average" component={()=>(
                        <div className={styles.formError}>{errors.rating.average}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="weight">Peso</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="weight" 
                    name="weight" />
                    
                    <ErrorMessage name= "weight" component={()=>(
                        <div className={styles.formError}>{errors.weight}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="network.id">ID de la red</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="network.id" 
                    name="network.id" />
                    
                    <ErrorMessage name= "network.id" component={()=>(
                        <div className={styles.formError}>{errors.network.id}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="network.name">Nombre de la red</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="network.name" 
                    name="network.name" />
                    
                    <ErrorMessage name= "network.name" component={()=>(
                        <div className={styles.formError}>{errors.network.name}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="network.country.name">Nombre del pais</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="network.country.name" 
                    name="network.country.name" />
                    
                    <ErrorMessage name= "network.country.name" component={()=>(
                        <div className={styles.formError}>{errors.network.country.name}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="network.country.code">Código postal</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="network.country.code" 
                    name="network.country.code" />
                    
                    <ErrorMessage name= "network.country.code" component={()=>(
                        <div className={styles.formError}>{errors.network.country.code}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="network.country.timezone">Zona horaria</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="network.country.timezone" 
                    name="network.country.timezone" />
                    
                    <ErrorMessage name= "network.country.timezone" component={()=>(
                        <div className={styles.formError}>{errors.network.country.timezone}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="webChannel">Canal web</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="webChannel" 
                    name="webChannel" />
                    
                    <ErrorMessage name= "webChannel" component={()=>(
                        <div className={styles.formError}>{errors.webChannel}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="externals.tvrage">TVRage</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="externals.tvrage" 
                    name="externals.tvrage" />
                    
                    <ErrorMessage name= "externals.tvrage" component={()=>(
                        <div className={styles.formError}>{errors.externals.tvrage}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="externals.thetvdb">TheTVDB</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="externals.thetvdb" 
                    name="externals.thetvdb" />
                    
                    <ErrorMessage name= "externals.thetvdb" component={()=>(
                        <div className={styles.formError}>{errors.externals.thetvdb}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="externals.imdb">IMDb</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="externals.imdb" 
                    name="externals.imdb" />
                    
                    <ErrorMessage name= "externals.imdb" component={()=>(
                        <div className={styles.formError}>{errors.externals.imdb}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="image.medium">Imagen Media</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="image.medium" 
                    name="image.medium" />
                    
                    <ErrorMessage name= "image.medium" component={()=>(
                        <div className={styles.formError}>{errors.image.medium}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="image.original">Imagen Original</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="image.original" 
                    name="image.original" />
                    
                    <ErrorMessage name= "image.original" component={()=>(
                        <div className={styles.formError}>{errors.image.original}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="summary">Resumen</label>
                    <Field 
                    className={styles.formTextarea} 
                    name="summary"
                    as="textarea" 
                    placeholder="Resumen..." 
                     />
                    
                    <ErrorMessage name= "summary" component={()=>(
                        <div className={styles.formError}>{errors.summary}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="updated">Valor de actualización</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="updated" 
                    name="updated" />
                    
                    <ErrorMessage name= "updated" component={()=>(
                        <div className={styles.formError}>{errors.updated}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="_links.self.href">Enlace self</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="_links.self.href" 
                    name="_links.self.href" />
                    
                    <ErrorMessage name= "_links.self.href" component={()=>(
                        <div className={styles.formError}>{errors._links.self.href}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="_links.previousepisode.href">Enlace episodio previo</label>
                    <Field 
                    className={styles.formInput} 
                    type="text" 
                    id="_links.previousepisode.href" 
                    name="_links.previousepisode.href" />
                    
                    <ErrorMessage name= "_links.previousepisode.href" component={()=>(
                        <div className={styles.formError}>{errors._links.previousepisode.href}</div>
                    )}></ErrorMessage>
                </div>
                <button className={styles.formButton} type='submit'>Subir</button>
                {sentForm && <p className={styles.formSucces}>Formulario enviado con éxito!</p>}
    
            </Form>
            )}

        </Formik>
        )}
        
    </>
  )
}

export default FormCreate