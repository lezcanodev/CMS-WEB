import { Provider } from 'react-redux';
import { TemplateProvider } from './contexts/templateContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/website.routes';
import store from './redux';
import { RefrescarToken } from './router/middlewares/RefrescarToken';


/**
 * App de inicio
 * @returns 
 */
export default function App(){
    return <>
      <Provider store={store}>
        <RefrescarToken>
          <TemplateProvider template={import.meta.env.VITE_DEFAULT_TEMPLATE}>
              <RouterProvider router={router} />
          </TemplateProvider>
        </RefrescarToken>
      </Provider>
    </>
}