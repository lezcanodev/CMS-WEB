import { Grid,  Stack, Typography } from '@mui/material';
import { ReactElement, useEffect } from 'react';
import { api } from '@/api';
import { useAppDispatch, useAppSelector } from '@/redux';
import { Link } from 'react-router-dom';
import { getRouteByName } from '@/router/helpers';
import { PodioLibros } from '@/components/PodioLibros';

/**
 * Este componente se encarga de gestionar una solicitud a la api para obtener los reportes de los libros mas vistos y luego
 * retornar la interfaz gráfica para visualizar el reporte.
 * 
 * ## Este reporte incluye:
 *      - Sumatoria del total de vistas de todos los libros
 *      - Podio de los 3 libros mas vistos
 *      - Listado de los demás libros ordenados de forma descendente por vistas
 * 
 * 
 * ## Forma de uso:
 * Solo se debe llamar al componente para visualizar este reporte
 * 
 * ```tsx
 *  <RankMasVistos />
 * ```
 * 
 * @returns {ReactElement} Elemento JSX que representa el reporte de libros más vistos.
 * @category Component
 * 
 */
export function RankMasVistos(): ReactElement{
    const dispatch = useAppDispatch();
    const { data: reporteMasVistos, loading  } = useAppSelector(state => state.api.reporte.reportMasVistos);  

    // Hacemos las solicitud para obtener el reporte
    useEffect(() => {
        dispatch(api.reporte.reportMasVistosThunk());
    }, [])

    return (
        <div className="content" style={{padding: '30px',marginLeft:'60px'}}>
            
            {/* Titulo */}
            <Typography variant={'h5'} fontWeight={'bold'} style={{opacity: .5}} >Mas vistos</Typography>
            
            {/* Subtitulo */}
            <Typography style={{ fontSize: '.9em', fontWeight: 'bold', marginBottom: '25px'}}>
                Total de vistas: {reporteMasVistos?.data?.totalVistas}
            </Typography>
            
            <div className="container" style={{ margin: '10 auto', background: '#ffffff57', padding:8, borderRadius:8}}>
               
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
                    {reporteMasVistos?.data?.podio?.length === 0 && (
                        <Grid item xs={12}>
                            <Stack alignItems={'center'}>
                                <Typography>No hay datos para mostrar</Typography>
                            </Stack>
                        </Grid>
                    )}

                    {/* Top 3 de los mas gustados */}
                    <Grid item xs={12}>
                        <PodioLibros
                            libros={reporteMasVistos?.data?.podio || []}
                            count={(libro) => libro?.vistas ?? 0 }
                        />
                    </Grid>

                    {/* listados de los demás libros ordenados por vistas de forma descendente */}
                    <Grid item xs={12}>
                        <Stack mt={9} direction={'row'} sx={{overflowX:'auto'}} gap={2} p={2}>
                            {reporteMasVistos?.data?.reporte.map((item) => (
                                <Stack direction='column' alignItems={'center'} key={item?.id} maxWidth={100}>
                                   <div style={{width: 80}}>
                                    <img src='https://i0.wp.com/www.pol.una.py/wp-content/uploads/llamado-a-concurso.jpg?resize=768%2C768&ssl=1' 
                                    style={{width: '100%', objectFit: 'cover', overflow: 'clip',borderRadius: '10px',boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', transition: 'box-shadow 0.3s ease' /* Suaviza el cambio de sombra */}} />
                                   </div>
                                   <div style={{textAlign:'left', width: '100%'}}>
                                        <Link to={getRouteByName('verLibro', {id: item?.id})} target='_blank'>                                         
                                            <h3>{item.titulo}</h3>
                                            <p>{item.autorNombre}</p>
                                        </Link>
                                       <p>{item.vistas} vistas</p>
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