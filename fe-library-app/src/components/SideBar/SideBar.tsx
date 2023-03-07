import styles from './SideBar.module.css'

interface SideBarProps {
  display: boolean
}

const SideBar = (props: SideBarProps) => {
  return (
    <nav className={props.display === true ? styles.sideBar : styles.sideBarHidden}>
      <span>Admins functions</span>
    </nav>
  )
}

export default SideBar
