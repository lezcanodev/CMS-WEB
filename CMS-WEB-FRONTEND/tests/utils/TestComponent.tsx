import React from 'react';
import { Provider } from 'react-redux';
import store, { useAppDispatch } from '@/redux';
import { useEffect } from 'react';
import { seguridadIngresarThunk } from '@/api/seguridad/Ingresar/ingresar.thunk';
import { getPermisos } from '@/redux/permisos/permisos.slice';
import { RefrescarToken } from '@/router/middlewares/RefrescarToken';
import { TemplateProvider } from '@/contexts/templateContext';
import { MemoryRouter } from 'react-router-dom';

/**
 * Se encarga de proporcionar el estado a los componentes de prueba
 * @param param0 
 * @returns 
 */
export const TestComponent = ({children}: any) => {
  return <Provider store={store}> 
          <MemoryRouter>
              <TestComponent2>
                {children}
              </TestComponent2>
          </MemoryRouter>
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