import ReactDOM from 'react-dom'

import CreateAuthor from '../components/CreateAuthor/CreateAuthor'
import BackDrop from './BackDrop'
import ModalOverlay from './ModalOverlay'

interface CreateAuthorModalProps {
    onHideModal: () => void
    onCreateAuthorSuccess:() => void
}

const CreateAuthorModal = (props: CreateAuthorModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onHideModal={props.onHideModal}/>, document.getElementById('backdrop-root') as Element)}
      {ReactDOM.createPortal(<ModalOverlay component={<CreateAuthor onCreateAuthorSuccess={props.onCreateAuthorSuccess} onHideModal={props.onHideModal}/>} />, document.getElementById('overlay-root') as Element)}
    </>
  )
}

export default CreateAuthorModal
