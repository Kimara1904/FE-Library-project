import { useState } from 'react'

import { BrowserRouter } from 'react-router-dom'

import './App.css'
import AppRouter from './components/AppRouter/AppRouter'
import NavigationBar from './components/NavigationBar/NavigationBar'
import SideBar from './components/SideBar/SideBar'

function App() {
  const [ sideBarOn, setSideBarOn ] = useState(false)

  const onNavClickHandler = () => {
    setSideBarOn((pervState) => !pervState)
  }
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='App-sideBar'>
          <NavigationBar onNavClick={onNavClickHandler} />
          <SideBar display={true} />
        </div>
        <main className='App-main'>
          <SideBar display={sideBarOn} />
          <AppRouter />
        </main>
        <footer className='App-footer'>
          <NavigationBar onNavClick={onNavClickHandler} />
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
