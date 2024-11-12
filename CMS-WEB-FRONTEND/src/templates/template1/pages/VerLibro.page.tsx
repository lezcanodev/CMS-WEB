import { IVerLibroPage } from '@/templates/interfaces/pages/verLibro.page.interface';
import { UserUtils } from '@/utils/User/User.utils';
import { Avatar, Box, Button, Divider, Grid, Stack, TextareaAutosize, TextField, Typography, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function VerLibro({
    categoria, contenido, fechaPublicacion, titulo, idLibro, loading, isEmpty,
    autorNombre, comentarios, crearComentario, borrarComentario, cargarVista, darMeGusta, yaDioMeGusta: initialYaDioMeGusta,
    likes, visitas
}: IVerLibroPage){
    const [yaDioMeGusta, setYaDioMeGusta] = useState<boolean>(!!initialYaDioMeGusta)
    useEffect(() => {
        cargarVista();
    }, [])
    
    if(isEmpty){
        return <>
            <Box sx={{ display: 'relative'}}>
                <CircularProgress className='loader' size="15rem" value={75} thickness={2.5}/>
            </Box>
        </>
    }

    function addNuevoComentario(newComment: string){
        crearComentario.onCrearComentario({contenido: newComment});
    }

    function deleteComentario(id_valor : number){
        borrarComentario.onDeleteComentario(id_valor);
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
                <Box>
                    {visitas+1} visitas | {likes} likes
                </Box>
                <Box my={.5}>
                    {yaDioMeGusta ? (
                        <Typography fontSize='.9rem'>Ya diste me gusta</Typography>
                    ) : (
                        <Button size='small' onClick={() => {darMeGusta(); setYaDioMeGusta(true);}}>
                            me gusta
                        </Button>
                    )}
                </Box>
                <Divider/>
            </Grid>

            <Grid item xs={12}>
                {contenido}
                <br/>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <SeccionComentarios
                    comentarios={comentarios}
                    addNuevoComentario={addNuevoComentario}
                    deleteComentario={deleteComentario}
                />
            </Grid>
        </Grid>
    </>
}

function SeccionComentarios({
    comentarios, addNuevoComentario, deleteComentario
}: any) {
    return (
        <Stack marginBottom={10}>
            <Box>
                <FormComentar addNuevoComentario={addNuevoComentario} />
            </Box>
            <Box>
                <Grid container gap={2}>
                    {comentarios?.items?.map(({ id, nombreUsuario, contenido, fechaPublicacion }: any) => (
                        <Grid key={id} item xs={12} sx={{ boxShadow: '0px 0px 20px #00000010', p: 2, borderRadius: 2 }}>
                            <Stack direction={'row'} alignItems={'flex-start'} gap={2}>
                                <Box marginTop={2}>
                                    <Avatar>{nombreUsuario?.charAt(0)}</Avatar>
                                </Box>
                                
                                <Box sx={{ width: '100%' }}>
                                    
                                    <Box marginBottom={1}>
                                        <Typography fontWeight={'bold'} color='primary'>{nombreUsuario}</Typography>
                                        <Typography fontSize={'.7em'} fontWeight={'light'}>publicado el {fechaPublicacion}</Typography>
                                    </Box>
                                    <Divider />
                                    <Box marginTop={1}>
                                        <Typography>{contenido}</Typography>
                                    </Box>
                                    
                                    <Box marginLeft={80}>
                                        <Button onClick={() => deleteComentario(id)}>
                                            <DeleteOutlineIcon color='error' />
                                        </Button>
                                    </Box>
                                </Box>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Stack>
    );
}


function FormComentar({
    addNuevoComentario
}: any){
    const [contenido, setContenido] = useState("");
    return (
        <Stack marginBottom={10}>
            <Box>
                <Typography fontSize={'1.8em'}>Deja un comentario</Typography>
            </Box>
            <Box>
                <TextField
                    onChange={(e) => setContenido(e.target.value)}
                    value={contenido}
                    fullWidth
                    multiline
                    minRows={4}
                    placeholder="Comentar...."
                />
            </Box>
            <Box textAlign={'end'} marginTop={2}>
                <Button variant='outlined' onClick={() => {addNuevoComentario({contenido}); setContenido(''); } } >Comentar</Button>
            </Box>
        </Stack>
    )
}

export function Comentarios(){
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