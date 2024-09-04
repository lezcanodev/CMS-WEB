
import { Box, Button, Stack, TextField, Typography, } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SectionTable from '@/components/SectionTable';
import { Modal } from '@/components/Modal';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { apiBorrarCategoria } from '@/api/gestionCategorias/borrar/borrarCategoria.api';
import { apiCrearCategoria } from '@/api/gestionCategorias/crear/crearCategoria.api';
import { apiListarCategoria } from '@/api/gestionCategorias/listar/listartCategoria.api';

// esquema de datos para el formulario login
const categoryDataSchema = Yup.object({
    nombre: Yup.string().required('El campo es obligatorio'),
});

export default function GestionCategorias(){
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [categories, setCategories] = useState<any>([]);
    const [editCategory, setEditCategory] = useState<any>(null);
    const formikCategory = useFormik({
        initialValues: {
            nombre: '',
        },
        validationSchema: categoryDataSchema,
        // Aaqui se controla la creación de categoria
        onSubmit: async (values) => {
          try{
            await apiCrearCategoria.execute(values);
            setReload(!reload);
          }catch(error){
            console.log({error});
          }
        } 
    })

    // para abrir el formaulario para crear categoria
    const handleCreateCategory = () => {
        setOpenForm(true);
    }

    // Aqui se controla la eliminacion de categoria
    const handleDeleteCategory = async (currentRow: any) => {
        await apiBorrarCategoria.execute({id: currentRow.id});
        setReload(!reload);
    }

    // para obtener todos los datos y luego cargar en la tabla
    useEffect(() => {
        const getData = async () => {
            const r = await apiListarCategoria.execute(null);
            console.log({r});
            setCategories(r);
        }
        getData();
    },[reload])

    //const handleEditCategory = (currentRow: any) => {
    //    console.log('eliminar', currentRow);
    //    setEditCategory(currentRow);
    //    formikCategory.setValues({
    //        category: currentRow.nombreCategoria
    //    })
    //    setOpenForm(true);
    //}
    
    const handleSearch = (query: string) => {
        console.log('buscar', query);
    }

    return<>
        <SectionTable
            onSearch={handleSearch}
            onCreate={(handleCreateCategory)}
            columns={[
                {columnName: 'Acciones', key:'acciones', action: (currentRow) => {
                    return <>
                        <Stack direction='row' gap={1} justifyContent={'space-between'} maxWidth={120} marginX={'auto'}>
                            <Button onClick={() => handleDeleteCategory(currentRow)}>
                                <DeleteOutlineIcon color='error'/>
                            </Button>
                            {/*<Button onClick={() => handleEditCategory(currentRow)}>
                                <EditIcon color='primary' />
                            </Button>*/}
                        </Stack>
                    </>
                }},
                {columnName: 'Nombre categoría', key:'nombre'}
            ]}
            rows={categories?.data || []}
        />
        <Modal 
            open={openForm}
            setOpen={() => {setOpenForm(false);}}
            title='Crear nueva categoría'
            Actions={ 
                <Stack direction='row' gap={1} justifyContent={'space-between'} width={'100%'} marginX={'auto'}>
                    <Button onClick={() => {setOpenForm(false); setEditCategory(null); formikCategory.resetForm() }}>
                        <Typography color='error'>Cancelar</Typography>
                    </Button>
                    <Button onClick={() => {formikCategory.submitForm()}}>
                        Confirmar
                    </Button>
                </Stack>
            }
        ><>
        <Box paddingY={1}>
            <TextField
                fullWidth
                type= 'text'
                label= 'Nueva categoría'
                name='nombre'
                value= {formikCategory.values.nombre}
                onChange= {formikCategory.handleChange}
                onBlur= {formikCategory.handleBlur}
                error= {!!(formikCategory.touched.nombre && Boolean(formikCategory.errors.nombre))}
                helperText={formikCategory.touched.nombre && formikCategory.errors.nombre as any}
            />
        </Box>
        </></Modal>
    </>
}
