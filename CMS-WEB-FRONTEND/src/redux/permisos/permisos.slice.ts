import { UserUtils } from '@/utils/User/User.utils';
import { createSlice } from '@reduxjs/toolkit';
import {  PermisoPaginas } from './permisos.state';
import { PermisoUtils } from '@/utils/Permisos/Permisos.utils';


interface RolesState{
    permisosPaginas: PermisoPaginas | null
}

const initialState: RolesState ={
    permisosPaginas: null
}

const permisosSlice = createSlice({
    name: 'permisos',
    initialState,
    reducers: {
        getPermisos(state){
            state.permisosPaginas = PermisoUtils.getPermisosPorPagina();
        }
    }
})

export const { getPermisos } = permisosSlice.actions;
export default permisosSlice.reducer;