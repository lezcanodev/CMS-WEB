import { useAppSelector } from '@/redux';
import { useNavigate } from 'react-router';
import { getRouteByName } from '../helpers';
import { useEffect } from 'react';

export function ProtectedRoute({children, inverse = false}: {children: React.ReactNode, inverse?: boolean}){
    const { data } = useAppSelector((state) => state.api.seguridad.ingresar);
    const navigate = useNavigate();

    useEffect(() => {
        if((!data && !inverse) || (data && inverse)){
            navigate(getRouteByName('inicio'));
        }
    },[data])

    return <>
        {!((!data && !inverse) || (data && inverse)) && <>{children}</>}
    </>;
}