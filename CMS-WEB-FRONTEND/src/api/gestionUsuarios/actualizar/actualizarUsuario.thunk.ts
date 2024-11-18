import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import ApiActualizarUsuario from './actualizarUsuario.api';
import { UsuarioActualizarRequest } from './actualizarUsuario.model';


const usuarioActualizar = new ApiActualizarUsuario();


export const usuarioActualizarApiThunk = createAsyncThunk(
    'usuario/actualizar', 
    baseApiThunk<UsuarioActualizarRequest>(async (newData) => await usuarioActualizar.execute(newData))
);
