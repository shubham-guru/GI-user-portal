import React, { Suspense } from 'react'
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { Routes, Route } from 'react-router-dom'
import { routes } from '../../domain/constants/routes';
import Loader from '../hocs/Loader/Loader';

const AppRoutes= () => {

  const MainLayoutPage = React.lazy(() => import("../pages/MainLayoutPage"));
  const AuthLayoutPage = React.lazy(() => import("../pages/AuthLayoutPage"));
  const Index = React.lazy(() => import("../pages/Index"));
  const PrivacyPolicy = React.lazy(() => import("../pages/PrivacyPolicy"));
  const Agreement = React.lazy(() => import("../components/Agreement"));
  const Dashboard = React.lazy(() => import("../components/Dashboard"));
  const Orders = React.lazy(() => import("../components/Orders"));
  const OrderDetails = React.lazy(() => import("../components/OrderDetails"));
  const Inventory = React.lazy(() => import("../components/Inventory"));
  const AccountDetails = React.lazy(() => import("../components/AccountDetails"));
  const Payments = React.lazy(() => import("../components/Payments"));
  const RateCalculator = React.lazy(() => import("../components/RateCalculator"));
  const HeavyCargo = React.lazy(() => import("../components/HeavyCargo"));

  const NoPage = React.lazy(() => import("../pages/NoPage"));

  return (
    <Routes>
      <Route path={routes.INDEX} element={<Suspense fallback={<Loader />}><Index /></Suspense>} />
      <Route path={routes.PRIVACY_POLICY} element={<Suspense fallback={<Loader />}><PrivacyPolicy /></Suspense>} />
      <Route path={routes.LOGIN} element={<Suspense fallback={<Loader />}><AuthLayoutPage children={<Login />} /></Suspense>} />
      <Route path={routes.SIGNUP} element={<Suspense fallback={<Loader />}><AuthLayoutPage children={<SignUp />} /></Suspense>} />
      <Route path={routes.DASHBOARD} element={<Suspense fallback={<Loader />}><MainLayoutPage children={<Dashboard />} /></Suspense>} />
      <Route path={routes.AGREEMENT} element={<Suspense fallback={<Loader />}><MainLayoutPage children={<Agreement />} /></Suspense>} />
      <Route path={routes.ORDERS} element={<Suspense fallback={<Loader />}><MainLayoutPage children={<Orders />} /></Suspense>} />
      <Route path={routes.ORDERS_ID} element={<Suspense fallback={<Loader />}><MainLayoutPage children={<OrderDetails />} /></Suspense>} />
      <Route path={routes.INVENTORY} element={<Suspense fallback={<Loader />}><MainLayoutPage children={<Inventory />} /></Suspense>} />
      <Route path={routes.ACCOUNT_DETAILS} element={<Suspense fallback={<Loader />}><MainLayoutPage children={<AccountDetails />} /></Suspense>} />
      <Route path={routes.RATECALCULATOR} element={<Suspense fallback={<Loader />}><MainLayoutPage children={<RateCalculator />} /></Suspense>} />
      <Route path={routes.PAYMENTS} element={<Suspense fallback={<Loader />}><MainLayoutPage children={<Payments />} /></Suspense>} />
      <Route path={routes.HEAVYCARGO} element={<Suspense fallback={<Loader />}><MainLayoutPage children={<HeavyCargo />} /></Suspense>} />
      <Route path={routes.NOPAGE} element={<Suspense fallback={<Loader />}><NoPage /></Suspense>} />
    </Routes>
  )
}

export default AppRoutes