
import { Box, Button, MenuItem, Stack, TextField, Typography, } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SectionTable from '@/components/SectionTable';
import { Modal } from '@/components/Modal';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { api } from '@/api';
import { useAppDispatch, useAppSelector } from '@/redux';
import { snackbarActions } from '@/redux/snackbar/snackbar.slice';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { UsuarioListarData } from '@/api/gestionUsuarios/listar/listartUsuario.model';

// esquema de datos para el formulario login
const UserDataSchema = Yup.object({
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
    const [usuariosBaneados, setUsuariosBaneados] = useState([]);
    const [editUser, setEditUser] = useState<UsuarioListarData | null>(null);
    const [user_filtrado, setFiltrados] = useState(usuarios?.data || []);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const formikUser = useFormik({
        initialValues: {
            username: '',
            password: '',
            role: ''
        },
        validationSchema: UserDataSchema,
        // Aquí se controla la creación de categoria
        onSubmit: async (values,currentRow) => {
            let asyncFn: () => Promise<any>;

            if (editUser) {
                //actualizamos el usuario con los datos ingresados.-  
                asyncFn = () => dispatch(api.usuario.usuarioActualizarApiThunk({
                    id: editUser.user.id,
                    username: values.username,
                    role: values.role as any
                }));
            } else {
                asyncFn = () => dispatch(api.usuario.usuarioCrearApiThunk({
                    username: values.username,
                    password: values.password,
                    role: values.role as any,
                }));
            }

            asyncFn()
            .then(() => {
                setOpenForm(false);
                setReload(!reload);
                setEditUser(null);
                formikUser.resetForm();
                
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

              formikUser.setErrors(errors);
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
       .unwrap()
       .then((response)=> {
            setFiltrados(response.data || []);
       });
       const users = localStorage.getItem('baneados') ? JSON.parse(localStorage.getItem('baneados') || '[]') : [];
       setUsuariosBaneados(users);
    },[dispatch,reload]);

    const handleEdit = (currentRow: any) => {
        setEditUser(currentRow);
        formikUser.setValues({
            username: currentRow.user.username,
            password: currentRow.password,
            role: currentRow.role as any
        });
        setSearchQuery(''); // Reinicia el valor de búsqueda
        setFiltrados(usuarios?.data || []); // Muestra todos los usuarios nuevamente
        setOpenForm(true);

        
    }
    
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if(query !== ''){
            const users_Filtrados = usuarios?.data?.filter(usuarios => 
                usuarios.user.username.toLowerCase().includes(query.toLowerCase())
            );
            
            setFiltrados(users_Filtrados || []);

        //sino que muestre todo.-
        }else{
            setFiltrados(usuarios?.data || []);
        }
    }

    const handleBloquear = (currentRow: any) => {
        const userId = currentRow?.user.id;
        let users = localStorage.getItem('baneados') ? JSON.parse(localStorage.getItem('baneados') || '[]') : null;
        
        if(!users){
            users = [userId];
            //localStorage.setItem('baneados', JSON.stringify([userId]));
        }else{
            const yaExists = users?.some((x: any) => x == userId); 
            if(yaExists){
                users = users?.filter((x: any) => x != userId);
            }else{
                users = [...users, userId]
            }
            //localStorage.setItem('baneados', JSON.stringify([...users, userId]));
        }

        localStorage.setItem('baneados', JSON.stringify(users));
        setUsuariosBaneados(users);
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
                            {permisosPaginas?.CATEGORIA_PAGINA.EDITAR && <Button onClick={() => handleBloquear(currentRow)}>
                                <NoAccountsIcon color='error'/>
                            </Button>}
                            {permisosPaginas?.CATEGORIA_PAGINA.ELIMINAR && <Button onClick={() => handleDeleteCategory(currentRow)}>
                                <DeleteOutlineIcon color='error'/>
                            </Button>}
                            {permisosPaginas?.CATEGORIA_PAGINA.EDITAR && <Button onClick={() => handleEdit(currentRow)}>
                                <EditIcon color='primary' />
                            </Button>}
                        </Stack>
                    </>
                }},
                {columnName: 'Estado', key:'estado', action: (currentRow) => {
                    return <>
                    <Box textAlign={'center'}>
                           {usuariosBaneados?.some((x: any) => x==currentRow?.user.id ) ? 'Bloqueado' : 'Normal' }
                    </Box>
                    </>
                }},
                {columnName: 'Nombre usuario', key:'username',action:(currentRow)=>{
                    return <>
                    <Box textAlign={'center'}>
                           {currentRow.user.username}
                    </Box>
                    </>
                }},
                {columnName: 'Rol', key:'role'}
            ]}
            rows={user_filtrado}
        />
    ), [user_filtrado, usuariosBaneados])

    return<>
        {table}
        <Modal 
            open={openForm}
            setOpen={() => {setOpenForm(false); setEditUser(null); formikUser.resetForm(); }}
            title={`${editUser ? 'Editar' : 'Crear nuevo'} usuario`}
            Actions={ 
                <Stack direction='row' gap={1} justifyContent={'space-between'} width={'100%'} marginX={'auto'}>
                    <Button onClick={() => {setOpenForm(false); setEditUser(null); formikUser.resetForm() }}>
                        <Typography color='error'>Cancelar</Typography>
                    </Button>
                    <Button onClick={() => {formikUser.submitForm()}}>
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
                            value= {formikUser.values.username}
                            onChange= {formikUser.handleChange}
                            onBlur= {formikUser.handleBlur}
                            error= {!!(formikUser.touched.username && Boolean(formikUser.errors.username))}
                            helperText={formikUser.touched.username && formikUser.errors.username as any}
                        />
                    </Box>
                    <Box flexGrow={.45} maxWidth={180} >
                        <TextField
                            select
                            fullWidth
                            type= 'text'
                            label= 'Rol'
                            name='role'
                            value= {formikUser.values.role}
                            onChange= {formikUser.handleChange}
                            onBlur= {formikUser.handleBlur}
                            error= {!!(formikUser.touched.role && Boolean(formikUser.errors.role))}
                            helperText={formikUser.touched.role && formikUser.errors.role as any}
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
                    value= {formikUser.values.password}
                    onChange= {formikUser.handleChange}
                    onBlur= {formikUser.handleBlur}
                    error= {!!(formikUser.touched.password && Boolean(formikUser.errors.password))}
                    helperText={formikUser.touched.password && formikUser.errors.password as any}
                />
            </Box>
        </Modal>
    </>
}
