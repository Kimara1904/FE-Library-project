import { Navigate, Outlet } from 'react-router-dom'

import { isThereToken } from '../../services/AuthService'

const PrivateRouter = () => {
  return isThereToken() ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRouter
