


import {  Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from '@/api';
import { useAppDispatch, useAppSelector } from '@/redux';

export default function CategoriasConMasLibros(){
    const dispatch = useAppDispatch();
    //para listar todos los libros
    const { data: libros, loading: loadingLibros } = useAppSelector((state) => state.api.libro.listar);
    const [cantLibrosPorEstado, setCantLibrosPorEstado]  = useState<{[nombreEstado: string]:{cantidad: number, color: string}}>({
        'Guardado': {
            cantidad: 0,
            color:"#51a5f9"
        },
        'En Revision': {
            cantidad: 0,
            color:"#ef9433"
        },
        'Rechazado': {
            cantidad: 0,
            color:"#f12b2b"
        },
        'Publicado': {
            cantidad: 0,
            color:"#31ba20"
        },
    });

    // para obtener todos los datos y luego cargar en la tabla
    useEffect(() => {
            dispatch(api.libro.libroListarApiThunk())
            .unwrap()
            .then(libros => {
                let cantLibrosPorEst: any  = {
                    'Guardado': {
                        cantidad: 0,
                        color:"#51a5f9"
                    },
                    'En Revision': {
                        cantidad: 0,
                        color:"#ef9433"
                    },
                    'Rechazado': {
                        cantidad: 0,
                        color:"#f12b2b"
                    },
                    'Publicado': {
                        cantidad: 0,
                        color:"#31ba20"
                    },
                }
                
                libros?.data?.map((libro: any) => {
                    cantLibrosPorEst[libro?.estado as any].cantidad++
                })
                setCantLibrosPorEstado(cantLibrosPorEst)
            });
    },[dispatch]);

    return<>
    <div className="content" style={{padding: '30px',marginLeft:'60px'}}>
        <Typography variant={'h5'} fontWeight={'bold'} style={{opacity: .5}} >Estado de los libros</Typography>
        <Typography style={{ fontSize: '.8em', fontWeight: 'bold', marginBottom: '25px'}}>Total de libros:{libros?.data?.length }</Typography>
        <div className="container" style={{maxWidth: '800px', margin: '10 auto', background: '#ffffff57', padding:8, borderRadius:8}}>
            {Object.keys(cantLibrosPorEstado)?.map((estado, index) => (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom:10
              }}>
                <div>
                    <div style={{fontSize: '.8em'}}>
                        <h3>{estado} ({cantLibrosPorEstado[estado].cantidad})</h3>
                    </div>
                </div>
                <div style={{
                    width: '100%',
                    border: `1px solid ${cantLibrosPorEstado[estado]?.color}2f`,
                    borderRadius: 8,
                    overflow: 'hidden',
                    background:  `${cantLibrosPorEstado[estado]?.color}0f`
                }}>
                    <p style={{
                                background: cantLibrosPorEstado[estado]?.color ,
                                width:  `${(cantLibrosPorEstado[estado]?.cantidad/(libros?.data?.length || 1))*100}%`,
                                height: 20
                    }} ></p>
                </div>
              </div>
            ))}
        </div>
    </div>
        
    </>
}
