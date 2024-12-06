import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import ApiIdActual from './crearIdActual.api';
import { IdActualCrearRequest } from './crearIdActual.model';

const crearIdActual = new ApiIdActual();

/**
 * Thunk para crear/actualizar el id_actual
 */

export const IdActualCrearApiThunk = createAsyncThunk(
    'id_actual/crear', baseApiThunk<IdActualCrearRequest>( async (data) => await crearIdActual.execute(data))
)