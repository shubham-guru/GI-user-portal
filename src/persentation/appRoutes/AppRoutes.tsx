import React, { Suspense } from 'react'
import Index from '../pages/Index';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { Routes, Route } from 'react-router-dom'
import { routes } from '../../domain/constants/routes';

const AppRoutes= () => {

  const MainLayoutPage = React.lazy(() => import("../pages/MainLayoutPage"));
  const AuthLayoutPage = React.lazy(() => import("../pages/AuthLayoutPage"));
  const NoPage = React.lazy(() => import("../pages/NoPage"));

  return (
    <Routes>
      <Route path={routes.INDEX} element={<Suspense fallback=""><MainLayoutPage children={<Index />} /></Suspense>} />
      <Route path={routes.LOGIN} element={<Suspense fallback=""><AuthLayoutPage children={<Login />} /></Suspense>} />
      <Route path={routes.SIGNUP} element={<Suspense fallback=""><AuthLayoutPage children={<SignUp />} /></Suspense>} />
      <Route path={routes.NOPAGE} element={<Suspense fallback=""><NoPage /></Suspense>} />
    </Routes>
  )
}

export default AppRoutes