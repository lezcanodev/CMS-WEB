import React from 'react';
import {  Grid,   Stack,  Typography, } from '@mui/material';
import { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux';
import { Link } from 'react-router-dom';
import { getRouteByName } from '@/router/helpers';
import { api } from '@/api';
import { PodioLibros } from '@/components/PodioLibros';

/**
 * Este componente se encarga de gestionar una solicitud a la api para obtener los reportes de los libros mas gustados
 * ({@link ApiReportMasGustados!}) y luego
 * retornar la interfaz gráfica para visualizar los reportes.
 * 
 * ## Este reporte incluye:
 *      - Sumatoria del total de likes de todos los libros
 *      - Podio de los 3 libros mas gustados
 *      - Listado de los demás libros ordenados de forma descendente por likes
 * 
 * 
 * ## Forma de uso:
 * Solo se debe llamar al componente para visualizar este reporte
 * 
 * ```tsx
 *  <RankMasGustados />
 * ```
 * 
 * @returns {ReactElement} Elemento JSX que representa el reporte de libros más gustados.
 * @category Component
 * 
 */
export function RankMasGustados(): ReactElement{
    const dispatch = useAppDispatch();
    const { data: reporteMasGustados, loading } = useAppSelector((state) => state.api.reporte.reporteMasGustado);

    // Hacemos las solicitud para obtener el reporte
    useEffect(() => {
        dispatch(api.reporte.reportMasGustadosThunk())
    }, [])

    // Gráficos del reporte
    return (
        <div style={{padding: '30px',marginLeft:'60px', width: '100%' }}>
            
            {/* Titulo */}
            <Typography variant={'h5'} fontWeight={'bold'} style={{opacity: .5}} >Mas gustados</Typography>
            
            {/* SubTitulo */}
            <Typography style={{ fontSize: '.9em', fontWeight: 'bold', marginBottom: '25px'}}>
                Total de likes: { !!loading ? '...' : reporteMasGustados?.data?.totalLikes}
            </Typography>

            {/* Contenido */}
            <div style={{ margin: '10 auto', padding:8, borderRadius:8, width: '100%'}}>
               
                <Grid container>
                    
                    {/* Pantalla de carga */}
                    {!!loading && (
                        <Grid item xs={12}>
                            <Stack alignItems={'center'}>
                                <Typography>Cargando datos...</Typography>
                            </Stack>
                        </Grid>
                    )}

                    {/* Mensaje de que no hay datos */}
                    {reporteMasGustados?.data?.podio?.length === 0 && (
                        <Grid item xs={12}>
                            <Stack alignItems={'center'}>
                                <Typography>No hay datos para mostrar</Typography>
                            </Stack>
                        </Grid>
                    )}
                    
                    {/* Top 3 de los mas gustados */}
                    <Grid item xs={12}>
                        <PodioLibros
                            libros={reporteMasGustados?.data?.podio || []}
                            count={(libro) => libro?.likes ?? 0 }
                        />
                    </Grid>

                    {/*  listados de los demás libros ordenados por like de forma descendente */}
                    <Grid item xs={12}>
                        <Stack mt={1} direction={'row'} gap={2} overflow={'auto'} p={2}>
            
                            {reporteMasGustados?.data?.reporte?.map((item) => (
                                <Stack direction='column' key={item.id} alignItems={'center'} maxWidth={100}>
                                   <div style={{width: 80}}>
                                   <img src='https://i0.wp.com/www.pol.una.py/wp-content/uploads/llamado-a-concurso.jpg?resize=768%2C768&ssl=1' 
                                   style={{width: '100%', objectFit: 'cover', overflow: 'clip',borderRadius: '10px',boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', transition: 'box-shadow 0.3s ease' /* Suaviza el cambio de sombra */}} />
                                   </div>
                                   <div style={{textAlign:'left', width: '100%'}}>
                                        <Link to={getRouteByName('verLibro', {id: item?.id})} target='_blank'>                                         
                                            <Typography overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} maxWidth={80}  >
                                                {item.titulo}
                                            </Typography>
                                            <p>{item.autorNombre}</p>
                                        </Link>
                                       <p>{item.likes} likes</p>
                                   </div>
                               </Stack>
                            ))}

                        </Stack>
                    </Grid>
                    
                </Grid>

            </div>
        </div>
    )
}