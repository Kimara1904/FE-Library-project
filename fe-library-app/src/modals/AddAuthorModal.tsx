import ReactDOM from 'react-dom'

import AddAuthor from '../components/AddAuthor/AddAuthor'
import BackDrop from './BackDrop'
import ModalOverlay from './ModalOverlay'

interface AddAuthorModalProps {
    onHide: () => void
    onFinish:() => void
}

const AddAuthorModal = (props: AddAuthorModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onHide={props.onHide}/>, document.getElementById('backdrop-root') as Element)}
      {ReactDOM.createPortal(<ModalOverlay component={<AddAuthor onFinish={props.onFinish} onHide={props.onHide}/>} />, document.getElementById('overlay-root') as Element)}
    </>
  )
}

export default AddAuthorModal
