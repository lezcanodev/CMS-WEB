import { api } from '@/api';
import { useAppDispatch, useAppSelector } from '@/redux'
import { useEffect } from 'react'

interface HistorialLibroProps{
    libroId: number,
    libroNombre: string,
}
export function HistorialLibro({ libroId, libroNombre }: HistorialLibroProps){
    const dispatch = useAppDispatch();
    const {data: listadoHistorial} = useAppSelector(st => st.api.historialLibro.listadoHistorialLibro);

    useEffect(() => {
        dispatch(api.historialLibro.listarHistorialLibroThunk({libroId: 1}))
    }, [libroId]) 

    return <>{JSON.stringify(listadoHistorial?.data)}</>
}