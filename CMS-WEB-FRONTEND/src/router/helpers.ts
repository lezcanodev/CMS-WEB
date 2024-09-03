

//export const BASE_URL = `/CMS-WEB-FRONT-PROD/`; // para localhost debe ser BASE_URL = `/'
export const BASE_URL = `/`;

const PUBLIC_ROUTES: {[routeName: string]: string} = {
    'inicio': BASE_URL,  
    'ingresar': BASE_URL+'seguridad/ingresar',
    'registrarse': BASE_URL+'seguridad/registrarse'
};

const PRIVATE_ROUTES: {[routeName: string]: string} = {
    'dashboard': BASE_URL+'dashboard',
    'dashboard.home': BASE_URL+'dashboard/home'
};

export function getRouteByName(routeName: string){
  return PUBLIC_ROUTES?.[routeName]  || PRIVATE_ROUTES?.[routeName] ||  '/';
}