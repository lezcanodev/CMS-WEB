import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { UsuarioBorrarRequest } from './borrarUsuario.model';
import ApiBorrarUsuario from './borrarUsuario.api';


const BorrarUsuario = new ApiBorrarUsuario();

export const usuarioBorrarApiThunk = createAsyncThunk(
    'usuario/borrar', baseApiThunk<UsuarioBorrarRequest>( async (registerData) => await BorrarUsuario.execute(registerData))
)