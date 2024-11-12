import { api } from '@/api';
import { logout } from '@/api/seguridad/seguridad.reducer';
import { useTemplate } from '@/contexts/templateContext/useTemplate';
import { useAppDispatch, useAppSelector } from '@/redux';
import { getRouteByName } from '@/router/helpers';
import { UserUtils } from '@/utils/User/User.utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

/**
 * Pagina de inicio del sitio web
 * @returns React.Element
 */
export function InicioPage(){
    const dispatch = useAppDispatch();
    const {elements} = useTemplate();
    const InicioPageElement = elements['InicioPage'];
    const { libro, categoria } = useAppSelector((state) => state.api);
    const { data } = useAppSelector((state) => state.api.seguridad.ingresar);
    const navigate = useNavigate();
    const [currentFilters, setCurrentFilters] = useState<any>({});

    // Se usa momentaneamente para aplicar filtros desde front
    const [libros, setLibros] = useState<any[]>([]);
    const [categorias, setCategorias] = useState<any[]>([]);

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


    useEffect(() => {
        dispatch(api.categoria.categoriaListarApiThunk())
        .unwrap()
        .then(categorias => {
            setCategorias(categorias?.data || [])
        })
        dispatch(api.libro.libroListarApiThunk())
        .unwrap()
        .then(libros => {
            setLibros(libros?.data || [])
        })
    }, [])

    return <InicioPageElement 
        title='Sistema de gestión de contenido web'
        isAdmin={UserUtils.isAdmin()}
        logout={handleLogout}
        goToDashboard={() => {navigate(getRouteByName('dashboard'))}}
        goToLogin={goToLogin}
        goToRegister={goToRegister}
        goToPageVerLibro={(libroId) => {
            navigate(getRouteByName('verLibro', {id: libroId }))
        }}
        applyFilters={(filters, opts) => {
            let newFilters: any = {}; 
            if(opts?.resetFilters){
                newFilters = {...filters};
            }else{
                newFilters = { ...currentFilters, ...filters };
            }
  
            // Filtros desde el front, agregar al backend
            let filterLibros: any[] = [...(libro?.listar?.data?.data || [])];
     
            if(typeof newFilters?.categoriaId !== 'undefined'){
                filterLibros = filterLibros.filter((libro) => libro?.categoria == newFilters?.categoriaId );
                console.log("Se aplico filtro categorias: ", newFilters?.filters?.categoriaId, filterLibros)
            }
            if(typeof newFilters?.buscarPorTexto !== 'undefined'){
                filterLibros = filterLibros.filter((libro) => (new RegExp(newFilters?.buscarPorTexto || '', "i")).test(libro?.contenido +" "+libro?.titulo) );
                console.log("Se aplico filtro por texto: ",newFilters?.filters?.buscarPorTexto,filterLibros)
            }

            setLibros(filterLibros || []);
            setCurrentFilters(newFilters);
        }}
        currentFilters={currentFilters || {}}
        auth={{
            isAuth: !!data,
            userData: {
                username: UserUtils.getUser()?.username || '???'
            }
        }}
        categorias={{
            loading: categoria?.listar?.loading,
            data: categorias  //categoria?.listar?.data?.data || []
        }}
        libros={{
            loading: libro?.listar?.loading,
            data: libro?.listar?.data?.data?.filter(libro => 
                libro.estado.toLowerCase().includes('publicado')) || [],
               
        }}
        
    />;
}
