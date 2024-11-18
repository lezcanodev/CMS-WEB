import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { AumentarVisitasRequest, DarLikeRequest, LibroActualizarEstadoRequest, LibroActualizarRequest } from './actualizarLibro.model';
import ApiActualizarLibroEstado, { ApiActualizarLibro, AumentarCantidadVistaLibro, DarLikeLibro } from './actualizarLibro.api';
import ApiGuardarHistorialLibro from '@/api/gestionHistorial/guardarHistorial/guardarHistorial.api';

const guardarHistorialLibro = new ApiGuardarHistorialLibro();

const libroActualizar = new ApiActualizarLibroEstado(guardarHistorialLibro);
const actualizarEstadoThunk = createAsyncThunk(
    'libro/actualizar', baseApiThunk<LibroActualizarEstadoRequest>( async (newData) => await libroActualizar.execute(newData))
)

const aumentarCantidadVistaLibro = new AumentarCantidadVistaLibro();
const aumentarCantidadVistaLibroThunk = createAsyncThunk(
    'libro/aumentarVistas', baseApiThunk<AumentarVisitasRequest>( async (newData) => await aumentarCantidadVistaLibro.execute(newData))
)

const darLikeLibro = new DarLikeLibro();
const darLikeLibroThunk = createAsyncThunk(
    'libro/darLikeLibro', baseApiThunk<DarLikeRequest>( async (newData) => await darLikeLibro.execute(newData))
)

const actualizarLibro = new ApiActualizarLibro(guardarHistorialLibro);
const actualizarLibroThunk = createAsyncThunk(
    'libro/actualizarLibro', baseApiThunk<LibroActualizarRequest>( async (newData) => await actualizarLibro.execute(newData))
)


export const libroActualizarApiThunk = {
    actualizarEstado: actualizarEstadoThunk,
    aumentarCantidadVistaLibroThunk,
    darLikeLibroThunk,
    actualizarLibroThunk
}