import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import AppRouter from './components/AppRouter/AppRouter'
import NavigationBar from './components/NavigationBar/NavigationBar'
import SideBar from './components/SideBar/SideBar'
import CreateUpdateBookModal from './modals/CreateUpdateBookModal'
import { getToken } from './services/AuthService'

import './App.css'

const AppContent = () => {
  const [ sideBarOn, setSideBarOn ] = useState(false)
  const [ showCreateUpdateBookModal, setShowCreateUpdateBookModal ] = useState(false)

  const navigate = useNavigate()

  const onNavClickHandler = () => {
    setSideBarOn((pervState) => !pervState)
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
          display={getToken() != null}
          onSideMenuItemClick={() => setShowCreateUpdateBookModal(true)}
        />
      </div>
      <main className='App-main'>
        <SideBar display={sideBarOn} onSideMenuItemClick={() => setSideBarOn(false)} />
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
