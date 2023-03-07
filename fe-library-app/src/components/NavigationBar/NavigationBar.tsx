import { Link } from 'react-router-dom'

import styles from './NavigationBar.module.css'

interface NavigationBarProps {
  onNavClick: () => void
}

const NavigationBar = (props: NavigationBarProps) => (
  <nav className={styles.nav}>
    <ul>
      <li>
        <Link to='/home'>Home</Link>
      </li>
      <li>
        <Link to='/profile'>Profile</Link>
      </li>
      <li className={styles.special}>
        <button onClick={props.onNavClick}>More</button>
      </li>
    </ul>
  </nav>
)

export default NavigationBar
