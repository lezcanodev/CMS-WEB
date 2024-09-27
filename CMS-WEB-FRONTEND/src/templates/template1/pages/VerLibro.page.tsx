import { IVerLibroPage } from '@/templates/interfaces/pages/verLibro.page.interface';
import { Box, Button, Divider, Grid, Stack, TextareaAutosize, TextField, Typography } from '@mui/material';

export default function VerLibro({
    categoria, contenido, fechaPublicacion, titulo, idLibro, loading, isEmpty,
    autorNombre
}: IVerLibroPage){
    if(isEmpty){
        return <Typography textAlign={'center'} fontWeight={'bold'} fontSize={'2em'}>No hay nada</Typography>
    }

    return <>
        <Grid container gap={1} paddingX={2} overflow={'hidden'} maxWidth={800} marginX={'auto'}>
            <Grid item xs={12}>
                <Box marginBottom={.8}>
                    <Typography color='primary' fontWeight={'bold'} fontSize={'2em'}>{titulo}</Typography>
                    <Stack direction={'row'} gap={1} alignItems={'center'}>                        
                        <Typography component={'p'} fontWeight={'bold'} fontSize={'.8em'}> {categoria} </Typography>
                        <Typography component={'p'} fontSize={'.7em'} fontWeight={'light'} >|</Typography>
                        <Typography component={'p'} fontSize={'.8em'} fontWeight={'light'} >
                            Publicado por {autorNombre} el {fechaPublicacion}</Typography>
                    </Stack>
                </Box>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                {contenido}
                <br/>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <SeccionComentarios/>
            </Grid>
        </Grid>
    </>
}

function SeccionComentarios(){
    return (
        <Stack marginBottom={10}>
            <Box>
                <FormComentar />
            </Box>
            <Box>
                <Comentarios/>
            </Box>
        </Stack>
    )
}

function FormComentar(){
    return (
        <Stack marginBottom={10}>
            <Box>
                <Typography fontSize={'1.8em'}>Deja un comentario</Typography>
            </Box>
            <Box>
                <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    placeholder="Comentar...."
                />
            </Box>
            <Box textAlign={'end'} marginTop={2}>
                <Button variant='outlined' >Comentar</Button>
            </Box>
        </Stack>
    )
}

function Comentarios(){
    return <>
        <Grid container gap={5}>
            <Grid item xs={12}>
                <Stack>
                    <Box>
                        <Typography fontWeight={'bold'}>Administrador</Typography>
                    </Box>
                    <Box>
                        <Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque, odio!</Typography>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack>
                    <Box>
                        <Typography fontWeight={'bold'}>Administrador</Typography>
                    </Box>
                    <Box>
                        <Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque, odio!</Typography>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack>
                    <Box>
                        <Typography fontWeight={'bold'}>Administrador</Typography>
                    </Box>
                    <Box>
                        <Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque, odio!</Typography>
                    </Box>
                </Stack>
            </Grid>
        </Grid>
    </>
}