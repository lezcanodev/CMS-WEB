import { ReactElement, useState } from 'react';
import TablaLibros from './TablaLibros';
import LibroEditor from './LibroEditor';
import { SupersetEmbed } from '../gestionReportes/SuperSet';

export default function GestionLibros(): ReactElement{
    const [openLibroEditor, setOpenLibroEditor] = useState(false);

    if(openLibroEditor){
        return <LibroEditor onCloseLibroEditor={() => setOpenLibroEditor(false)}/>
    }

    return <>
    <TablaLibros onOpenLibroEditor={() => setOpenLibroEditor(true)}/>
    <SupersetEmbed iframeUrl={"http://127.0.0.1:8088/superset/dashboard/p/QKjoZQn786a/"}style={{
        display: 'inline-block',
        justifyContent: 'center',
        alignItems: 'center',
        height: '125vh',
        margin: '30px',
        marginLeft: "11.5%",
        marginRight: "3%",
        width: "1000px"
    }}/>
    </>
}
