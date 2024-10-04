// hooks
import { api } from '@/api';
import { Kanban } from '@/components/KanbaTable';
import { useTemplate } from '@/contexts/templateContext/useTemplate';
import { useAppDispatch, useAppSelector } from '@/redux';
import { UserUtils } from '@/utils/User/User.utils';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';


export function VerLibro(){
    const {elements} = useTemplate();
    const VerLibro = elements['VerLibro'];
    const dispatch = useAppDispatch();
    const {data, loading} = useAppSelector(state => state.api.libro.listar);
    const {comentario} = useAppSelector(state => state.api);
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
    }, [])

    return <>
        <VerLibro
           isEmpty={!data?.data?.length}
           loading={loading}
           categoria={data?.data?.[0]?.categoriaNombre + ''}
           autorNombre={data?.data?.[0]?.autorNombre + ''}
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
                    dispatch(api.comentario.comentarioListarApiThunk({
                        libroId: data?.data?.[0]?.id?.toString() as any
                    }))
                    return {error: null}
                }
            }}
            comentarios={{
                loading: false,
                totalItems: comentario?.listarComentario?.data?.data?.totalItems || 0,
                items: comentario?.listarComentario?.data?.data?.comentarios?.map((c) => ({
                    contenido: (c.contenido as any)?.contenido,
                    fechaPublicacion: c.publicado,
                    nombreUsuario: c.usuarioNombre
                })) || []
            }}
        /> 
    </>
}

