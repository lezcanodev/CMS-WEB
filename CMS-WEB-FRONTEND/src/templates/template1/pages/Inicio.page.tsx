import { IInicioPage } from '@/templates/interfaces/pages/inicio.page.interface';
import { Box, Card, CardContent, Chip, CircularProgress, Divider, Link, Stack, Typography } from '@mui/material';
import {
    Login as LoginIcon,
    Search as SearchIcon,
    RecentActors as RecentActorsIcon,
    SpaceDashboard as SpaceDashboardIcon,
    Person as PersonIcon,
    ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
import './style.css';

export default function InicioPage({
    title, goToLogin, goToRegister, auth, logout, goToDashboard,
    isAdmin, applyFilters, categorias, goToPageVerLibro, libros,
    currentFilters
}: IInicioPage){

    return <>
        <Box>
            <Box style={{backgroundColor: '#0371DF',
                background: 'linear-gradient(90deg, rgba(3,113,223,1) 0%, rgba(3,113,223,1) 20%, rgba(10,95,181,1) 43%, rgba(10,76,143,1) 71%)'}
            }>
                {!auth.isAuth && <Stack 
                    direction='row' 
                    alignItems={'center'} 
                    gap={2} padding={2}
                    maxWidth={800} 
                    marginX='auto'
                    justifyContent={'flex-end'}
                >
                    <LinkWithIcon goTo={goToLogin}  label='Ingresar' icon={<LoginIcon fontSize='small'/>} />
                    <LinkWithIcon goTo={goToRegister}  label='Registrarse' icon={<RecentActorsIcon fontSize='small'/>} />
                </Stack>}
                {auth.isAuth && <Stack 
                    direction='row' 
                    alignItems={'center'} 
                    gap={2} padding={2}
                    maxWidth={800} 
                    marginX='auto'
                    justifyContent={'flex-end'}
                >
                    <LinkWithIcon goTo={goToLogin}  label={auth.userData?.username || 'Mi cuenta'} icon={<PersonIcon fontSize='small'/>} />
                    {isAdmin && (
                        <LinkWithIcon goTo={goToDashboard}  label='Dashboard' icon={<SpaceDashboardIcon fontSize='small'/>} />
                    )}
                    <LinkWithIcon goTo={logout}  label='Salir' icon={<ExitToAppIcon fontSize='small'/>} />
                </Stack>}
                <Stack
                    justifyContent={'center'}
                    alignItems={'center'}
                    height='auto'
                    paddingX={1}
                    paddingBottom={5}
                    minHeight={380} 
                    color='#fff' 
                    textAlign={'center'}
                >                    
                    <Typography fontSize={'.8em'} fontWeight={'light'}>
                        Bienvenido a
                    </Typography>
                    <Typography fontSize={'3em'} fontWeight={'bold'} className='title'>
                        {title}
                    </Typography>
                </Stack>
            </Box>
            <Box component={'header'} style={{transform: 'translateY(-50%)'}} paddingX={1}>
                <Box sx={{ boxShadow: 3 }}  maxWidth={900} margin={'auto'} borderRadius={10} style={{background: '#fff'}}>
                    <Stack direction='row' alignItems={'center'} gap={1.6} paddingY={1.2} paddingX={3}>     
                        <Box paddingTop={1}>
                                <SearchIcon fontSize='large' color={'primary'}/>
                        </Box>
                        <Box style={{width:'100%'}}>                            
                            <input
                                value={currentFilters?.buscarPorTexto || ''}
                                style={{
                                    width:'100%',
                                    outline: 'none',
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '1.2em'
                                }}
                                placeholder='Buscar contenido...'
                                onChange={(e) => {
                                    applyFilters({buscarPorTexto: e?.currentTarget?.value})
                                }}
                            />
                        </Box>                       
                    </Stack>
                </Box>
            </Box>
        </Box>
        <Box>
            <Stack direction={'row'} gap={1} overflow={'auto'} paddingBottom={1} paddingX={2} marginBottom={2}>
                <Chip
                    variant={currentFilters?.categoriaId ? 'outlined' : 'filled'}
                    color='primary'
                    label='Todas'
                    onClick={() => {
                        applyFilters({}, {resetFilters: true})
                    }}
                    clickable
                />
                {categorias?.data?.map(categoria => (<>                
                    <Chip
                        key={categoria?.id}
                        variant={currentFilters?.categoriaId  == categoria?.id ? 'filled' : 'outlined'}
                        color='primary'
                        label={categoria?.nombre}
                        onClick={() => {
                            applyFilters({categoriaId: categoria?.id})
                        }}
                        clickable
                    />
                </>))}
            </Stack>
        </Box>
        <Box paddingBottom={5} paddingX={1} className= "Box">
            <Stack direction={'row'} flexWrap={'wrap'} gap={3} justifyContent={'center'} minHeight={400}>
                {
                    libros?.data?.map((libro => (<>
                        <Box key={libro?.id} style={{width: '100%', height: '100%'}} maxWidth={'380px'} className="BoxContentLibro">
                            <ContentCard
                                title={libro.titulo} 
                                verLibro={() => goToPageVerLibro(libro?.id)}
                                publishedDate={libro.fecha} 
                                shortDescrition={`${libro?.categoriaNombre} | Publicado por ${libro?.autorNombre}`}
                                image='https://cdn-icons-png.flaticon.com/512/695/695896.png'
                            />
                        </Box>   
                    </>)))
                }
                {!libros?.data?.length && libros.loading && <CircularProgress size='100px'/>}
                {!libros?.data?.length && !libros.loading && <Typography textAlign={'center'} fontSize={'2em'} >No hay libros publicados</Typography> }
            </Stack>
        </Box>
    </>
}

interface LinkWithIconProps{
    label: string,
    goTo: () => void,
    icon: React.ReactElement
}
function LinkWithIcon({
    label, icon, goTo,
}: LinkWithIconProps){
    return  <Link onClick={(e) => {e.preventDefault(); goTo()}}  style={{textDecoration: 'none', cursor: 'pointer', background:'#ffffff1f', padding: '2px 8px', borderRadius:3}} color='#fff'>
        
        <Stack direction='row' alignItems={'center'} gap={1}>
            <Box paddingTop={.5}>
                {icon}
            </Box>
            <Box>
                {label}
            </Box>
        </Stack>
    </Link>
}


interface ContentCardProps{
    title: string,
    publishedDate: string,
    shortDescrition: string, 
    image: string,
    verLibro: () => void
}
function ContentCard({
    title, publishedDate, shortDescrition, image, verLibro
}: ContentCardProps){
    return <>
        <Card>
            <CardContent>
                <Stack gap={2}>
                    <Box style={{width:'100%', height: 280}} maxWidth={'250px'} textAlign={'center'} marginX={'auto'}>
                        <Link onClick={(e)=>{e?.preventDefault(); verLibro();}}>
                            <img
                                style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                src={`${image}`}
                            />
                        </Link>
                    </Box>
                    <Stack>
                        <Stack>
                            <Typography fontWeight={'Bold'}>{title}</Typography>
                            <Typography fontWeight={'light'} fontSize={'.7em'}>publicado el {publishedDate}</Typography>
                        </Stack>
                        <Box paddingTop={1} paddingBottom={3}>
                            <Divider/>
                        </Box>
                        <Typography  fontSize='.95em'>
                            {shortDescrition}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    </>
}