// hooks
import { api } from '@/api';
import { Box, CircularProgress } from '@mui/material';
import { libroApi } from '@/api/gestionLibros/gestionLibros.reducer';
import { useTemplate } from '@/contexts/templateContext/useTemplate';
import { useAppDispatch, useAppSelector } from '@/redux';
import { UserUtils } from '@/utils/User/User.utils';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { snackbarActions } from '@/redux/snackbar/snackbar.slice';
import { likeApi } from '@/api/gestionLikes/gestionLikes.reducer';


export function VerLibro(){
    const {elements} = useTemplate();
    const VerLibro = elements['VerLibro'];
    const dispatch = useAppDispatch();
    const {data, loading} = useAppSelector(state => state.api.libro.listar);
    const [isLike,setLike] = useState<boolean | null>(null);
    const {comentario} = useAppSelector(state => state.api);
    const [reload, setReload] = useState<boolean>(false);
    const values = useParams();
    const { id } = useParams(); 

    useEffect(() =>{
        dispatch(likeApi.checkLikeApiThunk({
            id_user: UserUtils.getUser()?.userId as any,
            id_libro: parseInt(id + "")
        }))
        .unwrap()
        .then((response) => {
            setLike(response.data.isLike);
        });
    }, [reload])

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


    /** Esperamos que se carguen todos los datos primero... para cargar la pagina */
    if(data?.data?.[0].id == undefined || isLike == null){
        //console.log("entre",isLike);
        return <>
            <Box sx={{ display: 'relative'}}>
                <CircularProgress className='loader' size="15rem" value={75} thickness={2.5}/>
            </Box>
        </>
    }else{
        console.log("no entre",isLike);
    }


    // Aqui se controla la eliminacion del comentario
    const handleDelete = (id : number) => {
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
            yaDioMeGusta={isLike}
            darMeGusta={() => {
            if(data?.data?.[0]?.id){
                dispatch(libroApi.darLikeLibroThunk({
                    id: data?.data?.[0].id,
                    likes: data?.data?.[0].likes
                }))
                dispatch(likeApi.GuardarLikeApiThunk({
                    user: UserUtils.getUser()?.userId as any,
                    libro: data?.data?.[0].id
                }))
                setLike(true);
                setReload(!reload);
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

