import { useState } from 'react'

import { BrowserRouter } from 'react-router-dom'

import './App.css'
import AppRouter from './components/AppRouter/AppRouter'
import NavigationBar from './components/NavigationBar/NavigationBar'
import SideBar from './components/SideBar/SideBar'
import CreateUpdateBookModal from './modals/CreateUpdateBookModal'
import { configureAxiosRequestInterceptors } from './services/ServiceConfig'

function App() {
  const [ sideBarOn, setSideBarOn ] = useState(false)
  const [ showCreateUpdateBookModal, setShowCreateUpdateBookModal ] = useState(false)

  const onNavClickHandler = () => {
    setSideBarOn((pervState) => !pervState)
  }

  configureAxiosRequestInterceptors()

  const handleAddModifyBook = () => {
    window.location.reload()
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <div className='App-sideBar'>
          <NavigationBar onNavClick={onNavClickHandler} />
          <SideBar display={sessionStorage.getItem('token') != null} onSideMenuItemClick={() => setShowCreateUpdateBookModal(true)}/>
        </div>
        <main className='App-main'>
          <SideBar display={sideBarOn} onSideMenuItemClick={() => setSideBarOn(false)}/>
          <AppRouter />
          {showCreateUpdateBookModal && <CreateUpdateBookModal onHideModal={() => setShowCreateUpdateBookModal(false)} onCreateOrModifySuccess={handleAddModifyBook}/>}
        </main>
        <footer className='App-footer'>
          <NavigationBar onNavClick={onNavClickHandler} />
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
