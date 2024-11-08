// hooks
import { api } from '@/api';
import { Box, Button, Stack } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { libroApi } from '@/api/gestionLibros/gestionLibros.reducer';
import { useTemplate } from '@/contexts/templateContext/useTemplate';
import { useAppDispatch, useAppSelector } from '@/redux';
import { UserUtils } from '@/utils/User/User.utils';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { snackbarActions } from '@/redux/snackbar/snackbar.slice';


export function VerLibro(){
    const {elements} = useTemplate();
    const VerLibro = elements['VerLibro'];
    const dispatch = useAppDispatch();
    const {data, loading} = useAppSelector(state => state.api.libro.listar);
    const {comentario} = useAppSelector(state => state.api);
    const [reload, setReload] = useState<boolean>(false);
    const values = useParams(); 

    useEffect(() => {
        if(values?.id){
            dispatch(api.libro.libroListarApiThunk({
                id: parseInt(values?.id)
            }));
            dispatch(api.comentario.comentarioListarApiThunk({
                libroId: parseInt(values?.id)
            }))
        }
    }, [reload])

    if(!data?.data?.[0]?.id) return;

    // Aqui se controla la eliminacion del comentario
    const handleDelete = (id : number) => {
        console.log(id)
        if(id){
            dispatch(api.comentario.comentarioBorrarApiThunk({id: id}))
            .unwrap()
            .then(() => {
                setReload(!reload);
                dispatch(snackbarActions.openSnackbar({
                    message: `Se borro el comentario correctamente`
                }))
            })
        }
    }

    return <>
        <VerLibro
            yaDioMeGusta={localStorage.getItem(`me-gusta-libro-${data?.data?.[0].id}`) == 'si'}
            darMeGusta={() => {
            if(data?.data?.[0]?.id){
                localStorage.setItem(`me-gusta-libro-${data?.data?.[0].id}`, 'si')
                dispatch(libroApi.darLikeLibroThunk({
                    id: data?.data?.[0].id,
                    likes: data?.data?.[0].likes
                }))
            }
            }} 
            cargarVista={() => {
                if(data?.data?.[0]?.id){
                    dispatch(libroApi.aumentarCantidadVistaLibroThunk({
                        id: data?.data?.[0].id,
                        vistas: data?.data?.[0].vistas
                    }))
                }
            }}
           isEmpty={!data?.data?.length}
           loading={loading}
           categoria={data?.data?.[0]?.categoriaNombre + ''}
           autorNombre={data?.data?.[0]?.autorNombre + ''}
           likes={data?.data?.[0]?.likes || 0}
           visitas={data?.data?.[0]?.vistas || 0}
           contenido={<>
            {
                !data?.data?.length ? (
                    <>No hay nada</>
                ) : (
                    <div dangerouslySetInnerHTML={{__html: data?.data?.[0]?.contenido || ''}} />
                )
            }
           </>}
           fechaPublicacion={data?.data?.[0]?.fecha || ''}
           idLibro={data?.data?.[0]?.id?.toString() || ''}
           titulo={data?.data?.[0]?.titulo + ''}
            crearComentario={{
                loading: false,
                onCrearComentario: async (nuevoComentario:{ contenido: string  }) => {
                    dispatch(api.comentario.comentarioCrearApiThunk({
                        contenido: nuevoComentario.contenido,
                        libroId: data?.data?.[0]?.id?.toString() as any,
                        usuarioId: UserUtils.getUser()?.userId as any
                    }));
                    //cada vez que agregamos un comentario,
                    // actualizamos la pagina(deberia ser el grid nomas pero bueno)
                    setReload(!reload);
                    dispatch(api.comentario.comentarioListarApiThunk({
                        libroId: data?.data?.[0]?.id?.toString() as any
                    }))
                    return {error: null}
                }
            }}
            comentarios={{
                loading: false,
                totalItems: comentario?.listarComentario?.data?.data?.totalItems ?? 0,
                items: comentario?.listarComentario?.data?.data?.comentarios?.map((c) => ({
                    id:c.id,
                    contenido: c?.contenido,
                    fechaPublicacion: c?.fecha,
                    nombreUsuario: c.usuarioNombre,
                })) || []
            }}
            borrarComentario = {{
                onDeleteComentario : handleDelete}}
        /> 
    </>
    
}

