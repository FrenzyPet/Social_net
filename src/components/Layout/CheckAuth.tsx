import { FC } from 'react';
import * as React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useTypedSelector } from '../../hooks/typedHooks'

const CheckAuth: FC = () => {
  const isAuth = useTypedSelector(state => state.auth.isAuth)
  if (!isAuth) return <Navigate to="/login"/>
  
  return (
    <Outlet/>
  );
}
 
export default CheckAuth;