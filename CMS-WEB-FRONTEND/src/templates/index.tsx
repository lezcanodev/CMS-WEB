import { lazy } from 'react';
import { Box } from '@mui/material';
import { ITemplateElements } from './interfaces';

// Asocia una plantilla con su grupo de componentes
export const TEMPLATES: {[templateFolder: string]: ITemplateElements} = {
    'template1': {
        // Layouts
        MainLayout: ({children}) => <Box style={{background: '#F5F7F9', height:'100vh', width: '100vw', overflow: 'auto'}} > {children}</Box>,
        
        // Paginas
        InicioPage: lazy(() => import(`@/templates/template1/pages/Inicio.page`) ),
        LoginPage: lazy(() => import(`@/templates/template1/pages/Login.page`) ),
        RegisterPage: lazy(() => import(`@/templates/template1/pages/Register.page`) ),

        // Componentes
        LoadingPageComponent: () => <h1>Loading plantilla 1....</h1>,
    },

    'template2': {
        // Layouts
        MainLayout: ({children}) => <Box style={{background: '#F5F7F9', height:'100vh', width: '100vw', overflow: 'auto'}} > {children}</Box>,
        
        // Paginas
        InicioPage: lazy(() => import(`@/templates/template2/pages/Inicio.page`) ),
        LoginPage: lazy(() => import(`@/templates/template2/pages/Login.page`) ),
        RegisterPage: lazy(() => import(`@/templates/template2/pages/Register.page`) ),

        // Componentes
        LoadingPageComponent: () => <h1>Loading plantilla 2....</h1>,
    },
}