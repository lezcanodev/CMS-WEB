import { Box, Button, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SearchIcon from '@mui/icons-material/Search';

interface SectionTableProps{
    columns: {columnName: string, key: string,action?:(currentRow: any) => React.ReactElement}[],
    rows: any[],
    onSearch: (query: string) => void,
    onCreate: () => void
}
export default function SectionTable({
    columns, rows, onSearch, onCreate
}: SectionTableProps) {
  return (
    <Stack direction={'column'} gap={5}>
        <Box>
            <Typography variant={'h5'} fontWeight={'bold'} style={{opacity: .5}} >Gestión de categorías</Typography>
        </Box>
        <Grid container maxWidth={600} marginX={'auto'} gap={2}>
            <Grid item xs={12}>
                <Stack direction='column' gap={1}>
                    <Box>
                        <Button onClick={() => onCreate()} variant='outlined' endIcon={<LibraryAddIcon   fontSize='small'/>}>Crear</Button>
                    </Box>
                    <Box maxWidth={300} >
                        <TextField 
                            onChange={(e) => onSearch(e.target.value)}
                            label={<>
                                <Stack direction='row' alignItems={'center'} justifyContent={'center'} gap={1} >
                                    <Box>
                                        <SearchIcon fontSize='small' />
                                    </Box>
                                    <Typography>
                                        Buscar...
                                    </Typography>
                                </Stack>
                            </>}
                            variant="standard" 
                            fullWidth 
                        />
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
                    <Table  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {columns.map(({columnName}, index) => (
                                    <TableCell key={'columnName'+index} align="center">{columnName}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    key={'row'+index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {
                                        columns.map(({key, action}, index) => action ? <TableCell key={index}>{action(row)}</TableCell> : <TableCell key={index} align="center">{row[key]}</TableCell>)
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    </Stack>

  );
}