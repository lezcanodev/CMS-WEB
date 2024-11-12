import {  AsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BaseState } from './base.state';

/**
 * Recibe una función asíncrona y un builder que se encargaran de crear
 * los casos que controlan los posibles estados de la función que
 * son estado exitoso, procesando y fallido.
 * 
 * @param asyncFn función asíncrona
 * @param builder constructor para manejar estados de una función asíncrona
 * @returns builder 
 */
export function buildCommonCases(asyncFn: AsyncThunk<any, any, any>, builder: any): any{
    // Agregamos los casos a controlar de las función recibida
    builder
        // Caso de éxito
        .addCase(asyncFn.fulfilled, (state: BaseState<any>, action:  PayloadAction<any>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        })
        // Procesando
        .addCase(asyncFn.pending, (state: BaseState<any>) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        })
        // Ocurrió un error
        .addCase(asyncFn.rejected, (state: BaseState<any>, action: PayloadAction<any>) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });

    // retorna el controlador de estados
    return builder;
}

/**
 * Genera un estado base
 * @returns 
 */
export function generateBaseState<T>(): BaseState<T>{
    return  {
        data: null,
        error: null,
        loading: false
    }
}