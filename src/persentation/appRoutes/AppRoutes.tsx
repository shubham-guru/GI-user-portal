import React, { Suspense } from 'react'
import Index from '../pages/Index';
import { Routes, Route } from 'react-router-dom'
import { routes } from '../../domain/constants/routes';

const AppRoutes= () => {

  const MainLayoutPage = React.lazy(() => import("../pages/MainLayoutPage"));
  const NoPage = React.lazy(() => import("../pages/NoPage"));

  return (
    <Routes>
      <Route path={routes.INDEX} element={<Suspense fallback=""><MainLayoutPage children={<Index />} /></Suspense>} />
      <Route path={routes.NOPAGE} element={<Suspense fallback=""><NoPage /></Suspense>} />
    </Routes>
  )
}

export default AppRoutes