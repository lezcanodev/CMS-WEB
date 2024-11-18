import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { LibroCrearRequest } from './crearLibro.model';
import ApiCrearLibro from './crearLibro.api';
import ApiGuardarHistorialLibro from '@/api/gestionHistorial/guardarHistorial/guardarHistorial.api';


const libroCrear = new ApiCrearLibro(new ApiGuardarHistorialLibro());


export const libroCrearApiThunk = createAsyncThunk(
    'libro/crear', baseApiThunk<LibroCrearRequest>( async (data) => await libroCrear.execute(data))
)