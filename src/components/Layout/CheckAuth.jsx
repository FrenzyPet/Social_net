import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const CheckAuth = () => {
  const isAuth = useSelector(state => state.auth.isAuth)
  if (!isAuth) return <Navigate to="/login"/>
  
  return (
    <Outlet/>
  );
}
 
export default CheckAuth;