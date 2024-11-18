/**
* @packageDocumentation GUI-Libros
 */
import ContentEditor from '@/components/ContentEditor';
import { Stack, Grid, TextField, MenuItem, Box, Button, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '@/redux';
import { api } from '@/api';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { snackbarActions } from '@/redux/snackbar/snackbar.slice';
import { LibroListarData } from '@/api/gestionLibros/listar/listarLibro.model';

// esquema de datos para el formulario login
const libroDataSchema = Yup.object({
    titulo: Yup.string().required('El campo es obligatorio'),
    categoria: Yup.string().required('El campo es obligatorio'),
});

interface LibroEditorProps{
    onCloseLibroEditor: () => void,
    libro: LibroListarData
}
export function LibroEditorEdicion({
    onCloseLibroEditor, libro
}: LibroEditorProps){
    const dispatch = useAppDispatch();
    const { data: categorias } = useAppSelector((state) => state.api.categoria.listar);
    const [contenido, setContenido] = useState<string>(libro?.contenido);
    const formikLibro = useFormik({
        initialValues: {
            titulo: libro?.titulo,
            categoria: libro?.categoria
        },
        validationSchema: libroDataSchema,
        onSubmit: async (values) => {
            let asyncCategory: any = () => api.libro.actualizarLibroThunk({
                id: libro.id,
                titulo: values.titulo,
                categoria: values.categoria,
                contenido: contenido,
                estado: libro.estado,
                nuevaCategoriaNombre: (categorias?.data || []).find(cat => cat.id == values.categoria )?.nombre || '',
                estadoAnterior: libro
            });
            dispatch(asyncCategory())
            .unwrap()
            .then(() => {
                dispatch(snackbarActions.openSnackbar({
                    message: `Se ha actualizado el libro`
                }))
            })
            .catch((error: any) => {
              const errors: any = {};
              if(error?.titulo){
                errors['titulo'] = error?.titulo?.toString() || 'El campo no es valido';
              }
              if(error?.categoria){
                errors['categoria'] = error?.categoria?.toString() || 'El campo no es valido';
              }

              if(error?.general){
                dispatch(snackbarActions.openSnackbar({
                    message: error?.general
                }))
              }
              
              formikLibro.setErrors(errors);
            });
        }
    })

    useEffect(() => {
        dispatch(api.categoria.categoriaListarApiThunk())
    }, [])

    return <>
        <Grid container gap={2}>
            <Grid item xs={12}>
                <Stack direction={'row'} gap={1} marginBottom={1} justifyContent={'flex-start'}>
                    <Button variant='text' onClick={() => onCloseLibroEditor()} ><ReplyAllIcon/></Button>
                    <Button variant='outlined' onClick={() => formikLibro.submitForm() }>Actualizar</Button>
                </Stack> 
                <Divider/>  
            </Grid>
            <Grid item xs={12}>
                <Stack direction={'row'} flexDirection={'row-reverse'} gap={2}>
                    <Box flex={1}>
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
                    </Box>
                    <Box flex={0.2}>
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
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <ContentEditor 
                    value={contenido}
                    onChange={setContenido}
                    defaultValue={libro?.contenido}
                />
            </Grid>
        </Grid>
    </>
}