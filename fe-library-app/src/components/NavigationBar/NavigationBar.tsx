import { Link } from 'react-router-dom'

import styles from './NavigationBar.module.css'

const NavigationBar = (props: {onNavClick: () => void}) => (
  <nav className={styles.nav}>
    <ul>
      <li>
        <Link to='/home'>Home</Link>
      </li>
      <li>
        <Link to='/profile'>Profile</Link>
      </li>
      <li>
        <button onClick={props.onNavClick}>More</button>
      </li>
    </ul>
  </nav>
)

export default NavigationBar