import { Box, Stack, Typography } from '@mui/material';

export default function GestionReportes(){
  
    return<>
    <Stack direction={'row'} gap={2}>
        <Box sx={{width: '100%', bgcolor: '#00000005', p:2, borderRadius:1}}>
            <Typography fontWeight={800} fontSize={'1.1em'} pb={3}>Autores con mas libros</Typography>
            <Stack maxWidth={800} gap={2}>
                <Box>
                    <Stack direction={'row'} gap={1} alignItems={'center'}>
                        <Typography whiteSpace={'nowrap'}>Author 1</Typography>
                        <Box bgcolor='error' sx={{p:2, bgcolor: '#27ae60', width: '100%'}} ></Box>
                        <Typography>10</Typography>
                    </Stack>
                </Box>
                <Box>
                    <Stack direction={'row'} gap={1} alignItems={'center'}>
                        <Typography whiteSpace={'nowrap'}>Author 1</Typography>
                        <Box bgcolor='error' sx={{p:2, bgcolor: '#e67e22', width: '80%'}} ></Box>
                        <Typography>8</Typography>
                    </Stack>
                </Box>
                <Box>
                    <Stack direction={'row'} gap={1} alignItems={'center'}>
                        <Typography whiteSpace={'nowrap'}>Author 1</Typography>
                        <Box bgcolor='error' sx={{p:2, bgcolor: '#2980b9', width: '60%'}} ></Box>
                        <Typography>6</Typography>
                    </Stack>
                </Box>
            </Stack>
        </Box>
        <Box sx={{width: '100%', bgcolor: '#46149b2b', p:2, borderRadius:1}}>
            <Typography fontWeight={800} fontSize={'1.1em'} pb={3} >Libros con mas comentarios</Typography>
            <Stack maxWidth={800} gap={2}>
                <Box>
                    <Stack direction={'row'} gap={1} alignItems={'center'}>
                        <Typography whiteSpace={'nowrap'}>Author 1</Typography>
                        <Box bgcolor='error' sx={{p:2, bgcolor: '#27ae60', width: '100%'}} ></Box>
                        <Typography>10</Typography>
                    </Stack>
                </Box>
                <Box>
                    <Stack direction={'row'} gap={1} alignItems={'center'}>
                        <Typography whiteSpace={'nowrap'}>Author 1</Typography>
                        <Box bgcolor='error' sx={{p:2, bgcolor: '#e67e22', width: '80%'}} ></Box>
                        <Typography>8</Typography>
                    </Stack>
                </Box>
                <Box>
                    <Stack direction={'row'} gap={1} alignItems={'center'}>
                        <Typography whiteSpace={'nowrap'}>Author 1</Typography>
                        <Box bgcolor='error' sx={{p:2, bgcolor: '#2980b9', width: '60%'}} ></Box>
                        <Typography>6</Typography>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    </Stack>
    </>
}
