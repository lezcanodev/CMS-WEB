import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import ApiCrearComentario from './crearComentario.api';
import { ComentarioCrearRequest } from './crearComentario.model';



const crearComentario = new ApiCrearComentario();


export const comentarioCrearApiThunk = createAsyncThunk(
    'comentario/crear', baseApiThunk<ComentarioCrearRequest>( async (data) => await crearComentario.execute(data))
)