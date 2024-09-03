import {  AsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BaseState } from './base.state';


export function buildCommonCases(asyncFn: AsyncThunk<any, any, any>, builder: any): any{
    builder
        .addCase(asyncFn.fulfilled, (state: BaseState<any>, action:  PayloadAction<any>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(asyncFn.pending, (state: BaseState<any>) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        })
        .addCase(asyncFn.rejected, (state: BaseState<any>, action: PayloadAction<any>) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });

    return builder;
}

export function generateBaseState<T>(): BaseState<T>{
    return  {
        data: null,
        error: null,
        loading: false
    }
}