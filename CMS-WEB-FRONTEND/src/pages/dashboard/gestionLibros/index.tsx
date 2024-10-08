import { useState } from 'react';
import TablaLibros from './TablaLibros';
import LibroEditor from './LibroEditor';

export default function GestionLibros(){
    const [openLibroEditor, setOpenLibroEditor] = useState(false);

    if(openLibroEditor){
        return <LibroEditor onCloseLibroEditor={() => setOpenLibroEditor(false)}/>
    }

    return <TablaLibros onOpenLibroEditor={() => setOpenLibroEditor(true)}/>
}
