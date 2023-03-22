import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { isAdmin, isLibrarian } from '../../jwt/JwtRoleChecker'
import CreateUpdateBookModal from '../../modals/CreateUpdateBookModal'
import { isUserLoggedIn } from '../../services/AuthService'
import styles from './NavigationBar.module.css'


const NavigationBar = () => {
  const [ showCreateUpdateBookModal, setShowCreateUpdateBookModal ] = useState(false)
  const navigate = useNavigate()

  const isAdminOrLibrarian = isAdmin() || isLibrarian()

  const handleLoginClick= () => {
    navigate('/login')
  }

  const handleCreateUpdateBook = () => {
    setShowCreateUpdateBookModal(false)
    navigate('/home')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')
    navigate('/login')
  }

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        {isUserLoggedIn() && isAdminOrLibrarian&& (
          <li>
            <Link className={styles.add_book_phone} to='/add_modify'>Add new Book</Link>
            <button className={styles.add_book_desktop} onClick={() => setShowCreateUpdateBookModal(true)}>Add new Book</button>
          </li>
        )}
        {isUserLoggedIn() && (
          <li className={styles.special}>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
        {!isUserLoggedIn() && (
          <button className={styles.login_button} onClick={handleLoginClick}>
            Login
          </button>
        )}
      </ul>
      {showCreateUpdateBookModal && (
        <CreateUpdateBookModal
          onHideModal={() => setShowCreateUpdateBookModal(false)}
          onCreateOrModifySuccess={handleCreateUpdateBook}
        />
      )}
    </nav>
  )
}

export default NavigationBar
