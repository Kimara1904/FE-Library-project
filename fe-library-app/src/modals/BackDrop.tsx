import styles from './BackDrop.module.css'

interface BackDropProps {
  onHideModal: () => void
}

const BackDrop = (props: BackDropProps) => {
  return (
    <div
      className={styles.backdrop}
      onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation()
        props.onHideModal()
      }}
    />
  )
}

export default BackDrop
