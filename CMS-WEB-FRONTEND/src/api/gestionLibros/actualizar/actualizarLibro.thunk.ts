import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { LibroActualizarRequest } from './actualizarLibro.model';
import ApiActualizarLibro from './listarLibros.api';

const libroActualizar = new ApiActualizarLibro();

export const libroActualizarApiThunk = createAsyncThunk(
    'libro/actualizar', baseApiThunk<LibroActualizarRequest>( async (newData) => await libroActualizar.execute(newData))
)