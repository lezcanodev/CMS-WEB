

//export const BASE_URL = `/CMS-WEB-FRONT-PROD/`; // para localhost debe ser BASE_URL = `/'
export const BASE_URL = `/`;

const PUBLIC_ROUTES: {[routeName: string]: string} = {
    'inicio': BASE_URL,  
    'ingresar': BASE_URL+'seguridad/ingresar',
    'registrarse': BASE_URL+'seguridad/registrarse',
    'verLibro': BASE_URL+'ver-libro/:id'
};

const PRIVATE_ROUTES: {[routeName: string]: string} = {
    'dashboard': BASE_URL+'dashboard',
    'dashboard.home': BASE_URL+'dashboard/home',
    'dashboard.gestioCategoria': BASE_URL+'dashboard/gestion-categorias',
    'dashboard.gestioLibro': BASE_URL+'dashboard/gestion-libros',
    'dashboard.gestioUsuarios': BASE_URL+'dashboard/gestion-usuarios'
};

export function getRouteByName(routeName: string, params?: {[param: string]: any}){
  if(params){
    let route = '/';
    Object.keys(params).forEach((param) => {
      route = (PUBLIC_ROUTES?.[routeName]  || PRIVATE_ROUTES?.[routeName])?.replace(':'+param, params[param]) || '/';
    })
    return route;
  }
  
  return PUBLIC_ROUTES?.[routeName]  || PRIVATE_ROUTES?.[routeName] ||  '/';
}