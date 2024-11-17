/**
 * Contiene un componente que representa una sección genérica que se utiliza
 * a traves de las distintas paginas.
 * 
 * @packageDocumentation Sección-Tabla-Genérica
 */
import React from 'react'; 
import { Box, Button, CircularProgress, Grid, InputAdornment, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Propiedades del componente `SectionTable`.
 */
export interface SectionTableProps {
    /**
     * Es un array que representa la configuración de las columnas de la tabla.
     */
    columns: {
        /** Nombre visible de la columna */
        columnName: string;
        /**
         * Clave única para identificar la columna en rows.
         */
        key: string;
        /**
         * Retorna la fila con un estilo personalizado o también se
         * puede utilizar para mostrar acciones.
         * 
         * Es opcional, si no esta definido retorna el valor de rows como texto
         * 
         * @param currentRow Valores de la fila actual 
         * @returns ReactElement
         */
        action?: (currentRow: any) => React.ReactElement;
    }[];

    /**
     * Filas de datos que se mostrarán en la tabla.
     */
    rows: any[];

    /**
     * Estado de carga de la tabla. Si es `true`, se muestra un indicador de carga.
     */
    loading: boolean;

    /**
     * Título de la tabla.
     */
    title: string;

    /**
     * Indica si se debe mostrar la opción de crear, si es false
     * puede ser por que no haga falta o porque no tenga permisos
     */
    puedoCrear?: boolean;

    /**
     * Función que se ejecuta al realizar una búsqueda en la tabla.
     * @param query - Texto introducido en el campo de búsqueda.
     */
    onSearch: (query: string) => void;

    /**
     * Función que se ejecuta al intentar crear un nuevo elemento (opcional).
     */
    onCreate?: () => void;

    /**
     * Elementos adicionales que se mostrarán en el header de la sección,
     * es opcional y por defecto solo se muestra la opción de crear
     */
    masOpciones?: React.ReactNode;
}

/**
 * Contiene una sección genérica que tiene:
 *  - titulo
 *  - tabla
 *  - buscador en la tabla
 *  - opciones, por defecto solo tiene crear.
 * 
 * @example
 * ```tsx
 * // ejemplo de datos
 * const rows = [ 
 *      {id: 1, username: "nombre"},
 *      {id: 2, username: "nombre2"}
 * ]
 * 
 * // usamos el componente para mostrar los datos en una tabla
 * <SectionTable
 *   title = 'Usuarios ejemplo tabla'
 *   rows = {rows}, 
 *   columns = {[
 *       // Ejemplo de columna que accede a un valor de rows
 *         {
 *           // nombre de la columna
 *           columnName: 'Nombre de usuario',
 *           // la key para acceder al dato en rows
 *           key:'username'
 *         },
 *
 *       // Ejemplo de columna retorna un elemento personalizado
 *         {
 *           // nombre de la columna
 *           columnName: 'Acciones',
 *           key:'acciones',
 *           // fila actual contiene los datos de la fila
 *           action: (filaActual) => {
 *               // retorna elemento custom
 *               return <div> 
 *                   <button 
 *                       onClick={() => eliminarUsuario(filaActual.id)}
 *                   >
 *                       Eliminar
 *                   </button> 
 *               </div>
 *           }
 *         }  
 *   ]},
 *   onSearch={ (query: string) => {
 *       // aplicamos la query a rows
 *   } }
 *   onCreate={() => {
 *       // accion para crear
 *   }}
 *   // si los datos son obtenidos de forma asíncrona
 *   loading={false}
 *   puedoCrear={true}
 * />
 * ```
 * 
 * @param props configuración para la tabla
 * @returns Tabla con titulo y opciones
 */
export default function SectionTable({
    columns, rows, onSearch, onCreate, loading, masOpciones, title, puedoCrear = false
}: SectionTableProps) {
  return (
    <Stack direction={'column'} gap={5}>
        {/* Titulo */}
        <Box>
            <Typography variant={'h5'} fontWeight={'bold'} style={{opacity: .5}} >{title}</Typography>
        </Box>

        {/* Opciones y buscador */}
        <Grid container maxWidth={1080} marginX={'auto'} gap={2}>
            <Grid item xs={12}>
                <Stack direction='row-reverse' gap={1} justifyContent={'space-between'} alignItems={'center'}>

                    {/* Aquí se muestra la opción de crear y las demás opciones definidas en  masOpciones*/}
                    <Stack direction={'row'} gap={.5}>
                        { puedoCrear && (
                            <Button onClick={() => {if(onCreate) onCreate()}} variant='outlined' endIcon={<LibraryAddIcon   fontSize='small'/>}>Crear</Button>
                        )}
                        {masOpciones}
                    </Stack>

                    {/* Buscador  */}
                    <Box >
                        <TextField
                            onChange={(e) => onSearch(e.target.value)}
                            variant="outlined"
                            fullWidth
                            placeholder="Buscar..."
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: '20px',
                                },
                            }}
                        />
                    </Box>

                </Stack>
            </Grid>

            {/* Tabla */}
            <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {columns.map(({columnName}, index) => (
                                    <TableCell key={'columnName'+index} align="center">{columnName}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <>
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                                </>
                            ) : (
                                rows.map((row, index) => (
                                    <TableRow
                                        key={'row'+index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        {
                                            columns.map(({key, action}, index) => action ? (
                                                <TableCell key={index}>{action(row)}</TableCell>
                                            ) : (
                                                <TableCell key={index} align="center">{row[key]}</TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    </Stack>

  );
}