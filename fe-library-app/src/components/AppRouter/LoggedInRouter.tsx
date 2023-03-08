import { Navigate, Outlet } from 'react-router-dom'

const LoggedInRouter = () => {
  return sessionStorage.getItem('token') == null ? <Outlet /> : <Navigate to='/home' />
}

export default LoggedInRouter
