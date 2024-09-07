
import { Box, Button, MenuItem, Stack, TextField, Typography, } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SectionTable from '@/components/SectionTable';
import { Modal } from '@/components/Modal';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '@/redux';
import { api } from '@/api';
import { LibroListarData } from '@/api/gestionLibros/listar/listarLibro.model';
import { localStorageServices } from '@/services';

// esquema de datos para el formulario login
const libroDataSchema = Yup.object({
    titulo: Yup.string().required('El campo es obligatorio'),
    categoria: Yup.string().required('El campo es obligatorio'),
    // author
});

export default function GestionLibros(){
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.api.libro.listar);
    const { data: categorias } = useAppSelector((state) => state.api.categoria.listar);
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [edit, setEdit] = useState<LibroListarData | null>(null);
    const formikLibro = useFormik({
        initialValues: {
            titulo: '',
            categoria: ''
        },
        validationSchema: libroDataSchema,
        // Aquí se controla la creación de categoria
        onSubmit: async (values) => {
            let asyncCategory: any = () => api.libro.libroCrearApiThunk({
                titulo: values.titulo,
                categoria: parseInt(values.categoria),
                author: JSON.parse(localStorageServices.get('user') as any).userId as any
            });
            if(edit){
                asyncCategory = () => api.libro.libroActualizarApiThunk({
                    id: edit.id,
                    titulo: values.titulo,
                    categoria: parseInt(values.categoria)
                });
            }

            dispatch(asyncCategory())
            .unwrap()
            .then(() => {
                setOpenForm(false);
                setReload(!reload);
                setEdit(null);
                formikLibro.resetForm();
            })
            .catch((error: any) => {
              const errors: any = {};
              if(error?.titulo){
                errors['titulo'] = error?.titulo?.toString() || 'El campo no es valido';
              }
              if(error?.categoria){
                errors['categoria'] = error?.categoria?.toString() || 'El campo no es valido';
              }
              formikLibro.setErrors(errors);
            });
        } 
    })

    // para abrir el formaulario para crear categoria
    const handleCreate = () => {
        setOpenForm(true);
    }

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

    useEffect(() => {
        dispatch(api.categoria.categoriaListarApiThunk())
    }, [])

    const handleEdit = (currentRow: LibroListarData) => {
        console.log(currentRow);
        setEdit(currentRow);
        formikLibro.setValues({
            titulo: currentRow.titulo,
            categoria: currentRow.categoria?.toString()
        });
        setOpenForm(true);
    }
    
    const handleSearch = (query: string) => {
        console.log('buscar', query);
    }

    return<>
        <SectionTable
            title='Gestión de libros'
            onSearch={handleSearch}
            onCreate={(handleCreate)}
            loading={loading}
            columns={[
                {columnName: 'Acciones', key:'acciones', action: (currentRow) => {
                    return <>
                        <Stack direction='row' gap={1} justifyContent={'space-between'} maxWidth={120} marginX={'auto'}>
                            <Button onClick={() => handleDelete(currentRow)}>
                                <DeleteOutlineIcon color='error'/>
                            </Button>
                            <Button onClick={() => handleEdit(currentRow)}>
                                <EditIcon color='primary' />
                            </Button>
                        </Stack>
                    </>
                }},
                {columnName: 'Autor', key:'author'},
                {columnName: 'Titulo', key:'titulo'},
                {columnName: 'Categoría', key:'categoria'},
                {columnName: 'Fecha', key:'fecha'}
            ]}
            rows={ data?.data || []}
        />
        <Modal 
            open={openForm}
            setOpen={() => {setOpenForm(false); setEdit(null); formikLibro.resetForm(); }}
            title={`${edit ? 'Editar' : 'Crear nuevo'} libro`}
            Actions={ 
                <Stack direction='row' gap={1} justifyContent={'space-between'} width={'100%'} marginX={'auto'}>
                    <Button onClick={() => {setOpenForm(false); setEdit(null); formikLibro.resetForm() }}>
                        <Typography color='error'>Cancelar</Typography>
                    </Button>
                    <Button onClick={() => {formikLibro.submitForm()}}>
                        Confirmar
                    </Button>
                </Stack>
            }
        >
            <Box paddingY={1}>
                <Stack direction={'column'} gap={2}>
                    <TextField
                        fullWidth
                        type= 'text'
                        label= 'Titulo'
                        name='titulo'
                        value= {formikLibro.values.titulo}
                        onChange= {formikLibro.handleChange}
                        onBlur= {formikLibro.handleBlur}
                        error= {!!(formikLibro.touched.titulo && Boolean(formikLibro.errors.titulo))}
                        helperText={formikLibro.touched.titulo && formikLibro.errors.titulo as any}
                    />
                    <TextField
                        select
                        fullWidth
                        type= 'text'
                        label= 'Categoría'
                        name='categoria'
                        value= {formikLibro.values.categoria}
                        onChange= {formikLibro.handleChange}
                        onBlur= {formikLibro.handleBlur}
                        error= {!!(formikLibro.touched.categoria && Boolean(formikLibro.errors.categoria))}
                        helperText={formikLibro.touched.categoria && formikLibro.errors.categoria as any}
                    >
                        <MenuItem value={''}>
                            <em>Seleccionar una categoria</em>
                        </MenuItem>
                        {(categorias?.data || []).map(cat => (
                            <MenuItem value={cat.id} key={cat.id} >{cat.nombre}</MenuItem>
                        ))}
                    </TextField>
                </Stack>
            </Box>
        </Modal>
    </>
}
