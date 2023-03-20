import ReactDOM from 'react-dom'

import CreateUpdateBookForm from '../components/CreateUpdateForm/CreateUpdateBookForm'
import { BookItemResponse } from '../services/BookService'
import BackDrop from './BackDrop'
import ModalOverlay from './ModalOverlay'

interface CreateUpdateBookModalProps{
    book?: BookItemResponse
    onHideModal: () => void,
    onCreateOrModifySuccess:() => void
}

const CreateUpdateBookModal = (props: CreateUpdateBookModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onHideModal={props.onHideModal} />,
        document.getElementById('backdrop-root') as Element
      )}
      {ReactDOM.createPortal(
        <ModalOverlay component={<CreateUpdateBookForm onCreateOrModifySuccess={props.onCreateOrModifySuccess} book={props.book} onHideModal={props.onHideModal}/>} />,
        document.getElementById('overlay-root') as Element
      )}
    </>
  )
}

export default CreateUpdateBookModal
