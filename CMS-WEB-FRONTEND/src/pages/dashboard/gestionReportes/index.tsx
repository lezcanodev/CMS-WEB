import { Box, Button, MenuItem, Stack, TextField, Typography, } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SectionTable from '@/components/SectionTable';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/api';
import { useAppDispatch, useAppSelector } from '@/redux';
import { snackbarActions } from '@/redux/snackbar/snackbar.slice';
import { current } from '@reduxjs/toolkit';
import Ranking from '@/components/ranking';
import { LibroListarData } from '@/api/gestionLibros/listar/listarLibro.model';
import CategoriasConMasLibros from './CategoriasConMasLIbros';


export default function GestionUsuarios(){
    const { permisosPaginas } = useAppSelector(st => st.permisos);
    const dispatch = useAppDispatch();
    //para listar todos los libros
    const { data: libros, loading: loadingLibros } = useAppSelector((state) => state.api.libro.listar);
    const [libro_filtrado, setLibros]  = useState(libros?.data || []);
    const [reload, setReload] = useState<boolean>(false);
    
    return<>
        <CategoriasConMasLibros />
    </>
}
