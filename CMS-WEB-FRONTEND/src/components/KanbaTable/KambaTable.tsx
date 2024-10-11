
import { LibroListarData, LibroListarResponse } from '@/api/gestionLibros/listar/listarLibro.model';
import { useAppDispatch, useAppSelector } from '@/redux';
import { snackbarActions } from '@/redux/snackbar/snackbar.slice';
import { getRouteByName } from '@/router/helpers';
import { Box, Divider, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface LibroKanbaData{
    libroId: number,
    libroNombre: string,
    autorNombre: string,
    estado: string
}
interface EstadoKanbaData{
    data: LibroKanbaData[],
    statusNombre: string,
    color: string
}
const estadoLibro = {
    'pendientes': 'En Revision',
    'rechazados': 'Rechazado',
    'publicados': 'Publicado',
    'guardados': 'Guardado'
}
const estadoLibroPermisos = {
    'pendientes': 'REVISION',
    'rechazados': 'RECHAZADO',
    'publicados': 'PUBLICADO',
    'guardados': 'GUARDADO'
}
   
interface SimpleKanbanProps{
    libros: LibroListarResponse,
    cambiarEstadoLibro: (libroId: LibroListarData, nuevoEstado: string) => Promise<void>
}
const SimpleKanban = ({
    libros, cambiarEstadoLibro
}: SimpleKanbanProps) => {
  const dispatch = useAppDispatch();
  const { permisosPaginas } = useAppSelector(st => st.permisos);
  const [tasks, setTasks] = useState<{[statusKey: string]: EstadoKanbaData}>({
    ...(permisosPaginas?.LIBRO_PAGINA.KANBAN_ESTADOS.GUARDADO.PUEDO_VER ? {guardados: {
        color: "#51a5f9",
        statusNombre: 'Guardados',
        data: libros?.filter(x => x.estado == 'Guardado').map(libro => ({
                libroId: libro.id,
                libroNombre: libro.titulo,
                autorNombre: libro.autorNombre,
                estado: 'guardados'
            })) || []
    }} : {}),
    pendientes: {
        color: "#ef9433",
        statusNombre: 'En Revision',
        data: libros?.filter(x => x.estado == 'En Revision').map(libro => ({
            libroId: libro.id,
            libroNombre: libro.titulo,
            autorNombre: libro.autorNombre,
            estado: 'pendientes'
        })) || []
    },
    rechazados: {
        color: "#f12b2b",
        statusNombre: 'Rechazados',
        data: libros?.filter(x => x.estado == 'Rechazado').map(libro => ({
            libroId: libro.id,
            libroNombre: libro.titulo,
            autorNombre: libro.autorNombre,
            estado: 'rechazados'
        })) || [] 
    },
    publicados: {
        color: "#31ba20",
        statusNombre: 'Publicados',
        data: libros?.filter(x => x.estado == 'Publicado').map(libro => ({
            libroId: libro.id,
            libroNombre: libro.titulo,
            autorNombre: libro.autorNombre,
            estado: 'publicados'
        })) || [] 
    },
  });

  const [draggedTask, setDraggedTask] = useState<LibroKanbaData | null>(null);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, task: LibroKanbaData) => {
    setDraggedTask(task);
    //console.log("Empezo")
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
   // console.log("moviendo")
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>, estadoObjectivo: string) => {
    //console.log("finalizo ", estadoObjectivo)
    e.preventDefault();

    if (draggedTask) {
        const libroArrastrado = {
            ...draggedTask,
            estado: estadoObjectivo
        };
        const estadoActual = draggedTask.estado; 
    
        if ( estadoActual !== estadoObjectivo) {
                if((estadoLibroPermisos as any)?.[estadoObjectivo] && (permisosPaginas?.LIBRO_PAGINA.KANBAN_ESTADOS as any)?.[(estadoLibroPermisos as any)?.[estadoObjectivo] as any].PUEDO_CAMBIAR){
                    const seCambioDeEstadoConExito = await cambiarEstadoLibro(
                        libros.find(x => x.id == libroArrastrado.libroId)!,
                        (estadoLibro as any)?.[estadoObjectivo] || 'En Revision'
                    );
                    setTasks(prevTasks => ({
                        ...prevTasks,
                        [estadoActual]: {
                            ...prevTasks[estadoActual],
                            data: prevTasks[estadoActual].data.filter(x => x.libroId !== libroArrastrado.libroId)
                        },
                        [estadoObjectivo]: {
                            ...prevTasks[estadoObjectivo],
                            data: [...prevTasks[estadoObjectivo].data, libroArrastrado]
                        }
                    }));
                    
                }else{
                    dispatch(snackbarActions.openSnackbar({
                        message: 'No tienes permiso para realizar esta acción',
                        type: 'error'
                    }))
                }
        }
    }
    setDraggedTask(null);
  };

  const renderTasks = (status: string) => {
    return <>
        <Stack gap={1}>
            {tasks[status].data.map((task: LibroKanbaData, index) => (
            <Box
                key={index}
                draggable
                onDragStart={(e) => onDragStart(e, task)}
                bgcolor={tasks[status].color+'50'}
                borderRadius={1}
                px={2}
                py={1}
                sx={{cursor: 'pointer'}}
            >
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Box>
                        <Typography fontWeight={'bold'}>
                            {task.libroNombre}
                        </Typography>
                        <Typography fontSize={'.7em'} fontWeight={'light'}>
                            {task.autorNombre}
                        </Typography>
                    </Box>
                    <Box>
                        <Link to={getRouteByName('verLibro', {id: task.libroId})} target='_blank'>
                            Ver
                        </Link>
                    </Box>
                </Stack>
            </Box>
            ))}
        </Stack>
    </>
  };

  return (<>
    <Stack direction={'row'} justifyContent={'space-evenly'} gap={1}>
        {Object.keys(tasks).map((estado) => (<>
            <Box
                width={'100%'}
                key={estado}
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop(e, estado)}
                className="bg-gray-100 p-4 rounded-lg w-1/3"
                bgcolor={'#fff'}
                p={.4}
            >
                <Box bgcolor={tasks[estado].color}>
                    <Typography textAlign={'center'} color={'#fff'}  fontWeight={'bold'} fontSize={'1.1em'} py={1}>
                        {tasks[estado].statusNombre}
                    </Typography>
                </Box>
                <Divider/>
                <Box mt={4} mb={5}>
                    {renderTasks(estado)}
                </Box>
            </Box>
        </>))}
      {/*['todo', 'inProgress', 'done'].map((status) => (
        <div
          key={status}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, status)}
          className="bg-gray-100 p-4 rounded-lg w-1/3"
        >
          <h2 className="text-lg font-bold mb-4">
            {status === 'todo' ? 'Por hacer' : status === 'inProgress' ? 'En progreso' : 'Hecho'}
          </h2>
          {renderTasks(status)}
        </div>
      ))*/}
    </Stack>  
</>);
};

export default SimpleKanban;