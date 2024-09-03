import { seguridadRefrescarThunk } from '@/api/seguridad/refrescar/refrescar.thunk';
import { useTemplate } from '@/contexts/templateContext/useTemplate';
import { useAppDispatch } from '@/redux';
import { Suspense, useEffect, useState } from 'react';

export function RefrescarToken({children}: {children: React.ReactElement}){
  const [loadingRefreshToken, setLoadingRefreshToken] = useState<boolean>(true);
  const { elements } = useTemplate();
  const LoadingComponent = elements['LoadingPageComponent'];
  const MainLayoutElement = elements['MainLayout'];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(seguridadRefrescarThunk({}))
    .unwrap()
    .finally(() => setLoadingRefreshToken(false));
  },[]);

  if(loadingRefreshToken) return <LoadingComponent />;

  return <MainLayoutElement>
    <Suspense fallback={<LoadingComponent />}>
        {children}
    </Suspense>
  </MainLayoutElement>
}