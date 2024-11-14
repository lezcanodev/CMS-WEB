import { api } from '@/api';
import { useAppDispatch, useAppSelector } from '@/redux'
import { useEffect, useState } from 'react';
import SectionTable from '@/components/SectionTable';
import { Box, Button, Stack } from '@mui/material';

interface HistorialLibroProps{
    libroId: number,
    libroNombre: string
}
export function HistorialLibro({ libroId, libroNombre }: HistorialLibroProps){
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.api.historialLibro.listadoHistorialLibro);
    const {data: listadoHistorial} = useAppSelector(st => st.api.historialLibro.listadoHistorialLibro);
    const [cambio_filtrado, setFiltrado] = useState(listadoHistorial?.data || []);

    useEffect(() => {
        dispatch(api.historialLibro.listarHistorialLibroThunk({libroId: libroId}))
	.unwrap()
        .then((response) => {
            setFiltrado(response.data || []);
        });
    }, [libroId])

    const handleSearch = (busq: string) => {
        
		if(busq !== ''){
			/* Filtramos segun su contenido */
            console.log(listadoHistorial?.data?.[0].accion);
			const cambiosFiltrados = listadoHistorial?.data?.filter(cambio => 
				cambio.accion.toLowerCase().includes(busq.toLowerCase())
			);
            console.log(cambiosFiltrados);
			/* asignamos lo que se va a mostrar */
			setFiltrado(cambiosFiltrados || []);

		}else{
			setFiltrado(listadoHistorial?.data || []);
		} 
    }
	
    return <>
	    <SectionTable
            title={`Listado de Cambios - ${libroNombre}`}
            puedoCrear={false}				    /* no utilizado para la pagina actual*/
            onSearch={handleSearch}
            onCreate={nothing}					/* no utilizado para la pagina actual*/
            masOpciones={
                null					/* todavia no se que agregar aca pero vere...*/
            }
            loading={loading}
            columns={[
                {columnName: 'Fecha', key:'fecha'},
                {columnName: 'Autor', key:'usuarioNombre'},
                //{columnName: 'Estado', key:'estado', action:(currentRow) => {return <></>}} //(necesitamos que el back traiga un solo libro con el id)
                {columnName: 'Acción', key:'accion'}
            ]}
            rows={cambio_filtrado || []}
        />
    </>
}

function nothing(){
}