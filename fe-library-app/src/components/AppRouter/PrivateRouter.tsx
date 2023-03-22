import { Navigate, Outlet } from 'react-router-dom'

import { isUserLoggedIn } from '../../services/AuthService'

const PrivateRouter = () => {
  return isUserLoggedIn() ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRouter
