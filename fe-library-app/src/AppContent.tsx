import AppRouter from './components/AppRouter/AppRouter'
import NavigationBar from './components/NavigationBar/NavigationBar'
import './App.css'

const AppContent = () => {
  return (
    <div className='App'>
      <div className='App-sideBar'>
        <NavigationBar />
      </div>
      <main className='App-main'>
        <AppRouter />
      </main>
      <footer className='App-footer'>
        <NavigationBar />
      </footer>
    </div>
  )
}

export default AppContent
