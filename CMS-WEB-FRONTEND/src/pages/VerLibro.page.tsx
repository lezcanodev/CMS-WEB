// hooks
import { api } from '@/api';
import { useTemplate } from '@/contexts/templateContext/useTemplate';
import { useAppDispatch, useAppSelector } from '@/redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';


export function VerLibro(){
    const {elements} = useTemplate();
    const VerLibro = elements['VerLibro'];
    const dispatch = useAppDispatch();
    const {data, loading} = useAppSelector(state => state.api.libro.listar);
    const values = useParams(); 

    useEffect(() => {
        if(values?.id){
            dispatch(api.libro.libroListarApiThunk({
                id: parseInt(values?.id)
            }));
        }
    }, [])

    return <>
        <VerLibro
           isEmpty={!data?.data?.length}
           loading={loading}
           categoria={data?.data?.[0]?.categoria + ''}
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
        /> 
    </>
}
