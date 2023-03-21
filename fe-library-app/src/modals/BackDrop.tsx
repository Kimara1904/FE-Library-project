import styles from './BackDrop.module.css'

interface BackDropProps {
  onHideModal: () => void
}

const BackDrop = (props: BackDropProps) => {
  return <div className={styles.backdrop} onClick={props.onHideModal}/>
}

export default BackDrop
