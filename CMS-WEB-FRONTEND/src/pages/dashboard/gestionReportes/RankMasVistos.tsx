import { Box, Button, Grid,  MenuItem, Stack, TextField, Typography, } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SectionTable from '@/components/SectionTable';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/api';
import { useAppDispatch, useAppSelector } from '@/redux';
import { snackbarActions } from '@/redux/snackbar/snackbar.slice';
import { current } from '@reduxjs/toolkit';
import Ranking from '@/components/ranking';
import { LibroListarData, LibroListarResponse } from '@/api/gestionLibros/listar/listarLibro.model';
import CategoriasConMasLibros from './CategoriasConMasLIbros';
import { Link } from 'react-router-dom';
import { getRouteByName } from '@/router/helpers';


export function RankMasVistos(){
    const { data: libros, loading: loadingLibros } = useAppSelector((state) => state.api.libro.listar);
    const [ordernadosPorMeGusta, setOrdernadosPorMeGusta] = useState<LibroListarResponse>([])
    const [totalVistas, setTotalVistas] = useState(0);
    useEffect(() => {
        if(!libros?.data?.length) return;
        let sortedArr = [...(libros?.data || [])];
        sortedArr.sort((a, b) => (b?.vistas  || 0)- (a?.vistas || 0) );
        if(sortedArr?.length >= 3){
            let temp = sortedArr[0];
            sortedArr[0] = sortedArr[1];
            sortedArr[1] = temp;
        }
        if(sortedArr?.length == 2){
            let temp = sortedArr[0];
            sortedArr[0] = sortedArr[1];
            sortedArr[1] = temp;
        }

        setTotalVistas(sortedArr.reduce((acc, libro) => {
            return libro?.vistas + acc
        }, 0))

        setOrdernadosPorMeGusta(sortedArr || [])
    }, [libros?.data])

    return (
        <div className="content" style={{padding: '30px',marginLeft:'60px'}}>
            <Typography variant={'h5'} fontWeight={'bold'} style={{opacity: .5}} >Mas vistos</Typography>
            <Typography style={{ fontSize: '.9em', fontWeight: 'bold', marginBottom: '25px'}}>Total de vistas: {totalVistas }</Typography>
            <div className="container" style={{ margin: '10 auto', background: '#ffffff57', padding:8, borderRadius:8}}>
               
                <Grid container>
                    <Grid item xs={12}>
                        <Grid sx={{width: '100%'}} container direction={'row'} justifyContent={'center'} gap={5}>
                            {ordernadosPorMeGusta?.slice(0,3)?.map((item, index) => (
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
                                        style={{width: '100%', objectFit: 'cover', overflow: 'clip',borderRadius: '10px',boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', transition: 'box-shadow 0.3s ease' /* Suaviza el cambio de sombra */}} />
                                        </div>
                                        <div style={{textAlign:'left', width: '100%'}}>
                                            <h3>{item.titulo}</h3>
                                            <p>{item.autorNombre}</p>
                                            <div
                                                style={{
                                                    boxShadow: `${index == 0 ? '#3498db' : index == 1 ? '#2ecc71' : '#f39c12'} -0px 0px 15px`,
                                                    borderTopLeftRadius: 40,
                                                    borderTopRightRadius: 40,
                                                    marginTop:10,
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
                                                    {item?.vistas}
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
                    </Grid>


                    <Grid item xs={12}>
                        <Stack mt={9} direction={'row'} sx={{overflowX:'auto'}} gap={2} p={2}>
                            {ordernadosPorMeGusta?.slice(3, libros?.data?.length)?.map((item) => (
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