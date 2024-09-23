import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { UsuarioCrearRequest } from './crearUsuario.model';
import ApiCrearUsuario from './crearUsuario.api';


const crear = new ApiCrearUsuario();


export const usuarioCrearApiThunk = createAsyncThunk(
    'usuario/crear', baseApiThunk<UsuarioCrearRequest>( async (registerData) => await crear.execute(registerData))
)