import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { checkLikeRequest } from './checkLike.model';
import ApiLikeLibro from './checkLike.api';

const checkLikeApi = new ApiLikeLibro();

export const checkLikeApiThunk = createAsyncThunk(
    'like/check', baseApiThunk<checkLikeRequest>( async (request) => await checkLikeApi.execute(request))
)