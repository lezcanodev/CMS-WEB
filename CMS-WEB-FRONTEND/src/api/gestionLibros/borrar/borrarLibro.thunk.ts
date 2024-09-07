import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { LibroBorrarRequest } from './borrarLibro.model';
import ApiBorrarLibro from './borrarLibro.api';


const libroBorrarApi = new ApiBorrarLibro();

export const libroBorrarApiThunk = createAsyncThunk(
    'libro/borrar', baseApiThunk<LibroBorrarRequest>( async (registerData) => await libroBorrarApi.execute(registerData))
)