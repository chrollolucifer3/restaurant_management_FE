import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Employee from '../pages/Employee';
import About from '../pages/About';
import Unit from 'pages/Unit';
import Category from 'pages/Category';
import Customer from 'pages/Customer';
import Discount from 'pages/Discount';
import Menu from 'pages/Menu';
import UpdatePassword from 'pages/Auth/UpdatePassword';
import Table from 'pages/Table';
import Payment from 'pages/Payment';
import Bill from 'pages/Bill';

import { rootLoader } from "./rootLoader";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login/>,
    loader: ({request}) => rootLoader(
      {request},false, 'LOAD_AUTH_PAGE'
    )
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword/>,
    loader: ({request}) => rootLoader(
      {request}, false, 'LOAD_AUTH_PAGE'
    )
  },
  {
    path: 'profile',
    element: <Profile/>,
    loader: ({request}) => rootLoader(
      {request},true, 'LOAD_PROFILE_PAGE'
    )
  },
  {
    path: '',
    element: <Home/>,
    loader: ({request}) => rootLoader(
      {request}, true, 'LOAD_HOME_PAGE'
    )
  },
  {
    path: '/about',
    element: <About/>,
    loader: ({request}) => rootLoader(
      {request}, true, 'LOAD_ABOUT_PAGE'
    ),
    children: [
      {
        path: ":id",
        element: <About/>,
        loader: ({request}) => rootLoader(
          {request}, true, 'LOAD_ABOUT_PAGE'
        ),
      },
    ],
  },
  {
    path: '/employee',
    element: <Employee/>,
    loader: ({request}) => rootLoader(
      {request},true, 'LOAD_EMPLOYEE_PAGE'
    )
  },
  {
    path: '/unit',
    element: <Unit/>,
    loader: ({request}) => rootLoader(
      {request},true, 'LOAD_UNIT_PAGE'
    )
  },
  {
    path: '/category',
    element: <Category/>,
    loader: ({request}) => rootLoader(
      {request},true, 'LOAD_CATEGORY_PAGE'
    )
  },
  {
    path: '/customer',
    element: <Customer/>,
    loader: ({request}) => rootLoader(
      {request},true, 'LOAD_CUSTOMER_PAGE'
    )
  },
  {
    path: '/discount',
    element: <Discount/>,
    loader: ({request}) => rootLoader(
      {request},true, 'LOAD_DISCOUNT_PAGE'
    )
  },
  {
    path : '/menu',
    element : <Menu/>,
    loader : ({request}) => rootLoader(
      {request},true, 'LOAD_MENU_PAGE'
    )
  },
  {
    path: '/resetPassword/:token',
    element: <UpdatePassword/>,
    loader: ({request}) => rootLoader(
      {request}, true, 'LOAD_AUTH_PAGE'
    )
  },
  {
    path: '/table',
    element: <Table/>,
    loader: ({request}) => rootLoader(
      {request}, true, 'LOAD_TABLE_PAGE'
    )
  },
  {
    path: '/payment',
    element: <Payment/>,
    loader: ({request}) => rootLoader(
      {request}, true, 'LOAD_PAYMENT_PAGE'
    )
  },
  {
    path: '/bill',
    element: <Bill/>,
    loader: ({request}) => rootLoader(
      {request}, true, 'LOAD_BILL_PAGE'
    )
  }
]);

export default router;
