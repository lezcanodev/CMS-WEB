import { logout } from '@/api/seguridad/seguridad.reducer';
import { useTemplate } from '@/contexts/templateContext/useTemplate';
import { useAppDispatch, useAppSelector } from '@/redux';
import { getRouteByName } from '@/router/helpers';
import { useNavigate } from 'react-router';

export function InicioPage(){
    const dispatch = useAppDispatch();
    const {elements} = useTemplate();
    const InicioPageElement = elements['InicioPage'];
    const { data } = useAppSelector((state) => state.api.seguridad.ingresar);
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate(getRouteByName('ingresar'));
    }
    
    const goToRegister = () => {
        navigate(getRouteByName('registrarse'));
    } 

    const handleLogout = () => {
        dispatch(logout());
        navigate(getRouteByName('inicio'));
    }

    return <InicioPageElement 
        title='Ingeniería de software II'
        logout={handleLogout}
        goToDashboard={() => {navigate(getRouteByName('dashboard'))}}
        auth={{
            isAuth: !!data,
            userData: {
                username: data?.extraData?.username || '???'
            }
        }}
        goToLogin={goToLogin}
        goToRegister={goToRegister}
    />;
}
