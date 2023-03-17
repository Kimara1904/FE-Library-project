import ReactDOM from 'react-dom'

import AddModifyBookForm from '../components/AddModifyForm/AddModifyBookForm'
import BackDrop from './BackDrop'
import ModalOverlay from './ModalOverlay'

interface AddModifyBookModalProps{
    onHide: () => void,
    onFinish:() => void
}

const AddModifyBookModal = (props: AddModifyBookModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onHide={props.onHide} />,
        document.getElementById('backdrop-root') as Element
      )}
      {ReactDOM.createPortal(
        <ModalOverlay component={<AddModifyBookForm onFinish={props.onFinish}/>} />,
        document.getElementById('overlay-root') as Element
      )}
    </>
  )
}

export default AddModifyBookModal
