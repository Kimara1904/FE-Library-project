import styles from './BackDrop.module.css'

interface BackDropProps {
    onHide: () => void
}

const BackDrop = (props: BackDropProps) => {
  return <div className={styles.backdrop} onClick={props.onHide}/>
}

export default BackDrop
