import styles from './ModalOverlay.module.css'

interface ModalOverlayProps {
  component: JSX.Element
}

const ModalOverlay = (props: ModalOverlayProps) => {
  return <div className={styles.modal}>{props.component}</div>
}

export default ModalOverlay
