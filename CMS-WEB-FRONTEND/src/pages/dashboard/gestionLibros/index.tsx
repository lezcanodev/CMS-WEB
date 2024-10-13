import TablaLibros from './TablaLibros';
import LibroEditor from './LibroEditor';
import { useAppSelector } from '@/redux';
import { useState } from 'react';

export default function GestionLibros() {
    const [openLibroEditor, setOpenLibroEditor] = useState(false);
    const { libro, categoria } = useAppSelector((state) => state.api);
    const [currentFilters, setCurrentFilters] = useState<any>({});

    // Se usa momentaneamente para aplicar filtros desde front
    const [libros, setLibros] = useState<any[]>([]);
    const [categorias, setCategorias] = useState<any[]>([]);

    if (openLibroEditor) {
        return <LibroEditor onCloseLibroEditor={() => setOpenLibroEditor(false)} />;
    }

    return <TablaLibros
        onOpenLibroEditor={() => setOpenLibroEditor(true)}
        applyFilters={(filters, opts) => {
            let newFilters: any = {}; 
            if(opts?.resetFilters){
                newFilters = {...filters};
            }else{
                newFilters = { ...currentFilters, ...filters };
            }
    
            // Filtros desde el front, agregar al backend
            let filterLibros: any[] = [...(libro?.listar?.data?.data || [])];
        
            if(typeof newFilters?.categoriaId !== 'undefined'){
                filterLibros = filterLibros.filter((libro) => libro?.categoria == newFilters?.categoriaId );
                console.log("Se aplico filtro categorias: ", newFilters?.filters?.categoriaId, filterLibros)
            }
            if(typeof newFilters?.buscarPorTexto !== 'undefined'){
                filterLibros = filterLibros.filter((libro) => (new RegExp(newFilters?.buscarPorTexto || '', "i")).test(libro?.contenido +" "+libro?.titulo) );
                console.log("Se aplico filtro por texto: ",newFilters?.filters?.buscarPorTexto,filterLibros)
            }

            setLibros(filterLibros || []);
            setCurrentFilters(newFilters);
        }}
        currentFilters={currentFilters || {}}
        
        

    />;        
}
