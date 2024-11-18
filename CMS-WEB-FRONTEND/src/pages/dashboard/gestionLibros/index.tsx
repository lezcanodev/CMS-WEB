/**
 * Este modulo contiene el componente que se encarga de gestionar
 * que sección (tabla, formularios, etc. ) se debe mostrar en gestión de libros
 * 
 *  @packageDocumentation GUI-Libros
 */
import { ReactElement, useState } from 'react';
import {TablaLibros} from './TablaLibros';
import {LibroEditor} from './LibroEditor';
import { LibroListarData } from '@/api/gestionLibros/listar/listarLibro.model';
import {LibroEditorEdicion} from './LibroEditorEdicion';


/**
 * Es el componente principal de la pagina de libros y
 * gestiona que componente se debe renderizar en la sección de libros dependiendo de la sección en 
 * la que se encuentre, hay tres secciones:
 *  - Tabla de libros
 *  - Formulario de creación de libro
 *  - Formulario de edición de libro
 * 
 * @example
 * Para usarlo solo hay que llamar al componente
 * ```tsx
 *  <GestionLibros />
 * ```
 * 
 * @returns componente dependiendo de la sección
 * 
 * @category Component
 */
export default function GestionLibros(): ReactElement{
    // para manejar  apertura/cierre de la sección creación de libro
    const [openLibroEditor, setOpenLibroEditor] = useState(false);
    // para manejar apertura/cierre de la sección edición de libro
    // si es null esta cerrado, si tiene algún libro esta abierto
    const [libroAEditar, setLibroAEditar] = useState<null | LibroListarData>(null);

    /**
     * Sección formulario de educación de libro
     */
    if(libroAEditar){
        return <LibroEditorEdicion libro={libroAEditar} onCloseLibroEditor={() => setLibroAEditar(null) }  />
    }

    /**
     * Formulario de creación de libro
     */
    if(openLibroEditor){
        return <LibroEditor onCloseLibroEditor={() => setOpenLibroEditor(false)}/>
    }

    /**
     * Tabla de libros
     */
    return <TablaLibros 
                onOpenLibroEditor={() => setOpenLibroEditor(true)}
                onOpenEditarLibro={ (libro: LibroListarData) => setLibroAEditar(libro) }
            />
}
