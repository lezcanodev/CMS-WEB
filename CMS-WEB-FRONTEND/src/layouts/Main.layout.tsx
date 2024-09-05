import { useTemplate } from '@/contexts/templateContext/useTemplate';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

export function MainLayout(){
  const { elements } = useTemplate();
  const LoadingComponent = elements['LoadingPageComponent'];
  const MainLayoutElement = elements['MainLayout'];

  return <MainLayoutElement>
    <Suspense fallback={<LoadingComponent />}>
        <Outlet />
    </Suspense>
  </MainLayoutElement>
}