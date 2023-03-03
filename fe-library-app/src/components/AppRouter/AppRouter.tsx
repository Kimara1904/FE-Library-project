import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='profile' element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
