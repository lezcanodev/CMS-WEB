import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { AumentarVisitasRequest, DarLikeRequest, LibroActualizarRequest } from './actualizarLibro.model';
import ApiActualizarLibro, { AumentarCantidadVistaLibro, DarLikeLibro } from './listarLibros.api';

const libroActualizar = new ApiActualizarLibro();
const actualizarEstado = createAsyncThunk(
    'libro/actualizar', baseApiThunk<LibroActualizarRequest>( async (newData) => await libroActualizar.execute(newData))
)

const aumentarCantidadVistaLibro = new AumentarCantidadVistaLibro();
const aumentarCantidadVistaLibroThunk = createAsyncThunk(
    'libro/aumentarVistas', baseApiThunk<AumentarVisitasRequest>( async (newData) => await aumentarCantidadVistaLibro.execute(newData))
)

const darLikeLibro = new DarLikeLibro();
const darLikeLibroThunk = createAsyncThunk(
    'libro/darLikeLibro', baseApiThunk<DarLikeRequest>( async (newData) => await darLikeLibro.execute(newData))
)

export const libroActualizarApiThunk = {
    libroActualizarApiThunk: actualizarEstado,
    aumentarCantidadVistaLibroThunk,
    darLikeLibroThunk
}