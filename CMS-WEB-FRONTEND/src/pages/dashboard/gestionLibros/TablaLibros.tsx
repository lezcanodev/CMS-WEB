
import { Button, Stack } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SectionTable from '@/components/SectionTable';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux';
import { api } from '@/api';


interface TablaLibrosProps{
    onOpenLibroEditor: () => void
}
export default function TablaLibros({
    onOpenLibroEditor
}: TablaLibrosProps){
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.api.libro.listar);
    const [reload, setReload] = useState<boolean>(false);


    // Aqui se controla la eliminacion de categoria
    const handleDelete = async (currentRow: any) => {
        if(currentRow?.id){
            dispatch(api.libro.libroBorrarApiThunk({id: currentRow.id}))
            .unwrap()
            .then(() => {
                setReload(!reload);
            })
        }
    }

    // para obtener todos los datos y luego cargar en la tabla
    useEffect(() => {
       dispatch(api.libro.libroListarApiThunk())
    },[reload])

    
    const handleSearch = (query: string) => {}

    return<>
        <SectionTable
            title='Gestión de libros'
            onSearch={handleSearch}
            onCreate={(onOpenLibroEditor)}
            loading={loading}
            columns={[
                {columnName: 'Acciones', key:'acciones', action: (currentRow) => {
                    return <>
                        <Stack direction='row' gap={1} justifyContent={'space-between'} maxWidth={120} marginX={'auto'}>
                            <Button onClick={() => handleDelete(currentRow)}>
                                <DeleteOutlineIcon color='error'/>
                            </Button>
                            <Button onClick={() => {}} disabled>
                                <EditIcon color='primary' />
                            </Button>
                            <Button onClick={() => {}}>
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