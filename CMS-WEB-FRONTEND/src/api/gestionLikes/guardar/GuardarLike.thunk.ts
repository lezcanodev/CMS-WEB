import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { GuardarLikeRequest } from './GuardarLike.model';
import ApiGuardarLike from './GuardarLike.api';

const GuardarLike = new ApiGuardarLike();


export const GuardarLikeApiThunk = createAsyncThunk(
    'like/crear', baseApiThunk<GuardarLikeRequest>( async (data) => await GuardarLike.execute(data))
)