import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as yup from 'yup';
import styles from './FormCreate.module.css'

const FormCreate = () => {
    const [sentForm, setSentForm] = useState(false);
    const [contentType, setContentType] = useState('')

    const handleContentType = (type) =>{
        setContentType(type);
    }

    const FormSchemaMovies = yup.object().shape({
        Series_Title: yup
        .string()
        .required("Debe ingresar el título"),
        Overview: yup
        .string()
        .required("Debe ingresar una descripción"),
        Genre: yup
        .string()
        .required("Debe ingresar al menos un género"),
        Runtime: yup
        .number()
        .typeError("Debe ingresar un número")
        .required("Debe ingresar la duración de la película"),
        Released_Year: yup
        .number()
        .typeError("Debe ingresar un número")
        .required("Debe ingresar el año de estreno"),
        IMDB_Rating: yup
        .number()
        .typeError("Debe ingresar un número")
        .required("Debe ingresar el rating"),
        Poster_Link: yup
        .mixed()
        .required("Debe cargar un archivo")
        
    })
    const FormSchemaSeries = yup.object().shape({
        title: yup
        .string()
        .required("Debe ingresar el título"),
        description: yup
        .string()
        .required("Debe ingresar una descripción"),
        season: yup
        .number()
        .integer("Debe ingresar un número entero")
        .typeError("Debe ingresar un número")
        .required("Debe ingresar la cantidad de temporadas"),
        Genre: yup
        .string()
        .required("Debe ingresar al menos un género"),
        Runtime: yup
        .number()
        .typeError("Debe ingresar un número")
        .required("Debe ingresar la duración de la película"),
        Released_Year: yup
        .number()
        .typeError("Debe ingresar un número")
        .required("Debe ingresar el año de estreno"),
        IMDB_Rating: yup
        .number()
        .typeError("Debe ingresar un número")
        .required("Debe ingresar el rating"),
        poster: yup
        .mixed()
        .required("Debe cargar un archivo")
        
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

            onSubmit={(valores, {resetForm}) =>{
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
                    type="text" 
                    id="Runtime" 
                    name="Runtime" />
                    
                    <ErrorMessage name= "Runtime" component={()=>(
                        <div className={styles.formError}>{errors.Runtime}</div>
                    )}></ErrorMessage>
                </div>

                <div className={styles.formDiv}>
                    
                    <label className={styles.formLabel} htmlFor="Genre">Géneros</label>
                    <Field 
                    type="text" 
                    id="Genre" 
                    name="Genre" />
                    
                    <ErrorMessage name= "Genre" component={()=>(
                        <div className={styles.formError}>{errors.Genre}</div>
                    )}></ErrorMessage>
                </div>
                
                
                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="IMDB_Rating">Rating</label>
                    <Field 
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
                    type="text" 
                    id="Gross" 
                    name="Gross" />
                    
                    <ErrorMessage name= "Gross" component={()=>(
                        <div className={styles.formError}>{errors.Gross}</div>
                    )}></ErrorMessage>
                </div>

                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="deshabilitar">Deshabilitar</label>
                    <Field 
                    type="text" 
                    id="deshabilitar" 
                    name="deshabilitar" />
                    
                    <ErrorMessage name= "deshabilitar" component={()=>(
                        <div className={styles.formError}>{errors.deshabilitar}</div>
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
                title:'',
                season:'',
                genre:'',
                duration:'',
                released:'',
                cast:'',
                description:'',
                trailer:'',
                poster:''
            }}
            
            validationSchema={FormSchemaSeries}

            onSubmit={(valores, {resetForm}) =>{
                resetForm();
                console.log("Formulario enviado")
                setSentForm(true)
                setTimeout(()=> setSentForm(false), 4000)
            }}
        >
            {({errors}) => (
                <Form className={styles.form}>
                    {console.log(errors)}
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="title">Título de serie</label>
                    <Field 
                    type="text" 
                    id="title" 
                    name="title" />
                    <ErrorMessage name= "title" component={()=>(
                        <div className={styles.formError}>{errors.title}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="season">Temporada</label>
                    <Field 
                    type="text" 
                    id="season" 
                    name="season" />
                    <ErrorMessage name= "season" component={()=>(
                        <div className={styles.formError}>{errors.season}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="Genre">Géneros</label>
                    <Field 
                    type="text" 
                    id="Genre" 
                    name="Genre" />
                    
                    <ErrorMessage name= "Genre" component={()=>(
                        <div className={styles.formError}>{errors.Genre}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="Runtime">Duración</label>
                    <Field 
                    type="text" 
                    id="Runtime" 
                    name="Runtime" />
                    
                    <ErrorMessage name= "Runtime" component={()=>(
                        <div className={styles.formError}>{errors.Runtime}</div>
                    )}></ErrorMessage>
                </div>

                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="Released_Year">Año de estreno</label>
                    <Field 
                    type="text" 
                    id="Released_Year" 
                    name="Released_Year" />
                    
                    <ErrorMessage name= "Released_Year" component={()=>(
                        <div className={styles.formError}>{errors.Released_Year}</div>
                    )}></ErrorMessage>                    
                </div>
                <div className={styles.formDiv}>
                <label className={styles.formLabel} htmlFor="IMDB_Rating">Rating</label>
                    <Field 
                    type="text" 
                    id="IMDB_Rating" 
                    name="IMDB_Rating" />
                    
                    <ErrorMessage name= "IMDB_Rating" component={()=>(
                        <div className={styles.formError}>{errors.IMDB_Rating}</div>
                    )}></ErrorMessage>
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="description">Descripción</label>
                    <Field 
                    className={styles.formTextarea}
                    name="description"
                    as="textarea"
                    placeholder="Descripción"/>
                    
                    <ErrorMessage name= "description" component={()=>(
                        <div className={styles.formError}>{errors.description}</div>
                    )}></ErrorMessage>
                </div>
                {/* <div>
                    <label htmlFor="trailer">Subir trailer</label>
                    <Field 
                    type="file" 
                    id="trailer" 
                    name="trailer" />
                    
                    <ErrorMessage name= "trailer" component={()=>(
                        <div>{errors.trailer}</div>
                    )}></ErrorMessage>
                </div> */}
                <div className={styles.formDiv}>
                    <label className={styles.formLabel} htmlFor="poster">Subir poster</label>
                    <Field 
                    type="file" 
                    id="poster" 
                    name="poster" />
                    
                    <ErrorMessage name= "poster" component={()=>(
                        <div className={styles.formError}>{errors.poster}</div>
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