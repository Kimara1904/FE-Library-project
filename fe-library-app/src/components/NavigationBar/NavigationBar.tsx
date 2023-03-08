import { Link, useNavigate } from 'react-router-dom'

import styles from './NavigationBar.module.css'

interface NavigationBarProps {
  onNavClick: () => void
}

const NavigationBar = (props: NavigationBarProps) => {
  const nav = useNavigate()

  const loginClickHandler = () => {
    nav('/login')
  }
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        {sessionStorage.getItem('token') != null && (
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        )}
        {sessionStorage.getItem('token') != null && (
          <li className={styles.special}>
            <button onClick={props.onNavClick}>More</button>
          </li>
        )}
        {sessionStorage.getItem('token') == null && (
          <button className={styles.login_button} onClick={loginClickHandler}>
            Login
          </button>
        )}
      </ul>
    </nav>
  )
}

export default NavigationBar
