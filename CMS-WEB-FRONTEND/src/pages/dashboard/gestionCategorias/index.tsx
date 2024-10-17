import { Box, Button, Stack, TextField, Typography, } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SectionTable from '@/components/SectionTable';
import { Modal } from '@/components/Modal';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '@/redux';
import { api } from '@/api';
import { CategoriaListarData } from '@/api/gestionCategorias/listar/listartCategoria.model';
import { snackbarActions } from '@/redux/snackbar/snackbar.slice';

// esquema de datos para el formulario login
const categoryDataSchema = Yup.object({
    nombre: Yup.string().required('El campo es obligatorio'),
});

export default function GestionCategorias(){
    const { permisosPaginas } = useAppSelector(st => st.permisos);
    const dispatch = useAppDispatch();
    const { data: categorias, loading: loadingCategorias } = useAppSelector((state) => state.api.categoria.listar);
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [editCategory, setEditCategory] = useState<CategoriaListarData | null>(null);
    const [categoria_filtrada, setCategoria] = useState(categorias?.data || []);    // recupera todas o ninguna en todo caso.-
    const formikCategory = useFormik({
        initialValues: {
            nombre: '',
        },
        validationSchema: categoryDataSchema,
        // Aquí se controla la creación de categoria
        onSubmit: async (values) => {
            let asyncCategory = () => api.categoria.categoriaCrearApiThunk(values);
            if(editCategory){
                asyncCategory = () => api.categoria.categoriaActualizarApiThunk({
                    id: editCategory.id,
                    nombre: values.nombre
                });
            }

            dispatch(asyncCategory())
            .unwrap()
            .then(() => {
                setOpenForm(false);
                setReload(!reload);
                setEditCategory(null);
                formikCategory.resetForm();
                dispatch(snackbarActions.openSnackbar({
                    message: `Se ha realizado la operación correctamente`
                }))
                
            })
            .catch(error => {
              const errors: any = {};
              if(error?.nombre){
                errors['nombre'] = error?.nombre?.toString() || 'El campo no es valido';
              }

              if(error?.general){
                dispatch(snackbarActions.openSnackbar({
                    message: error?.general,
                    type: 'error'
                }))
              }

              formikCategory.setErrors(errors);
            });
        } 
    })

    // para abrir el formaulario para crear categoria
    const handleCreateCategory = () => {
        setOpenForm(true);
    }

    // Aqui se controla la eliminacion de categoria
    const handleDeleteCategory = async (currentRow: any) => {
        if(currentRow?.id){
            dispatch(api.categoria.categoriaBorrarApiThunk({id: currentRow.id}))
            .unwrap()
            .then(() => {
                setReload(!reload);
                dispatch(snackbarActions.openSnackbar({
                    message: `Se ha realizado la operación correctamente`
                }))
            })
            .catch(error => {
                if(error?.general){
                    dispatch(snackbarActions.openSnackbar({
                        message: error?.general,
                        type: 'error'
                    }))
                }
            })
        }
    }

    // para obtener todos los datos y luego cargar en la tabla
    useEffect(() => {
       dispatch(api.categoria.categoriaListarApiThunk())
        .unwrap()
        .then((response) => {
            //con lo que responda, cambiamos el estado de categorias.-
            setCategoria(response.data || [])
        });
    //reload para que cada vez que liste, tambien recargue la pagina.-
    },[dispatch,reload])

    const handleEditCategory = (currentRow: any) => {
        setEditCategory(currentRow);
        formikCategory.setValues({
            nombre: currentRow.nombre
        });
        setOpenForm(true);
    }
    
    //aqui se realiza la busqueda de la categoria.-
    const handleSearch = (query: string) => {

        // Obtenemos las categorias disponibles.-
        let Categorias_disponibles: any[] = [...(categorias?.data || [])];
        
        if(query !== ''){       
            const filterCategorias = Categorias_disponibles.filter((categorias) => categorias.nombre.toLocaleLowerCase().includes(query.toLowerCase()));

            //asignamos la categoria/s acertada/s.-
            setCategoria(filterCategorias || []);
            
            if(filterCategorias == null){
                //no mostramos nada en caso de que no coincida nada de lo buscado por el usuario.-
                setCategoria([]);
            }
        }
        else{
            //sino mostra todo.-
            setCategoria(categorias?.data || []);
        }
    }

    return<>
        <SectionTable
            title='Gestión de categorías'
            puedoCrear={permisosPaginas?.CATEGORIA_PAGINA.CREAR}
            onSearch={handleSearch}
            onCreate={(handleCreateCategory)}
            loading={loadingCategorias}
            columns={[
                {columnName: 'Acciones', key:'acciones', action: (currentRow) => {
                    return <>
                        <Stack direction='row' gap={1} justifyContent={'space-between'} maxWidth={120} marginX={'auto'}>
                            {permisosPaginas?.CATEGORIA_PAGINA.ELIMINAR && <Button onClick={() => handleDeleteCategory(currentRow)}>
                                <DeleteOutlineIcon color='error'/>
                            </Button>}
                            {permisosPaginas?.CATEGORIA_PAGINA.EDITAR && <Button onClick={() => handleEditCategory(currentRow)}>
                                <EditIcon color='primary' />
                            </Button>}
                        </Stack>
                    </>
                }},
                {columnName: 'Nombre categoría', key:'nombre'}
            ]}
            rows={categoria_filtrada}
        />
        <FormCrearCategoria
            openForm={openForm}
            setOpenForm={setOpenForm}
            setEditCategory={setEditCategory}
            editCategory={editCategory}
            formikCategory={formikCategory} 
        />
    </>
}


export function FormCrearCategoria({
    openForm,
    setOpenForm,
    setEditCategory,
    editCategory,
    formikCategory
}: any){

    return <>
            <Modal 
                open={openForm}
                setOpen={() => {setOpenForm(false); setEditCategory(null); formikCategory.resetForm(); }}
                title={`${editCategory ? 'Editar' : 'Crear nueva'} categoría`}
                Actions={ 
                    <Stack direction='row' gap={1} justifyContent={'space-between'} width={'100%'} marginX={'auto'}>
                        <Button onClick={() => {setOpenForm(false); setEditCategory(null); formikCategory.resetForm() }}>
                            <Typography color='error'>Cancelar</Typography>
                        </Button>
                        <Button onClick={() => {formikCategory.submitForm()}}>Confirmar</Button>
                    </Stack>
                }
            >
                <Box paddingY={1}>
                    <TextField
                        fullWidth
                        type= 'text'
                        label= 'Nombre de categoría'
                        name='nombre'
                        value= {formikCategory.values.nombre}
                        onChange= {formikCategory.handleChange}
                        onBlur= {formikCategory.handleBlur}
                        error= {!!(formikCategory.touched.nombre && Boolean(formikCategory.errors.nombre))}
                        helperText={formikCategory.touched.nombre && formikCategory.errors.nombre as any}
                    />
                </Box>
            </Modal>
    </>
}