import { Link, useNavigate } from 'react-router-dom'

import { isAdmin, isLibrarian } from '../../jwt/JwtRoleChecker'
import { isUserLoggedIn } from '../../services/AuthService'
import styles from './NavigationBar.module.css'

interface NavigationBarProps {
  onNavClick: () => void
}

const NavigationBar = (props: NavigationBarProps) => {
  const nav = useNavigate()

  const isAdminOrLibrarian = isAdmin() || isLibrarian()

  const handleLoginClick= () => {
    nav('/login')
  }
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        {isUserLoggedIn() && (
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        )}
        {(isUserLoggedIn() && isAdminOrLibrarian) && (
          <li className={styles.special}>
            <button onClick={props.onNavClick}>More</button>
          </li>
        )}
        {!isUserLoggedIn() && (
          <button className={styles.login_button} onClick={handleLoginClick}>
            Login
          </button>
        )}
      </ul>
    </nav>
  )
}

export default NavigationBar
