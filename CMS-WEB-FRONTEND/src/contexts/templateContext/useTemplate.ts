import { useContext } from 'react'
import { templateContext } from '.'



export const useTemplate = () => {
    const {elements} = useContext(templateContext);
    return {elements};
}