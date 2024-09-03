import { TEMPLATES } from '@/templates';
import { ITemplateElements } from '@/templates/interfaces';
import React from 'react';

interface TemplateContextProps{
    elements: ITemplateElements
}

// guardar el conjunto de elementos a utilizar dependiendo de la plantilla
export const templateContext = React.createContext<TemplateContextProps>({
    elements: TEMPLATES[import.meta.env.VITE_DEFAULT_TEMPLATE] // template1 sera la plantilla por defecto
});

/**
 * Se encarga de proveer los componentes o elementos dependiendo de la plantilla actual
 * @param template nombre de la plantilla 
 * @returns React.ReactElement
 */
export const TemplateProvider = ({template ,children}: {children: React.ReactElement, template:  keyof typeof TEMPLATES}) => {
    const elements = TEMPLATES[template];

    return <>
        <templateContext.Provider
            value={{elements}}
        >
                {children}
        </templateContext.Provider>
    </>
}