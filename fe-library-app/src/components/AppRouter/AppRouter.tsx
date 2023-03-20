import { Navigate, Route, Routes } from 'react-router'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import PrivateRouter from './PrivateRouter'
import CreateUpdatePage from './pages/CreateUpdatePage'
import { getToken } from '../../services/AuthService'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/home" />} />
      <Route path='/home' element={<HomePage />} />
      <Route element={<PrivateRouter/>}>
        <Route path='/profile' element={<ProfilePage />}/>
        <Route path='/add_modify' >
          <Route index element={<CreateUpdatePage />} />
          <Route path=':id' element={<CreateUpdatePage />} />
        </Route>
      </Route>
      <Route path='/login' element={ getToken() == null ? <LoginPage /> : <Navigate to='/home'/>} />
    </Routes>
  )
}

export default AppRouter
