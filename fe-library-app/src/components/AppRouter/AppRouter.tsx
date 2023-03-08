import { Navigate, Route, Routes } from 'react-router'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import PrivateRouter from './PrivateRouter'
import LoggedInRouter from './LoggedInRouter'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/home" />} />
      <Route path='/home' element={<HomePage />} />
      <Route element={<PrivateRouter/>}>
        <Route path='profile' element={<ProfilePage />}/>
      </Route>
      <Route element={<LoggedInRouter/>}>
        <Route path='/login' element={<LoginPage />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
