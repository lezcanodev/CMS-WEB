import { Box } from '@mui/material';
import { ReactElement } from 'react';
import {PowerBIEmbed} from './PowerBIEmbed';
import { RankMasGustados } from './RankMasGustados';
import { RankMasVistos } from './RankMasVistos';
import {LibrosPorEstado} from './LibrosPorEstado';

/**
 * Se encarga de preparar el contenido para los reportes
 * 
 * ## Reportes incluidos:
 *      - Reporte power bi
 *      - Reporte de libros mas gustados
 *      - Reporte de libros mas vistos
 *      - Reporte de libros por estado
 * 
 * ## Form de usar:
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
        <Box maxWidth={1024} mx={'auto'}>
            <PowerBIEmbed />
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

