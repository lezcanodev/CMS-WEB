import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { UsuarioListarRequest } from './listartUsuario.model';
import ApiListarUsuario from './listartUsuario.api';

const listarApi = new ApiListarUsuario();

export const usuarioListarApiThunk = createAsyncThunk(
    'usuario/listar', baseApiThunk<UsuarioListarRequest | undefined>( async () => await listarApi.execute({}))
)