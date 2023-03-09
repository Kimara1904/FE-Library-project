import { Navigate, Route, Routes } from 'react-router'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import PrivateRouter from './PrivateRouter'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/home" />} />
      <Route path='/home' element={<HomePage />} />
      <Route element={<PrivateRouter/>}>
        <Route path='profile' element={<ProfilePage />}/>
      </Route>
      <Route path='/login' element={sessionStorage.getItem('token') == null ? <LoginPage /> : <Navigate to='/home'/>} />
    </Routes>
  )
}

export default AppRouter
