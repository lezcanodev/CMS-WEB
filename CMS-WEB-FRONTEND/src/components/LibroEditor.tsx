import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/redux';
import { api } from '@/api';
import { useParams } from 'react-router';
import { Grid, Stack, TextField, MenuItem, Box, Button, Divider } from '@mui/material';
import ContentEditor from '@/components/ContentEditor';
import { snackbarActions } from '@/redux/snackbar/snackbar.slice';
import { useNavigate } from 'react-router';

// Esquema de validación para los campos del formulario
const libroDataSchema = Yup.object({
    titulo: Yup.string().required('El campo es obligatorio'),
    categoria: Yup.string().required('El campo es obligatorio'),
    contenido: Yup.string().required('El contenido es obligatorio')
});

export default function LibroEditor() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Obtener el ID del libro desde la URL
    const { data: categorias } = useAppSelector((state) => state.api.categoria.listar); // Obtener las categorías
    const { data: libroData, loading: libroLoading } = useAppSelector((state) => state.api.libro.listar); // Datos del libro

    const [initialValues, setInitialValues] = useState({
        id: 0,
        titulo: '',
        categoria: '',
        contenido: '',
        estado: ''
    });

    // Efecto para cargar las categorías y el libro cuando el componente se monta
    useEffect(() => {
        if (id) {
            dispatch(api.categoria.categoriaListarApiThunk());
            dispatch(api.libro.libroListarApiThunk({ id: parseInt(id) }));
        }
    }, [id, dispatch]);

    // Efecto para actualizar los valores iniciales del formulario cuando se cargan los datos del libro
    useEffect(() => {
        if (libroData?.data?.[0] && categorias?.data?.[0]) {
            const libro = libroData.data[0];
            const categoria = categorias?.data[0];
            setInitialValues({
                id: libro.id || -1,
                titulo: libro.titulo || '',
                categoria: libro.categoria + '',
                contenido: libro.contenido || '',
                estado: libro.estado
            });
        }
    }, [libroData]);

    // Utilizamos formik solo cuando los valores iniciales estén listos
    const formikLibro = useFormik({
        enableReinitialize: true, // Permite que formik se reinicialice cuando cambien los valores iniciales
        initialValues: initialValues,
        validationSchema: libroDataSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(api.libro.libroActualizarApiThunk({
                    id: parseInt(values.id + ''),
                    titulo: values.titulo,
                    categoria: parseInt(values.categoria),
                    contenido: values.contenido, // Aquí está el contenido sincronizado con formik
                    estado: 'Revision'
                    
                })).unwrap();
                dispatch(snackbarActions.openSnackbar({
                    message: `Se ha editado el libro "${values.titulo}" exitosamente`
                }));

                navigate('/dashboard/gestion-libros');
            } catch (error: any) {
                const errors: any = {};
                if (error?.titulo) {
                    errors.titulo = error.titulo.toString() || 'El campo no es válido';
                }
                if (error?.categoria) {
                    errors.categoria = error.categoria.toString() || 'El campo no es válido';
                }

                if (error?.general) {
                    dispatch(snackbarActions.openSnackbar({
                        message: error.general
                    }));
                }

                formikLibro.setErrors(errors);
            }
        }
    });

    const handleSave = () => {
        formikLibro.submitForm();  // Guardamos los datos ingresados por el usuario
        navigate('/dashboard/gestion-libros');  // Cerramos la página de edición
    };

    if (libroLoading) {
        return <div>Cargando datos del libro...</div>; // Mostrar un mensaje de carga mientras se cargan los datos
    }

    return (
        <>
            <Grid container gap={2}>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction={'row'} flexDirection={'row-reverse'} gap={2}>
                        <Box flex={1}>
                            <TextField
                                fullWidth
                                type='text'
                                label='Titulo'
                                name='titulo'
                                value={formikLibro.values.titulo}
                                onChange={formikLibro.handleChange}
                                onBlur={formikLibro.handleBlur}
                                error={!!(formikLibro.touched.titulo && formikLibro.errors.titulo)}
                                helperText={formikLibro.touched.titulo && formikLibro.errors.titulo}
                            />
                        </Box>
                        <Box flex={0.2}>
                            <TextField
                                select
                                fullWidth
                                label='Categoría'
                                name='categoria'
                                value={formikLibro.values.categoria}
                                onChange={formikLibro.handleChange}
                                onBlur={formikLibro.handleBlur}
                                error={!!(formikLibro.touched.categoria && formikLibro.errors.categoria)}
                                helperText={formikLibro.touched.categoria && formikLibro.errors.categoria}
                            >
                                <MenuItem value=''>
                                    <em>Seleccionar una categoría</em>
                                </MenuItem>
                                {(categorias?.data || []).map(cat => (
                                    <MenuItem value={cat.id} key={cat.id}>{cat.nombre}</MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <ContentEditor
                        value={formikLibro.values.contenido}  // Formik controla el contenido
                        onChange={(val) => formikLibro.setFieldValue('contenido', val)}  // Actualizamos formik cuando el contenido cambia
                    />
                    <Stack direction={'row'} gap={1} marginBottom={1} justifyContent={'flex-start'}>
                        <Button variant='outlined' onClick={handleSave}>Guardar y Cerrar</Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}
