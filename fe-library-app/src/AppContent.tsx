import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import AppRouter from './components/AppRouter/AppRouter'
import NavigationBar from './components/NavigationBar/NavigationBar'
import SideBar from './components/SideBar/SideBar'
import CreateUpdateBookModal from './modals/CreateUpdateBookModal'
import { isUserLoggedIn } from './services/AuthService'
import './App.css'
import { isAdmin, isLibrarian } from './jwt/JwtRoleChecker'

const AppContent = () => {
  const [ sideBarOpen, setSideBarOpen ] = useState(false)
  const [ showCreateUpdateBookModal, setShowCreateUpdateBookModal ] = useState(false)

  const navigate = useNavigate()

  const onNavClickHandler = () => {
    setSideBarOpen((pervState) => !pervState)
  }

  const handleCreateUpdateBook = () => {
    setShowCreateUpdateBookModal(false)
    navigate('/home')
  }
  return (
    <div className='App'>
      <div className='App-sideBar'>
        <NavigationBar onNavClick={onNavClickHandler} />
        <SideBar
          display={isUserLoggedIn() && (isAdmin() || isLibrarian())}
          onSideMenuItemClick={() => setShowCreateUpdateBookModal(true)}
        />
      </div>
      <main className='App-main'>
        <SideBar display={sideBarOpen} onSideMenuItemClick={() => setSideBarOpen(false)} />
        <AppRouter />
        {showCreateUpdateBookModal && (
          <CreateUpdateBookModal
            onHideModal={() => setShowCreateUpdateBookModal(false)}
            onCreateOrModifySuccess={handleCreateUpdateBook}
          />
        )}
      </main>
      <footer className='App-footer'>
        <NavigationBar onNavClick={onNavClickHandler} />
      </footer>
    </div>
  )
}

export default AppContent
