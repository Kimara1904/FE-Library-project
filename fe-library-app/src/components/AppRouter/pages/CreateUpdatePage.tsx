import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { BookByIdItemResponse, getBookById } from '../../../services/BookService'
import CreateUpdateBookForm from '../../CreateUpdateForm/CreateUpdateBookForm'

const AddModifyPage = () => {
  const [ book, setBook ] = useState<BookByIdItemResponse>()
  const navigator = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      getBookById(id)
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
  }, [ id ])
  return (
    <div>
      <CreateUpdateBookForm onCreateOrModifySuccess={() => navigator('/home')} book={book}/>
    </div>
  )
}

export default AddModifyPage
