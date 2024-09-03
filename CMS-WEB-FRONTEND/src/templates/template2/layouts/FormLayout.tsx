import { Box, Button, Card, CardContent, Grid, Link, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getRouteByName } from '../../../router/helpers';
import { useNavigate } from 'react-router';

interface FormLayoutProps{
    title: string | React.ReactElement,
    children: React.ReactElement,
    onSubmit: React.FormEventHandler<HTMLFormElement>,
}

export const FormLayout = ({
    title,
    children,
    onSubmit
  }: FormLayoutProps) => {
    const navigate = useNavigate();

    const goTo = (e: any) => {
        e.preventDefault();
        navigate(getRouteByName('inicio'));
    }

    return <>
    <Stack margin={'auto'} width={'100vw'} height={'100vh'} overflow={'auto'}>
          <Box style={{width: '100%'}} maxWidth={900} padding={1} marginX='auto'>
            <Button variant='outlined' onClick={goTo}>              
                <Link onClick={(e) => {e.preventDefault();}} style={{textDecoration: 'none'}} color='primary' marginTop={1}>
                  <ArrowBackIcon fontSize='small'/>
                </Link>
            </Button>
          </Box>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100%'}>
                <Box>
                  <Card>
                    <CardContent>
                      <Grid container gap={3} padding={2}>
                          <Grid item xs={12}>
                            <Box minWidth={200} display={'flex'} gap={1} marginBottom={5} paddingBottom={2} alignItems={'center'}>
                                <Typography variant='h5' fontWeight={'bold'} color='primary'>
                                  {title}
                                </Typography>
                              </Box>
                          </Grid>
                          <Grid item xs={12} paddingX={1} paddingBottom={2}>
                              <form onSubmit={onSubmit}>
                                  {children}
                              </form>
                          </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
          </Box>
    </Stack>
    </>
}