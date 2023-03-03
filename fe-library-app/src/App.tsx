import { BrowserRouter } from 'react-router-dom'

import './App.css'
import AppRouter from './components/AppRouter/AppRouter'
import NavigationBar from './components/NavigationBar/NavigationBar'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <main className='App-main'>
          <AppRouter />
        </main>
        <header className='App-header'>
          <NavigationBar />
        </header>
      </div>
    </BrowserRouter>
  )
}

export default App
