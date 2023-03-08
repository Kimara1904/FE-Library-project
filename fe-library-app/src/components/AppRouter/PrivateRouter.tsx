import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = () => {
  return sessionStorage.getItem('token') != null ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRouter
