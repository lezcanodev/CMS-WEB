/**
* @packageDocumentation GUI-Libros
 */
import {  Button, Stack } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SectionTable from '@/components/SectionTable';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux';
import { api } from '@/api';
import { snackbarActions } from '@/redux/snackbar/snackbar.slice';
import { useNavigate } from 'react-router';
import { getRouteByName } from '@/router/helpers';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {Histograma} from './Histograma';
import {KanbaLibros} from './KanbaLibros';
import { LibroListarData } from '@/api/gestionLibros/listar/listarLibro.model';

interface TablaLibrosProps{
    onOpenLibroEditor: () => void,
    onOpenEditarLibro: (libro: LibroListarData) => void
}
export function TablaLibros({
    onOpenLibroEditor, onOpenEditarLibro
}: TablaLibrosProps){
    const [seccionActual, setSeccionActual] = useState<'tabla' | 'kanba'| 'Cambios_Libros'>('tabla')
    const { permisosPaginas } = useAppSelector(st => st.permisos);
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.api.libro.listar);
    const [reload, setReload] = useState<boolean>(false);
    const navigate = useNavigate();
    const [libro_filtrado, setFiltrados] = useState(data?.data || []);
    const [libro_cambio, setCambio] = useState(data?.data?.[0] || null);

    // Aqui se controla la eliminacion de categoria
    const handleDelete = async (currentRow: any) => {
        if(currentRow?.id){
            dispatch(api.libro.libroBorrarApiThunk({id: currentRow.id}))
            .unwrap()
            .then(() => {
                setReload(!reload);
                dispatch(snackbarActions.openSnackbar({
                    message: `Se ha realizado la operación correctamente`
                }))
            })
        }
    }
    const changeState = async (currentRow: any, nuevoEstado: string) => {
        if(currentRow?.id && currentRow.estado != nuevoEstado){
            await dispatch(api.libro.actualizarEstado({
                id: currentRow.id,
                titulo: currentRow.titulo,
                categoria: currentRow.categoria,
                estado: nuevoEstado,
                
                estadoAnterior: currentRow
            })).unwrap()
            .then(() => {
                setReload(!reload);
                dispatch(snackbarActions.openSnackbar({
                    message: `Se ha realizado la operación correctamente`,
                    autoHideDuration: 1000
                }))
            })
            .catch((err) => {
                dispatch(snackbarActions.openSnackbar({
                    message: `Ocurrió un error`,
                    type: 'error',
                    autoHideDuration: 1000
                }))
            })
            
        }else{
            dispatch(snackbarActions.openSnackbar({
                message: `Ya se encuentra "${nuevoEstado}"`,
                autoHideDuration: 1000
            }))
        }
    }
    // obtenemos los datos para cargar en la tabla
    useEffect(() => {
        dispatch(api.libro.libroListarApiThunk())
        .unwrap()
        .then((response) => {
            // Actualiza libro_filtrado con los datos de la API
            setFiltrados(response.data || []);
        });
    }, [dispatch,reload]);

    
    const handleSearch = (query: string) => {
         //Mientras el usuario ingrese algo en el buscador.-
       if(query !== ''){
            const librosFiltrados = data?.data?.filter(libro => 
                libro.titulo.toLowerCase().includes(query.toLowerCase())
            );

            setFiltrados(librosFiltrados || []);
            //en caso de que no coincida con ningun libro.-
            if(librosFiltrados === null){               
                setFiltrados([]);
            }
        //sino que muestre todo.-
        }else{
            setFiltrados(data?.data || []);
        }
    }

    return<>

        {/* Componente Kanba, muestra un tablero kanba para facilitar el cambio de estado de los libros listados */}
        {seccionActual === 'kanba' && (
            <KanbaLibros
                seccionActual={seccionActual}
                setSeccionActual={setSeccionActual}
                libros={data?.data || []}
                changeState={changeState}
            />
        )}

        {/* Componente tabla, muestra el listado de los libros */}
        {seccionActual === 'tabla' && (
            <SectionTable
                title='Gestión de libros'
                puedoCrear={permisosPaginas?.LIBRO_PAGINA.CREAR}
                onSearch={handleSearch}
                onCreate={onOpenLibroEditor}
                masOpciones={<>
                    { permisosPaginas?.LIBRO_PAGINA.KANBAN_ACCESO && (
                        <Button onClick={() => setSeccionActual('kanba')  } variant='outlined' endIcon={<ViewWeekIcon   fontSize='small'/>}>Kanban</Button>
                    )}
                </>}
                loading={loading}
                columns={[
                    {columnName: 'Acciones', key:'acciones', action: (currentRow) => {
                        return <>
                            <Stack direction='row' gap={1} justifyContent={'center'} marginX={'auto'}>
                                {permisosPaginas?.LIBRO_PAGINA.ELIMINAR &&  <Button onClick={() => 
                                        {setSeccionActual('Cambios_Libros')
                                        setCambio(currentRow)}
                                    }>
                                    <PublishedWithChangesIcon/>
                                </Button>}
                                {permisosPaginas?.LIBRO_PAGINA.ELIMINAR &&  <Button onClick={() => handleDelete(currentRow)}>
                                    <DeleteOutlineIcon color='error'/>
                                </Button>}
                                {permisosPaginas?.LIBRO_PAGINA.EDITAR &&  <Button onClick={() => { onOpenEditarLibro(currentRow)  }}>
                                    <EditIcon color='primary' />
                                </Button>}
                                <Button onClick={() => navigate(getRouteByName('verLibro', {id: currentRow.id }))}>
                                    ver
                                </Button>
                                {permisosPaginas?.LIBRO_PAGINA.PUBLICAR && <Button onClick={() => changeState(currentRow,'Publicado')}>
                                    Publicar
                                </Button>}
                                {permisosPaginas?.LIBRO_PAGINA.PUBLICAR && <Button onClick={() => changeState(currentRow,'Rechazado')}>
                                    Rechazar
                                </Button>}
                            </Stack>
                        </>
                    }},
                    {columnName: 'Autor', key:'autorNombre'},
                    {columnName: 'Titulo', key:'titulo'},
                    {columnName: 'Estado', key:'estado'},
                    {columnName: 'Categoría', key:'categoriaNombre'},
                    {columnName: 'Fecha', key:'fecha'}
                ]}
                rows={libro_filtrado}
            />)}

    
        {/* Componente histograma, muestra el historial de un libro */}
        {seccionActual === 'Cambios_Libros' && (
                <Histograma
                    volverAtras={() => {setSeccionActual('tabla')}}
                    libro_id={libro_cambio!.id}
                    libro_nombre={libro_cambio!.titulo}
                /> 
            )
        }
    </>
}
