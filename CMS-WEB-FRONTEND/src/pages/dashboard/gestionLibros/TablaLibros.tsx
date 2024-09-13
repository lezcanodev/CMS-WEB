
import { Button, Stack } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SectionTable from '@/components/SectionTable';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux';
import { api } from '@/api';
import { snackbarActions } from '@/redux/snackbar/snackbar.slice';
import { useNavigate } from 'react-router';
import { getRouteByName } from '@/router/helpers';


interface TablaLibrosProps{
    onOpenLibroEditor: () => void
}
export default function TablaLibros({
    onOpenLibroEditor
}: TablaLibrosProps){
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.api.libro.listar);
    const [reload, setReload] = useState<boolean>(false);
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

    // para obtener todos los datos y luego cargar en la tabla
    useEffect(() => {
       dispatch(api.libro.libroListarApiThunk())
    },[reload])

    
    const handleSearch = (query: string) => {
        console.log(query);
    }

    return<>
        <SectionTable
            title='Gestión de libros'
            onSearch={handleSearch}
            onCreate={(onOpenLibroEditor)}
            loading={loading}
            columns={[
                {columnName: 'Acciones', key:'acciones', action: (currentRow) => {
                    return <>
                        <Stack direction='row' gap={1} justifyContent={'center'} marginX={'auto'}>
                            <Button onClick={() => handleDelete(currentRow)}>
                                <DeleteOutlineIcon color='error'/>
                            </Button>
                            <Button onClick={() => {}} disabled>
                                <EditIcon color='primary' />
                            </Button>
                            <Button onClick={() => navigate(getRouteByName('verLibro', {id: currentRow.id }))}>
                                ver
                            </Button>
                        </Stack>
                    </>
                }},
                {columnName: 'Autor', key:'author'},
                {columnName: 'Titulo', key:'titulo'},
                {columnName: 'Estado', key:'estado'},
                {columnName: 'Categoría', key:'categoria'},
                {columnName: 'Fecha', key:'fecha'}
            ]}
            rows={ data?.data || []}
        />
    </>
}