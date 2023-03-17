import { useState } from 'react'

import { BrowserRouter } from 'react-router-dom'

import './App.css'
import AppRouter from './components/AppRouter/AppRouter'
import NavigationBar from './components/NavigationBar/NavigationBar'
import SideBar from './components/SideBar/SideBar'
import AddModifyBookModal from './modals/AddModifyBookModal'
import { configureAxiosRequestInterceptors } from './services/ServiceConfig'

function App() {
  const [ sideBarOn, setSideBarOn ] = useState(false)
  const [ addModifyBookModalOn, setAddModifyBookModalOn ] = useState(false)

  const onNavClickHandler = () => {
    setSideBarOn((pervState) => !pervState)
  }

  configureAxiosRequestInterceptors()

  const handleModalFinish = () => {
    window.location.reload()
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <div className='App-sideBar'>
          <NavigationBar onNavClick={onNavClickHandler} />
          <SideBar display={sessionStorage.getItem('token') != null} afterChoosingHandle={() => setAddModifyBookModalOn(true)}/>
        </div>
        <main className='App-main'>
          <SideBar display={sideBarOn} afterChoosingHandle={() => setSideBarOn(false)}/>
          <AppRouter />
          {addModifyBookModalOn && <AddModifyBookModal onHide={() => setAddModifyBookModalOn(false)} onFinish={handleModalFinish}/>}
        </main>
        <footer className='App-footer'>
          <NavigationBar onNavClick={onNavClickHandler} />
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
