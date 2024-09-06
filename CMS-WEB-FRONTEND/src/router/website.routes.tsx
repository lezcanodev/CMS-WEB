import { createBrowserRouter, RouteObject } from 'react-router-dom';
import DashboardLayout from '@/layouts/dasboard.layout';

// Paginas
import Home from '@/pages/dashboard/Home';
import { LoginPage } from '@/pages/Login.page';
import { InicioPage } from '../pages/Inicio.page';
import { MainLayout } from '../layouts/Main.layout';

// Routes
import { BASE_URL } from './helpers';
import { ProtectedRoute } from './middlewares/ProtectedRoute';
import { RegisterPage } from '@/pages/Register.page';
import GestionCategorias from '@/pages/dashboard/gestionCategorias';
import GestionLibros from '@/pages/dashboard/gestionLibros';

// Rutas publicas accesibles sin necesidad de autenticación
const PublicRoutes: RouteObject[] = [
  {
    path: BASE_URL,
    element: <MainLayout/>,
    children: [
      {
        index: true,
        element: <InicioPage/>
      },
      {
        path: "seguridad",
        element: <ProtectedRoute inverse={true}><MainLayout/></ProtectedRoute>,
        children: [
          {
            path: "ingresar",
            element:  <LoginPage /> 
          },
          {
            path: "registrarse",
            element: <RegisterPage />,
          }
        ]
      }
    ]
  }
];

// Rutas que require estar autenticado
const PrivateRoutes: RouteObject[] = [
  {
    path: BASE_URL+'dashboard',
    element: <ProtectedRoute><DashboardLayout/></ProtectedRoute>,
    children: [
      {
        path:'home',
        element: <Home/>
      },{
        path: 'gestion-categorias',
        element: <GestionCategorias />
      },{
        path: 'gestion-libros',
        element: <GestionLibros />
      }
    ]
  }
]


export const router = createBrowserRouter([
    ...PublicRoutes,
    ...PrivateRoutes
]);