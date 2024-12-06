import { ReactElement, useEffect } from 'react';
import { api } from '@/api';
import { useAppDispatch } from '@/redux';
import { localStorageServices } from '@/services';



/**
 * Funcion para renderizar el componente SuperSet
 */
export function SupersetEmbed({iframeUrl, style }): ReactElement{
  const dispatch = useAppDispatch();

  //actualizamos la tabla que contiene el id_actual
  useEffect(() => {

    //le pasamos el id alojado en el localStorage
      const user = localStorageServices.get('user');
      const userParse = JSON.parse(user || '');

      dispatch(api.superset.IdActualCrearApiThunk({
        usuarioId: parseInt(userParse.userId)
      }))
  },[dispatch]);

  //render del superset
  return<>
      <iframe
        style={style}
        width="95%"
        src={iframeUrl}>
      </iframe>
  </>
}