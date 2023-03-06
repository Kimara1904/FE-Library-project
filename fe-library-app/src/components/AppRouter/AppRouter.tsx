import { Route, Routes } from 'react-router'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='profile' element={<ProfilePage />} />
    </Routes>
  )
}

export default AppRouter
