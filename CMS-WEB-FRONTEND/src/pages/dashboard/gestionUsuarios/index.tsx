
import { Box, Button, MenuItem, Stack, TextField, Typography, } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SectionTable from '@/components/SectionTable';
import { Modal } from '@/components/Modal';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '@/redux';
import { api } from '@/api';
import { CategoriaListarData } from '@/api/gestionCategorias/listar/listartCategoria.model';
import { snackbarActions } from '@/redux/snackbar/snackbar.slice';

// esquema de datos para el formulario login
const categoryDataSchema = Yup.object({
    /** nombre del usuario */
    username: Yup.string().required('El campo es obligatorio'),
    /** contraseña del usuario */
    password: Yup.string().required('El campo es obligatorio').min(6, 'debe tener 6 caracteres mínimos'),
    /** rol del usuario */
    role: Yup.string().required('El campo es obligatorio'),
});

export default function GestionUsuarios(){
    const { permisosPaginas } = useAppSelector(st => st.permisos);
    const dispatch = useAppDispatch();
    const { data: usuarios, loading: loadingCategorias } = useAppSelector((state) => state.api.usuario.listar);
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [editCategory, setEditCategory] = useState<CategoriaListarData | null>(null);
    const formikCategory = useFormik({
        initialValues: {
            username: '',
            password: '',
            role: ''
        },
        validationSchema: categoryDataSchema,
        // Aquí se controla la creación de categoria
        onSubmit: async (values) => {
            let asyncFn = () => api.usuario.usuarioCrearApiThunk({
                ...values,
                role: values.role as any
            });
            if(editCategory){
                //asyncCategory = () => api.categoria.categoriaActualizarApiThunk({
                //    id: editCategory.id,
                //    nombre: values.username
                //});
            }

            dispatch(asyncFn())
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
              if(error?.username){
                errors['username'] = error?.username?.toString() || 'El campo no es valido';
              }
              if(error?.password){
                errors['password'] = error?.password?.toString() || 'El campo no es valido';
              }
              if(error?.role){
                errors['role'] = error?.role?.toString() || 'El campo no es valido';
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

    // para abrir el formaulario para crear
    const handleCreate = () => {
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
       dispatch(api.usuario.usuarioListarApiThunk())
    },[reload])

    const handleEdit = (currentRow: any) => {
    }
    
    const handleSearch = (query: string) => {
        console.log('buscar', query);
    }

    const table = useMemo(() => (
        <SectionTable
            title='Gestión de usuarios'
            puedoCrear={permisosPaginas?.CATEGORIA_PAGINA.CREAR}
            onSearch={handleSearch}
            onCreate={(handleCreate)}
            loading={loadingCategorias}
            columns={[
                {columnName: 'Acciones', key:'acciones', action: (currentRow) => {
                    return <>
                        <Stack direction='row' gap={1} justifyContent={'space-between'} maxWidth={120} marginX={'auto'}>
                            {permisosPaginas?.CATEGORIA_PAGINA.ELIMINAR && <Button onClick={() => handleDeleteCategory(currentRow)}>
                                <DeleteOutlineIcon color='error'/>
                            </Button>}
                            {permisosPaginas?.CATEGORIA_PAGINA.EDITAR && <Button onClick={() => handleEdit(currentRow)}>
                                <EditIcon color='primary' />
                            </Button>}
                        </Stack>
                    </>
                }},
                {columnName: 'Nombre usuario', key:'username'},
                {columnName: 'Rol', key:'role'}
            ]}
            rows={ usuarios?.data || []}
        />
    ), [usuarios])

    return<>
        {table}
        <Modal 
            open={openForm}
            setOpen={() => {setOpenForm(false); setEditCategory(null); formikCategory.resetForm(); }}
            title={`${editCategory ? 'Editar' : 'Crear nuevo'} usuario`}
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
        >
            <Box paddingY={1}>
                <Stack display={'flex'} direction={'row'} width={'100%'} gap={1} marginBottom={2}>
                    <Box flexGrow={1}>
                        <TextField
                            fullWidth
                            type= 'text'
                            label= 'Nombre del usuario'
                            name='username'
                            value= {formikCategory.values.username}
                            onChange= {formikCategory.handleChange}
                            onBlur= {formikCategory.handleBlur}
                            error= {!!(formikCategory.touched.username && Boolean(formikCategory.errors.username))}
                            helperText={formikCategory.touched.username && formikCategory.errors.username as any}
                        />
                    </Box>
                    <Box flexGrow={.45} maxWidth={180} >
                        <TextField
                            select
                            fullWidth
                            type= 'text'
                            label= 'Rol'
                            name='role'
                            value= {formikCategory.values.role}
                            onChange= {formikCategory.handleChange}
                            onBlur= {formikCategory.handleBlur}
                            error= {!!(formikCategory.touched.role && Boolean(formikCategory.errors.role))}
                            helperText={formikCategory.touched.role && formikCategory.errors.role as any}
                        >
                            <MenuItem value={'Administrador'} >Administrador</MenuItem> 
                            <MenuItem value={'Editor'} >Editor</MenuItem>
                            <MenuItem value={'Publicador'} >Publicador</MenuItem>
                            <MenuItem value={'Suscriptor'} >Suscriptor</MenuItem>   
                        </TextField>
                    </Box>
                </Stack>
                <TextField
                    fullWidth
                    type= 'password'
                    label= 'Contraseña'
                    name='password'
                    value= {formikCategory.values.password}
                    onChange= {formikCategory.handleChange}
                    onBlur= {formikCategory.handleBlur}
                    error= {!!(formikCategory.touched.password && Boolean(formikCategory.errors.password))}
                    helperText={formikCategory.touched.password && formikCategory.errors.password as any}
                />
            </Box>
        </Modal>
    </>
}
