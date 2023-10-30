import React from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
//comentario que uso para ver si sí se sube mi repo :'c jaja borralo después que lo veas xD
function Register() {
  return (
    <div class="flex items-center justify-center min-h-screen">
      <div class="w-[500px] h-[500px] p-4 bg-white shadow-md rounded-lg">
        <Formik
        initialValues={{
          userName:"",
          email:"",
          password:"",
          date:"",
        }}
        onSubmit={()=>{

        }}>
          {({errors})=>(
            <Form className="text-moradito font-poppins flex flex-col items-center space-y-4 mt-10">
              <div>
              <label className="text-xl mb-2 text-moradito">Registro</label>
              </div>
              <div  className="flex flex-col">
                <Field
                className="p-2 border border-lila rounded-md ml-3 mb-2"
                name="username"
                type="text"
                placeholder="Nombre de usuario">
                </Field>
              </div>
              <div  className="flex flex-col">
                <Field
                className="p-2 border border-lila rounded-md ml-3 mb-2"
                name="email"
                type="text"
                placeholder="Correo electrónico">
                </Field>
              </div>
              <div  className="flex flex-col">
                <Field
                className="p-2 border border-lila rounded-md ml-3 mb-2"
                name="password"
                type="password"
                placeholder="Contraseña">
                </Field>
              </div>
              <div  className="flex flex-col">
                <Field
                className="p-2 border border-lila rounded-md ml-3 mb-2"
                name="date"
                type="date">
                </Field>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Register