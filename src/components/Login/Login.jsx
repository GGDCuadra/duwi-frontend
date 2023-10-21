import React from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import { Link } from 'react-router-dom'
// import * as yup from 'yup';
//comentario que uso para ver si sí se sube mi repo :'c jaja borralo después que lo veas xD
function Login() {
  return (
    <div class="flex items-center justify-center min-h-screen">
      <div class="w-[500px] h-[500px] p-4 bg-white shadow-md rounded-lg">
      <Formik
      initialValues={{
        email:'',
        password:''}}
     
      onSubmit={()=>{
        console.log("Sesión iniciada")
      }}>
      
      {({errors})=>(
        <Form className="text-moradito font-poppins flex flex-col items-center space-y-4 mt-10">
          <div>
          <label className="text-xl mb-2 text-moradito">Iniciar Sesión</label>
          </div>
          <div className="flex flex-col">
            
            <Field
            className="p-2 border border-lila rounded-md ml-3 mb-2"
            name="email"
            type="text"
            placeholder= "Correo electrónico">

            </Field>
            
          </div>
          <div className="flex flex-col">
            
            <Field
            className="p-2 border border-lila rounded-md ml-3 mb-2"
            name="password"
            type="text"
            placeholder= "Contraseña">

            </Field>
            
          </div>
          <div>
          <button className="text-lg font-poppins bg-moradito text-white hover:bg-lila  py-2 px-4 rounded-xl" type='submit' >Iniciar Sesión</button>
          </div>
          <div>
            <Link to="/register">
            <button className="text-lg font-poppins bg-moradito text-white hover:bg-lila  py-2 px-4 rounded-xl" type='button'>Crear una nueva cuenta</button>
            </Link>
          </div>
        </Form>
      )}
    </Formik>

    </div>
    </div>
    
    

    
    
  )
}

export default Login