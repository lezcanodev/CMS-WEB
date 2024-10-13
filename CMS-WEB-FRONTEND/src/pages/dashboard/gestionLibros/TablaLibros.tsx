
import { Box, Button, Stack } from '@mui/material';
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
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import SimpleKanban from '@/components/KanbaTable/KambaTable';

interface TablaLibrosProps{
    onOpenLibroEditor: () => void,
    applyFilters: (filters: Partial<{categoriaId: number, buscarPorTexto: string}>, opts?: {resetFilters: boolean}) => void,
    currentFilters: Partial<{categoriaId: number, buscarPorTexto: string}>
}
export default function TablaLibros({
    onOpenLibroEditor, applyFilters,currentFilters
}: TablaLibrosProps){
    const [seccionActual, setSeccionActual] = useState<'tabla' | 'kanba'>('tabla')
    const { permisosPaginas } = useAppSelector(st => st.permisos);
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.api.libro.listar);
    const [reload, setReload] = useState<boolean>(false);
    const [libro_filtrado, setFiltrados] = useState(data?.data || []);

    const navigate = useNavigate();
    
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
        if(currentRow?.id){
            await dispatch(api.libro.libroActualizarApiThunk({
                id: currentRow.id,
                titulo: currentRow.titulo,
                categoria: currentRow.categoria,
                contenido: currentRow.contenido,
                estado: nuevoEstado
            })).unwrap()
            .then(() => {
                setReload(!reload);
                dispatch(snackbarActions.openSnackbar({
                    message: `Se ha realizado la operación correctamente`,
                    autoHideDuration: 1000
                }))
            })
            
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
    }, [dispatch]);
    


    const handleSearch = (query: string) => {
        //Mientras el usuario ingrese algo en el buscador.-
       if(query !== ''){
            applyFilters({buscarPorTexto:query},{resetFilters:false});
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
        {
            seccionActual === 'kanba' ? (<>
                <KanbaLibros
                    seccionActual={seccionActual}
                    setSeccionActual={setSeccionActual}
                    libros={data?.data || []}
                    changeState={changeState}
                />
            </>) : (
                <SectionTable
                    title='Gestión de libros'
                    puedoCrear={permisosPaginas?.LIBRO_PAGINA.CREAR}
                    onSearch={handleSearch}
                    onCreate={(onOpenLibroEditor)}
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
                                    {permisosPaginas?.LIBRO_PAGINA.ELIMINAR &&  <Button onClick={() => handleDelete(currentRow)}>
                                        <DeleteOutlineIcon color='error'/>
                                    </Button>}
                                    {permisosPaginas?.LIBRO_PAGINA.EDITAR &&  <Button onClick={() => navigate(`/editar-libro/${currentRow.id}`)}>
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
                />
            )
        }
    </>
}

function KanbaLibros({
    seccionActual,
    setSeccionActual,
    libros,
    changeState
}: any){
    return (
        <Stack>
            <Box>
                <Stack direction={'row'} gap={1} marginBottom={1} justifyContent={'flex-start'}>
                    <Button variant='text' onClick={() => setSeccionActual('tabla')} ><ReplyAllIcon/></Button>
                </Stack> 
            </Box>
            <Box>
                <SimpleKanban
                    libros={libros}
                    cambiarEstadoLibro={ async (libro, nuevoEstado) => {
                        changeState(libro, nuevoEstado);
                    }}
                />
                {/*<Kanban/>*/}
            </Box>
        </Stack>
    );
}