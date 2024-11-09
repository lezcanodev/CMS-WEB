import { Box, Button, Grid,  MenuItem, Stack, TextField, Typography, } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SectionTable from '@/components/SectionTable';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/api';
import { useAppDispatch, useAppSelector } from '@/redux';
import { snackbarActions } from '@/redux/snackbar/snackbar.slice';
import { current } from '@reduxjs/toolkit';
import Ranking from '@/components/ranking';
import { LibroListarData, LibroListarResponse } from '@/api/gestionLibros/listar/listarLibro.model';
import CategoriasConMasLibros from './CategoriasConMasLIbros';
import { Link } from 'react-router-dom';
import { getRouteByName } from '@/router/helpers';
import { RankMasGustados } from './RankMasGustados';
import { RankMasVistos } from './RankMasVistos';


export default function GestionUsuarios(){
    //const { permisosPaginas } = useAppSelector(st => st.permisos);
    const dispatch = useAppDispatch();
    //para listar todos los libros
    const { data: libros, loading: loadingLibros } = useAppSelector((state) => state.api.libro.listar);
    //const [libro_filtrado, setLibros]  = useState(libros?.data || []);
    //const [reload, setReload] = useState<boolean>(false);

    // para obtener todos los datos y luego cargar en la tabla
    useEffect(() => {
       dispatch(api.libro.libroListarApiThunk());
    },[]);

    // useEffect para filtrar libros recién agregados
    //useEffect(() => {
    //    const recienAgregados = () => {
    //        const mesActual = new Date().getMonth()+1;
    //        const librosFiltrados = libros?.data?.filter(libro => {
    //            return BigInt(libro.fecha.split('/')[1]) === BigInt(mesActual);
    //        }) || [];
    //        return librosFiltrados;
    //    };
    //    setLibros(recienAgregados());
    //}, [libros]);


    //const rank_visitados = <Ranking
    //titulo = 'Los mas visitados'
    //libros = {libros?.data || []}
    ///>;
    //
    //const rank_masgustados = <Ranking
    //    titulo = 'Agregados recientemente'
    //    libros = {libro_filtrado}
    ///>;
//
    //const rank_ingresados =         <Ranking
    //    titulo = {`Los mas gustados ${libros?.data?.length}`}
    //    libros = {libros?.data || []}
    ///>;
    
    return<>
    <Box mx={'auto'}>
        <CategoriasConMasLibros />
        <RankMasGustados />
        <RankMasVistos />
    </Box>
    </>
}

