import { useEffect, useState } from 'react'

import ReactDOM from 'react-dom'

import CreateUpdateBookForm from '../components/CreateUpdateForm/CreateUpdateBookForm'
import { BookByIdItemResponse, getBookById } from '../services/BookService'
import BackDrop from './BackDrop'
import ModalOverlay from './ModalOverlay'

interface CreateUpdateBookModalProps {
  id?: number
  onHideModal: () => void
  onCreateOrModifySuccess: () => void
}

const CreateUpdateBookModal = (props: CreateUpdateBookModalProps) => {
  const [ book, setBook ] = useState<BookByIdItemResponse>()
  useEffect(() => {
    if (props.id) {
      getBookById(props.id?.toString())
        .then((response) => {
          setBook({
            Id: response.data.Id,
            Title: response.data.Title,
            Description: response.data.Description,
            ISBN: response.data.ISBN,
            Cover: response.data.Cover,
            PublishDate: response.data.PublishDate,
            Authors: response.data.Authors,
            Quantity: response.data.Quantity
          })
        })
        .catch(() => alert('Error with getting book'))
    }
  }, [ props.id ])
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onHideModal={props.onHideModal} />,
        document.getElementById('backdrop-root') as Element
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          component={
            <CreateUpdateBookForm
              onCreateOrModifySuccess={props.onCreateOrModifySuccess}
              book={book}
              onHideModal={props.onHideModal}
            />
          }
        />,
        document.getElementById('overlay-root') as Element
      )}
    </>
  )
}

export default CreateUpdateBookModal
