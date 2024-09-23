import { IVerLibroPage } from '@/templates/interfaces/pages/verLibro.page.interface';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';

export default function VerLibro({
    categoria, contenido, fechaPublicacion, titulo, idLibro, loading, isEmpty
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
                        <Typography component={'p'} fontSize={'.8em'} fontWeight={'light'} >{fechaPublicacion}</Typography>
                        <Typography component={'p'} fontSize={'.7em'} fontWeight={'light'} >|</Typography>
                        <Typography component={'p'} fontWeight={'bold'} fontSize={'.8em'}> {categoria} </Typography>
                    </Stack>
                </Box>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                {contenido}
            </Grid>
        </Grid>
    </>
}