import { Navigate, Outlet } from 'react-router-dom'

import { getToken } from '../../services/AuthService'

const PrivateRouter = () => {
  return getToken != null ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRouter
