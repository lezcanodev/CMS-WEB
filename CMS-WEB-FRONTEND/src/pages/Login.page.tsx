import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/redux';

// Api
import { seguridadIngresarThunk } from '@/api/seguridad/Ingresar/ingresar.thunk';

// hooks
import { useTemplate } from '@/contexts/templateContext/useTemplate';

// helpers
import { getRouteByName } from '@/router/helpers';

// esquema de datos para el formulario login
const loginDataSchema = Yup.object({
  username: Yup.string().required('El campo es obligatorio'),
  password: Yup.string().required('El campo es obligatorio')
});

export function LoginPage(){
    const {elements} = useTemplate();
    const InicioPageElement = elements['LoginPage'];
    const { error, loading } = useAppSelector((state) => state.api.seguridad.ingresar);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const formikLogin = useFormik({
      initialValues: {
        username: '',
        password: ''
      },
      validationSchema: loginDataSchema,
      onSubmit: (values) => {
        dispatch(seguridadIngresarThunk({
          username: values.username,
          password: values.password
        }))
        .unwrap()
        .then(() => {
          navigate(getRouteByName('inicio'));
        });
      } 
    })


    return <>
        <InicioPageElement 
            onSubmitLogin={formikLogin.handleSubmit}
            goToResetPassword={() => { navigate(getRouteByName('')) }}
            goToResetRegister={() => { navigate(getRouteByName('registrarse')) }}
            stateSubmit={{
              error: error,
              loading: loading
            }}
            inputs={{
                username: {
                  type: 'text',
                  label: 'Nombre de usuario',
                  name:'username',
                  value: formikLogin.values.username,
                  onChange: formikLogin.handleChange,
                  onBlur: formikLogin.handleBlur,
                  error: !!(formikLogin.touched.username && Boolean(formikLogin.errors.username)),
                  helperText: formikLogin.touched.username && formikLogin.errors.username as any
                },
                password: {
                  type: 'password',
                  label: "Contraseña",
                  name: 'password',
                  value: formikLogin.values.password,
                  onChange: formikLogin.handleChange,
                  onBlur: formikLogin.handleBlur,
                  error: !!(formikLogin.touched.password && Boolean(formikLogin.errors.password)),
                  helperText: formikLogin.touched.password && formikLogin.errors.password as any
                }
            }}
        /> 
    </>
}
