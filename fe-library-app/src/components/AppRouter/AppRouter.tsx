import { Route, Routes } from 'react-router'

import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/home' element={<HomePage />} />
      <Route path='profile' element={<ProfilePage />} />
    </Routes>
  )
}

export default AppRouter
