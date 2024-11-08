import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { ComentarioBorrarRequest } from './borrarComentario.model';
import ApiBorrarComentario from './borrarComentario.api';


const comentarioBorrarApi = new ApiBorrarComentario();

export const comentarioBorrarApiThunk = createAsyncThunk(
    'gestionComentarios/borrar', baseApiThunk<ComentarioBorrarRequest>( async (registerData) => await comentarioBorrarApi.execute(registerData))
)