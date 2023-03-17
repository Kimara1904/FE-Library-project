import { Link } from 'react-router-dom'

import styles from './SideBar.module.css'

interface SideBarProps {
  display: boolean,
  afterChoosing: () => void
}

const SideBar = (props: SideBarProps) => {
  return (
    <nav className={props.display === true ? styles.sideBar : styles.sideBarHidden}>
      <Link to='/add_modify' onClick={props.afterChoosing}>Add new Book</Link>
      <button onClick={props.afterChoosing}>Add new Book</button>
    </nav>
  )
}

export default SideBar
