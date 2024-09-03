import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/redux';

// Api
import { seguridadRegistrarseThunk } from '@/api/seguridad/register/register.thunk';

// hooks
import { useTemplate } from '@/contexts/templateContext/useTemplate';

// helpers
import { getRouteByName } from '@/router/helpers';

// esquema de datos para el formulario login
const registerDataSchema = Yup.object({
  username: Yup.string().required('El campo es obligatorio'),
  password: Yup.string().required('El campo es obligatorio').min(6, 'debe tener 6 caracteres mínimos')
});

export function RegisterPage(){
    const {elements} = useTemplate();
    const RegisterPageElement = elements['RegisterPage'];
    const { error, loading } = useAppSelector((state) => state.api.seguridad.registrarse);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const formikRegister = useFormik({
      initialValues: {
        username: '',
        password: ''
      },
      validationSchema: registerDataSchema,
      onSubmit: (values) => {
        dispatch(seguridadRegistrarseThunk({
          username: values.username,
          password: values.password
        }))
        .unwrap()
        .then(() => {
          navigate(getRouteByName('ingresar'));
        })
        .catch(error => {
          const errors: any = {};
          if(error?.username){
            errors['username'] = error?.username?.toString() || 'El campo no es valido';
          }
          if(error?.password){
            errors['password'] = error?.password?.toString() || 'El campo no es valido';
          }
          formikRegister.setErrors(errors);
        });
      } 
    })


    return <>
        <RegisterPageElement 
            onSubmitRegister={formikRegister.handleSubmit}
            goToLogin={() => { navigate(getRouteByName('ingresar')) }}
            stateSubmit={{
              error: error,
              loading: loading
            }}
            inputs={{
                username: {
                  type: 'text',
                  label: 'Nombre de usuario',
                  name:'username',
                  value: formikRegister.values.username,
                  onChange: formikRegister.handleChange,
                  onBlur: formikRegister.handleBlur,
                  error: !!(formikRegister.touched.username && Boolean(formikRegister.errors.username)),
                  helperText: formikRegister.touched.username && formikRegister.errors.username as any
                },
                password: {
                  type: 'password',
                  label: "Contraseña",
                  name: 'password',
                  value: formikRegister.values.password,
                  onChange: formikRegister.handleChange,
                  onBlur: formikRegister.handleBlur,
                  error: !!(formikRegister.touched.password && Boolean(formikRegister.errors.password)),
                  helperText: formikRegister.touched.password && formikRegister.errors.password as any
                }
            }}
        /> 
    </>
}
