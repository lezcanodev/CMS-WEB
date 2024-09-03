import { IInicioPage } from './pages/inicio.page.interface';
import { ILoginPage } from './pages/login.page.interface';
import { IRegisterPage } from './pages/register.page.interface';

// Define los elementos que debe tener cada plantilla
export interface ITemplateElements{
    //Layouts
    MainLayout: ({children}: {children: React.ReactElement}) => React.ReactElement;

    // Paginas
    InicioPage: React.LazyExoticComponent<React.FC<IInicioPage>>;
    LoginPage: React.LazyExoticComponent<React.FC<ILoginPage>>;
    RegisterPage: React.LazyExoticComponent<React.FC<IRegisterPage>>;

    // Componentes
    LoadingPageComponent: () => React.ReactElement;
}