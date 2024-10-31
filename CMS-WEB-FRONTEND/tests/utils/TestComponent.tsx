import React from 'react';
import { Provider } from 'react-redux';
import store, { useAppDispatch } from '../../src/redux';
import { useEffect } from 'react';
import { seguridadIngresarThunk } from '../../src/api/seguridad/Ingresar/ingresar.thunk';
import { getPermisos } from '../../src/redux/permisos/permisos.slice';
import { RefrescarToken } from '../../src/router/middlewares/RefrescarToken';
import { TemplateProvider } from '../../src/contexts/templateContext';

/**
 * Se encarga de proporcionar el estado a los componentes de prueba
 * @param param0 
 * @returns 
 */
export const TestComponent = ({children}: any) => {
  return <Provider store={store}> 
            <TestComponent2>
              {children}
            </TestComponent2>
        </Provider>
}
  
const TestComponent2 = ({children}: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Ingresamos con algún usuario administrador de prueba para realizar los tests
    dispatch(seguridadIngresarThunk({
        username: 'admin2',
        password: '123456'
      }))
      .unwrap()
      .then((data) => {
          console.log("Ingresamos con el usuario de prueba")
          dispatch(getPermisos());
      })
      .catch(err => {
        console.log("Ocurrió un error al intentar ingresar")
      });
  }, [])

  return <RefrescarToken>
                  <TemplateProvider template={'template1'}>
                            {children}
                  </TemplateProvider>
            </RefrescarToken>

}