import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { LibroCrearRequest } from './crearLibro.model';
import ApiCrearLibro from './crearLibro.api';


const libroCrear = new ApiCrearLibro();


export const libroCrearApiThunk = createAsyncThunk(
    'libro/crear', baseApiThunk<LibroCrearRequest>( async (data) => await libroCrear.execute(data))
)