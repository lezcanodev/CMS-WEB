import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { LikeBorrarRequest } from './borrarLike.model';
import ApiBorrarLike from './borrarLike.api';


const likeBorrarApi = new ApiBorrarLike();

export const likeBorrarApiThunk = createAsyncThunk(
    'like/borrar', baseApiThunk<LikeBorrarRequest>( async (registerData) => await likeBorrarApi.execute(registerData))
)