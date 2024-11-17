import React from 'react'; 
import { Box, Button, CircularProgress, Grid, InputAdornment, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SearchIcon from '@mui/icons-material/Search';

interface SectionTableProps{
    columns: {columnName: string, key: string,action?:(currentRow: any) => React.ReactElement}[],
    rows: any[],
    loading: boolean,
    title: string,
    puedoCrear?: boolean,
    onSearch: (query: string) => void,
    onCreate: () => void,
    masOpciones?: React.ReactNode
}
export default function SectionTable({
    columns, rows, onSearch, onCreate, loading, masOpciones, title, puedoCrear = false
}: SectionTableProps) {
  return (
    <Stack direction={'column'} gap={5}>
        <Box>
            <Typography variant={'h5'} fontWeight={'bold'} style={{opacity: .5}} >{title}</Typography>
        </Box>
        <Grid container maxWidth={1080} marginX={'auto'} gap={2}>
            <Grid item xs={12}>
                <Stack direction='row-reverse' gap={1} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack direction={'row'} gap={.5}>
                        { puedoCrear && (
                            <Button onClick={() => onCreate()} variant='outlined' endIcon={<LibraryAddIcon   fontSize='small'/>}>Crear</Button>
                        )}
                        {masOpciones}
                    </Stack>
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
                                            columns.map(({key, action}, index) => action ? <TableCell key={index}>{action(row)}</TableCell> : <TableCell key={index} align="center">{row[key]}</TableCell>)
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