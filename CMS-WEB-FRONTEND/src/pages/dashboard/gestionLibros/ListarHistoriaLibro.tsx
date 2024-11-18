/**
 * Este modulo contiene el componente encargado de mostrar el
 * historial de modificaciones de un libro especifico
 * 
 * @packageDocumentation GUI-Libros
 */
import { api } from '@/api';
import { useAppDispatch, useAppSelector } from '@/redux'
import { ReactElement, useEffect, useState } from 'react';
import SectionTable from '@/components/SectionTable';
import { snackbarActions } from '@/redux/snackbar/snackbar.slice';
import { ApiListarHistorialLibroResponse } from '@/api/gestionHistorial/listarHistorialLibro/listarHistorialLibro.model';

/**
 * Propiedades requeridas por el componente {@link HistorialLibro}.
 */
export interface HistorialLibroProps {
    /** Identificador único del libro. */
    libroId: number;

    /** Nombre del libro cuyo historial se mostrará. */
    libroNombre: string;
}

/**
 * Componente que realiza una solicitud a la api ({@link ApiListarHistorialLibro}) para obtener el historial de modificaciones
 * de un libro y luego muestra el historial en una tabla.
 * 
 * Este componente genera una tabla con el historial de cambios realizados sobre un libro. 
 * Las columnas incluyen: 
 *  - Fecha de la modificación.
 *  - El autor que realizó la acción.
 *  - La descripción de la acción.
 * 
 * @param props - Propiedades necesarias para utilizar el componente
 * 
 * @example
 * Ejemplo de uso, se le debe pasar el id del libro y el nombre
 * ```tsx
 *  <HistorialLibro
 *      libroId={1}
 *      libroNombre={'nombre'}
 *  />
 * ```
 * 
 * @returns ReactElement - Una tabla con el historial de modificaciones.
 * 
 * @category Component
 */
export function HistorialLibro({ libroId, libroNombre }: HistorialLibroProps): ReactElement{
    // para realizar la solicitud a la api
    const dispatch = useAppDispatch();
    
    // Contiene el estado de hacer la solicitud a la api para listar historial
    const { data: listadoHistorial, loading } = useAppSelector((state) => state.api.historialLibro.listadoHistorialLibro);
    
    // guardamos aquí el historial para posteriormente aplicar filtros
    const [cambio_filtrado, setFiltrado] = useState<ApiListarHistorialLibroResponse>([]);

    // Realizamos la solicitud del historial y lo guardamos en el estado cambio_filtrado
    useEffect(() => {
        // solicitud
        dispatch(api.historialLibro.listarHistorialLibroThunk({libroId: libroId}))
	    .unwrap()
        .then((response) => {
            // si es exitosa guardamos en el estado cambio_filtrado
            setFiltrado(response.data || []);
        })
        .catch(() => {
            // si es fallido mostramos un error
            dispatch(snackbarActions.openSnackbar({
                message: 'Ha ocurrido un error al intentar obtener el historial',
                type: 'error'
            }))
        });
    }, [libroId])


    /**
     * Se encarga de aplicar el filtro de búsqueda y ponerlo al estado cambio_filtrado
     * @param busqueda - Es una cadena que representa lo que se quiere buscar
     */
    const handleSearch = (busqueda: string) => {
        const modificaciones = listadoHistorial?.data || [];
        const filtroAplicado = applySearch(busqueda, modificaciones);
        setFiltrado(filtroAplicado);
    }
	
    /**
     * Retornamos la tabla que contiene las modificaciones hechas al libro
     */
    return <>
	    <SectionTable
            title={`Listado de Cambios - ${libroNombre}`}
            puedoCrear={false}
            onSearch={handleSearch}
            loading={loading}
            columns={[
                {columnName: 'Fecha', key:'fecha'},
                {columnName: 'Autor', key:'usuarioNombre'},
                {columnName: 'Acción', key:'accion',
                    action: (currentRow) => {
                        return <>
                            {currentRow?.accion?.split('\\n')?.map((line, index) => {
                                return <p key={line+index}>- {line}</p>;
                            }) }
                        </>
                    }
                }
            ]}
            rows={cambio_filtrado || []}
        />
    </>
}


/**
 * Se encarga de filtrar el array del historial y retorna solo los elementos
 * que cumplen los criterios de búsqueda.
 * 
 * @param busqueda - Es una cadena que representa  lo que se quiere buscar en el estadoActual
 * @param estadoActual - Es un array del historial donde se aplicara la búsqueda
 * 
 * @returns array del historial con la búsqueda aplicada
 */
export const applySearch = (busqueda: string, estadoActual: ApiListarHistorialLibroResponse): ApiListarHistorialLibroResponse => {
    // buscamos solo si búsqueda no es vacio
    if(busqueda !== ''){
        /* Filtramos según su contenido */
        const cambiosFiltrados = estadoActual?.filter(cambio => 
            // si la búsqueda esta incluida entonces el elemento cumple el criterio
            cambio.accion.toLowerCase().includes(busqueda.toLowerCase())
        );
      
        /* asignamos lo que se va a mostrar */
        return cambiosFiltrados || [];

    }else{
        // retornamos el estado actual sin filtros si la búsqueda esta vacía
        return estadoActual || [];
    } 
} 