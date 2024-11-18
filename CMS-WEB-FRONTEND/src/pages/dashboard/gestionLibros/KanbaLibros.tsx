/**
* @packageDocumentation GUI-Libros
 */
import { Box, Button, Stack } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import SimpleKanban from '@/components/KanbaTable/KambaTable';


export function KanbaLibros({
    seccionActual,
    setSeccionActual,
    libros,
    changeState
}: any){
    return (
        <Stack>
            <Box>
                <Stack direction={'row'} gap={1} marginBottom={1} justifyContent={'flex-start'}>
                    <Button variant='text' onClick={() => setSeccionActual('tabla')} ><ReplyAllIcon/></Button>
                </Stack> 
            </Box>
            <Box>
                <SimpleKanban
                    libros={libros}
                    cambiarEstadoLibro={ async (libro, nuevoEstado) => {
                        changeState(libro, nuevoEstado);
                    }}
                />
            </Box>
        </Stack>
    );
}