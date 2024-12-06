import { Box, Typography } from '@mui/material';
import { ReactElement } from 'react';
import {SupersetEmbed} from './SuperSet';
import { RankMasGustados } from './RankMasGustados';
import { RankMasVistos } from './RankMasVistos';
import {LibrosPorEstado} from './LibrosPorEstado';

/**
 * Se encarga de preparar el contenido para los reportes
 * 
 * ## Reportes incluidos:
 *      - Reportes de Apache Superset
 *      - Reporte de libros mas gustados
 *      - Reporte de libros mas vistos
 *      - Reporte de libros por estado
 * 
 * ## Forma de usar:
 *  Solo se debe llamar al componente
 * 
 * ```tsx
 *  <GestionReportes />
 * ```
 * 
 * @returns JSX.Element engloba todos los reportes
 */
export default function GestionReportes(): ReactElement{
    return<>
        <Box maxWidth={"90%"} mx={'auto'} marginLeft={"4%"}>
            <Typography variant={'h5'} fontWeight={'bold'} style={{opacity: .5}} >{"Gestion de Reportes"}</Typography>
            {/**
             * Reportes de Apache Superset
             */}
            <SupersetEmbed  iframeUrl={"http://127.0.0.1:8088/superset/dashboard/p/VdM2ZBO7yvY/"} style={{
                display: 'inline-block',
                justifyContent: 'center',
                alignItems: 'center',
                height: '125vh',
                margin: '30px',
                marginLeft: "6%",
                marginRight: "3%",
            }}/>
            {/**
             * Reporte de cantidad de libros por estado
             */}
            <LibrosPorEstado />
            {/**
             * Reporte de me gustas de los libros
             */}
            <RankMasGustados />
            {/**
             * Reporte de vistas de los libros
             */}
            <RankMasVistos />
        </Box>
    </>
}

