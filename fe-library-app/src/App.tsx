import { BrowserRouter } from 'react-router-dom'

import AppContent from './AppContent'
import { configureAxiosRequestInterceptors } from './services/ServiceConfig'

function App() {
  configureAxiosRequestInterceptors()

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
