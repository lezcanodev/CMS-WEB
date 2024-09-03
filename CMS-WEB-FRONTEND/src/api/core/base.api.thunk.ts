import { GetThunkAPI } from '@reduxjs/toolkit';
import { BaseResponse } from './base.api.model';



export function baseApiThunk<T>(requestApi: (data: T) => Promise<BaseResponse<any>>){
    return async (data: T, thunkApi: GetThunkAPI<any>) => {
        try{
            const response = await requestApi(data);
            if(response.error){
                delete response.data;
                delete response.extraData;
                return thunkApi.rejectWithValue(response.error);
            }else{
                delete response.error;
                return response;
            }
        }catch(error){
            return thunkApi?.rejectWithValue('Ocurrió un error en redux');
        }
    }
}