import { Box, Divider, Drawer, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router';

import SecurityIcon from '@mui/icons-material/Security';
import GroupIcon from '@mui/icons-material/Group';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import ArticleIcon from '@mui/icons-material/Article';
import LanguageIcon from '@mui/icons-material/Language';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SellIcon from '@mui/icons-material/Sell';
import { getRouteByName } from '@/router/helpers';

export default function DashboardLayout(){
    return <>
        <Stack direction={'row'} gap={1}>
            <Box>
                <MenuLateral/>
            </Box>
            <Box>
                <Outlet/>
            </Box> 
        </Stack>
    </>
}

const menu = [
    { label: 'Gestionar Usuarios', icon: <GroupIcon  color='inherit'/> },
    { label: 'Gestionar Contenidos', icon: <WebStoriesIcon  color='inherit'/> },
    { label: 'Gestionar Categorías', icon: <SellIcon  color='inherit'/> },
    { label: 'Gestionar Reportes', icon: <ArticleIcon  color='inherit'/> },
    { label: 'Gestionar Roles', icon: <SecurityIcon  color='inherit'/> }
]

function MenuLateral(){
    const navigate = useNavigate();

    const gotToWebsite = () => {
        navigate(getRouteByName('inicio'));
    }
    return <>
        <Drawer open={false} variant='permanent'>
            <Stack height={'100vh'} justifyContent={'space-between'}>
                <Box>
                    <Stack style={{cursor:'pointer'}} onClick={gotToWebsite}   direction={'row'} alignItems={'center'} justifyContent={'center'} gap={1}>
                        <Box>
                            <Typography fontSize={'.8em'} fontWeight={'bold'} paddingTop={.2} color='primary'>
                                ver sitio web
                            </Typography>
                        </Box>
                        <Box paddingTop={.8}>
                            <LanguageIcon fontSize='inherit' color='primary'/>
                        </Box>
                    </Stack>
                    <Divider/>
                </Box>
                <Box>                
                    {menu.map((m => (
                        <ListItem  key={m.label} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={<>
                                <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={1}>
                                    <Box paddingTop={.8} >
                                        <Typography color="primary" component={'span'}>
                                            {m.icon}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        {m.label}
                                    </Box>
                                </Stack>
                            </>} />
                        </ListItemButton>
                        </ListItem>
                    )))}
                </Box>
                <Box >
                    <Divider/>
                    <Stack direction='row' justifyContent={'center'} alignItems={'center'} gap={2} paddingY={2}>
                        <Box paddingLeft={2}>
                            <Box>
                                <Box>
                                    <Typography fontSize={'1em'} fontWeight={'bold'}>
                                        Administrador
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography fontSize={'.7em'} fontWeight={'light'}>
                                        admin@gmail.com
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <div style={{cursor:'pointer'}}>
                                <ExitToAppIcon color='error'/>
                            </div>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Drawer>
    </>
}