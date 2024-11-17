/**
 * Contiene el componente que renderiza la sección de historial de libros
 * @packageDocumentation GUI-Libros
 */
import { Box, Button, Stack } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { HistorialLibro } from './ListarHistoriaLibro';
import { ReactElement } from 'react';

/**
 * Propiedades del componente `Histograma`.
 */
export interface HistogramaProps {
    /** 
     * Función para volver a la pantalla anterior. 
     */
    volverAtras: () => void;
    /** 
     * Identificador único del libro.
     */
    libro_id: number;
    /** 
     * Nombre del libro.
     */
    libro_nombre: string;
}

/**
 * Componente que muestra un historial de cambios de un libro en una tabla y permite 
 * volver a la pantalla anterior.
 * @example
 * Ejemplo de uso, se le debe pasar el id del libro y el nombre
 * ```tsx
 *  <Histograma
 *     volverAtras={() => { 
 *        // código para volver atrás
 *      }}
 *     libro_id={1}
 *     libro_nombre={'nombre'}
 *  />
 * ```
 * @param props - Propiedades del componente.
 * @returns Vista del histograma con tabla de historial y botón para retroceder.
 * 
* @category Component
 */
export function Histograma({
    volverAtras,
	libro_id,
    libro_nombre
}: HistogramaProps): ReactElement{
    return (
	    <Stack>
            {/* Botón para volver atrás */}
            <Box>
                <Stack direction={'row'} gap={1} marginBottom={1} justifyContent={'flex-start'}>
                    <Button variant='text' onClick={volverAtras} ><ReplyAllIcon/></Button>
                </Stack> 
            </Box>

            {/* Tabla del historial */}
            <Box>
                 <HistorialLibro
                    libroId={libro_id}
                    libroNombre={libro_nombre}
				/> 
            </Box>
        </Stack>
	);
}
