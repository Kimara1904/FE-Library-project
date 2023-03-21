import { Navigate, Route, Routes } from 'react-router'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import PrivateRouter from './PrivateRouter'
import CreateUpdatePage from './pages/CreateUpdatePage'
import { isThereToken } from '../../services/AuthService'
import BookDetail from '../BookDetail/BookDetail'

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
        <Route path='/book_detail/:id' element={<BookDetail />} />
      </Route>
      <Route path='/login' element={ !isThereToken() ? <LoginPage /> : <Navigate to='/home'/>} />
    </Routes>
  )
}

export default AppRouter
