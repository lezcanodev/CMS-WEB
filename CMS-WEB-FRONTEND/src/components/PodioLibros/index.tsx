import { LibroListarData } from '@/api/gestionLibros/listar/listarLibro.model'
import { getRouteByName } from '@/router/helpers'
import { Box, Grid, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

// probar menos de 3 libros
interface PodioLibrosProps{
    libros: LibroListarData[],
    count: (d: LibroListarData) => number
}
export function PodioLibros({libros, count}: PodioLibrosProps){
    return (
        <Grid sx={{width: '100%', maxWidth: 600, marginX: 'auto'}} container direction={'row'} justifyContent={'center'} gap={5}>
                {libros?.map((item, index) => (
                    <Grid item xs={2.5} key={item.id} style={{width: '100%', position: 'relative'}}>
                        <Stack direction='column' alignItems={'center'}
                            style={{
                                ...(
                                    (index == 0 || index == 2) ? (
                                        { transform: 'translateY(60px)'}
                                    ) : (
                                        {}
                                    )
                                )
                            }}
                        >
                            <div className="img-body">
                            <img src='https://i0.wp.com/www.pol.una.py/wp-content/uploads/llamado-a-concurso.jpg?resize=768%2C768&ssl=1' 
                                style={{
                                    width: '100%',
                                    objectFit: 'cover',
                                    overflow: 'clip',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                                    transition: 'box-shadow 0.3s ease' /* Suaviza el cambio de sombra */
                                }} />
                            </div>
                            <div style={{textAlign:'left', width: '100%',}}>
                                <Typography whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'} >
                                    {item.titulo}
                                </Typography>
                                <p>{item.autorNombre}</p>
                                <div
                                    style={{
                                        boxShadow: `${index == 0 ? '#3498db' : index == 1 ? '#2ecc71' : '#f39c12'} -0px 0px 15px`,
                                        zIndex: 1,
                                        borderTopLeftRadius: 40,
                                        borderTopRightRadius: 40,
                                        marginTop: 5,
                                        background: index == 0 ? '#3498db' : index == 1 ? '#2ecc71' : '#f39c12',
                                        width: '100%',
                                        height: (index == 0 || index == 2) ? '100px' : '160px',
                                        paddingTop: 10,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography fontSize={'2em'} color='#fff'>
                                        {count(item)}
                                    </Typography>
                                </div>
                                <Box textAlign={'center'}>
                                    <Link to={getRouteByName('verLibro', {id: item?.id})} target='_blank'> 
                                        ver
                                    </Link>
                                </Box>
                            </div>
                        </Stack>
                    </Grid>
                ))}
        </Grid>
    )
}