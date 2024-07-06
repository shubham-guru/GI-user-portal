import React, { Suspense } from 'react'
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { Routes, Route } from 'react-router-dom'
import { routes } from '../../domain/constants/routes';

const AppRoutes= () => {

  const MainLayoutPage = React.lazy(() => import("../pages/MainLayoutPage"));
  const AuthLayoutPage = React.lazy(() => import("../pages/AuthLayoutPage"));
  const Index = React.lazy(() => import("../pages/Index"));
  const Agreement = React.lazy(() => import("../components/Agreement"));
  const Dashboard = React.lazy(() => import("../components/Dashboard"));
  const Orders = React.lazy(() => import("../components/Orders"));
  const OrderDetails = React.lazy(() => import("../components/OrderDetails"));
  const Inventory = React.lazy(() => import("../components/Inventory"));
  const Kyc = React.lazy(() => import("../components/Kyc"));
  const Payments = React.lazy(() => import("../components/Payments"));
  const RateCalculator = React.lazy(() => import("../components/RateCalculator"));
  const HeavyCargo = React.lazy(() => import("../components/HeavyCargo"));

  const NoPage = React.lazy(() => import("../pages/NoPage"));

  return (
    <Routes>
      <Route path={routes.INDEX} element={<Suspense fallback=""><Index /></Suspense>} />
      <Route path={routes.LOGIN} element={<Suspense fallback=""><AuthLayoutPage children={<Login />} /></Suspense>} />
      <Route path={routes.SIGNUP} element={<Suspense fallback=""><AuthLayoutPage children={<SignUp />} /></Suspense>} />
      <Route path={routes.AGREEMENT} element={<Suspense fallback=""><MainLayoutPage children={<Agreement />} /></Suspense>} />
      <Route path={routes.DASHBOARD} element={<Suspense fallback=""><MainLayoutPage children={<Dashboard />} /></Suspense>} />
      <Route path={routes.ORDERS} element={<Suspense fallback=""><MainLayoutPage children={<Orders />} /></Suspense>} />
      <Route path={routes.ORDERS_ID} element={<Suspense fallback=""><MainLayoutPage children={<OrderDetails />} /></Suspense>} />
      <Route path={routes.INVENTORY} element={<Suspense fallback=""><MainLayoutPage children={<Inventory />} /></Suspense>} />
      <Route path={routes.KYC} element={<Suspense fallback=""><MainLayoutPage children={<Kyc />} /></Suspense>} />
      <Route path={routes.RATECALCULATOR} element={<Suspense fallback=""><MainLayoutPage children={<RateCalculator />} /></Suspense>} />
      <Route path={routes.PAYMENTS} element={<Suspense fallback=""><MainLayoutPage children={<Payments />} /></Suspense>} />
      <Route path={routes.HEAVYCARGO} element={<Suspense fallback=""><MainLayoutPage children={<HeavyCargo />} /></Suspense>} />
      <Route path={routes.NOPAGE} element={<Suspense fallback=""><NoPage /></Suspense>} />
    </Routes>
  )
}

export default AppRoutes