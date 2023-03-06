import styles from './SideBar.module.css'

const SideBar = (props: { display: boolean }) => {
  const style = props.display === true ? styles.sideBar : styles.sideBarHidden
  return (
    <nav className={style}>
      <span>Admins functions</span>
    </nav>
  )
}

export default SideBar
