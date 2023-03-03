import { Link } from 'react-router-dom'

import styles from './NavigationBar.module.css'

const NavigationBar = () => (
  <nav className={styles.nav}>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/profile'>Profile</Link>
      </li>
    </ul>
  </nav>
)

export default NavigationBar
