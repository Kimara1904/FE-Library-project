import { Link, useNavigate } from 'react-router-dom'

import { isThereToken } from '../../services/AuthService'
import styles from './NavigationBar.module.css'

interface NavigationBarProps {
  onNavClick: () => void
}

const NavigationBar = (props: NavigationBarProps) => {
  const nav = useNavigate()

  const loggedIn = isThereToken()

  const handleLoginClick= () => {
    nav('/login')
  }
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        {loggedIn && (
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        )}
        {loggedIn && (
          <li className={styles.special}>
            <button onClick={props.onNavClick}>More</button>
          </li>
        )}
        {!loggedIn && (
          <button className={styles.login_button} onClick={handleLoginClick}>
            Login
          </button>
        )}
      </ul>
    </nav>
  )
}

export default NavigationBar
