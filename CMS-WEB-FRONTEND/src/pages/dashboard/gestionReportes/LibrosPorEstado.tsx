
import {  Typography } from '@mui/material';
import { useEffect } from 'react';
import { api } from '@/api';
import { useAppDispatch, useAppSelector } from '@/redux';

/**
 * Este componente se encarga de gestionar una solicitud a la api para obtener los reportes de los libros por estado y luego
 * retornar la interfaz gráfica para visualizar el reporte.
 * 
 * ## Este reporte incluye:
 *      - Total de libros
 *      - Total de libros por estado
 *      - Porcentaje de libros por estado
 * 
 * 
 * ## Forma de uso:
 * Solo se debe llamar al componente para visualizar este reporte
 * 
 * ```tsx
 *  <LibrosPorEstado />
 * ```
 * 
 * @returns {ReactElement} Elemento JSX que representa el reporte de libros por estado.
 * @category Component
 * 
 */
export function LibrosPorEstado(){
    const dispatch = useAppDispatch();
    const { data: librosPorEstado } = useAppSelector((state) => state.api.reporte.reporteLibroPorEstado);

    // Realizamos la solicitud proa obtener el reporte de libros por estado
    useEffect(() => {
        dispatch(api.reporte.reporteLibroPorEstadoThunk())
    },[dispatch]);

    return<>
        <div className="content" style={{padding: '30px',marginLeft:'60px'}}>
            {/* Titulo */}
            <Typography variant={'h5'} fontWeight={'bold'} style={{opacity: .5}} >Libros por estado</Typography>
            
            {/* Sub titulo */}
            <Typography style={{ fontSize: '.8em', fontWeight: 'bold', marginBottom: '25px'}}>
                Total de libros:{librosPorEstado?.data?.totalLibros}
            </Typography>
            
            {/* Muestra la cantidad de libros por estado y el porcentaje */}
            <div className="container" style={{ margin: '10 auto',  padding:8, borderRadius:8}}>
                {Object.keys(librosPorEstado?.data?.cantidadLibrosPorEstado || {})?.map((estado, index) => (
                <div key={index} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom:10
                }}>
                    {/* Muestra el nombre del estado y la cantidad libros */}
                    <div>
                        <div style={{fontSize: '.8em'}}>
                            <h3>{estado} ({librosPorEstado?.data?.cantidadLibrosPorEstado[estado].cantidad})</h3>
                        </div>
                    </div>

                    {/* Muestra una barra que representa el porcentaje de libros en ese estado */}
                    <div style={{
                        width: '100%',
                        border: `1px solid ${librosPorEstado?.data?.cantidadLibrosPorEstado[estado]?.color}2f`,
                        borderRadius: 8,
                        overflow: 'hidden',
                        background:  `${librosPorEstado?.data?.cantidadLibrosPorEstado[estado]?.color}0f`
                    }}>
                        <p style={{
                                    background: librosPorEstado?.data?.cantidadLibrosPorEstado[estado]?.color ,
                                    width:  `${(librosPorEstado?.data?.cantidadLibrosPorEstado[estado]?.porcentaje || 0)*100}%`,
                                    height: 20
                        }} ></p>
                    </div>
                </div>
                ))}
            </div>
            
        </div>
    </>
}
