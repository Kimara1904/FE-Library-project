import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { AuthorBookByIdResponse, AuthorBookResponse, BookItemResponse, getBookById } from '../../../services/BookService'
import CreateUpdateBookForm from '../../CreateUpdateForm/CreateUpdateBookForm'

const AddModifyPage = () => {
  const [ book, setBook ] = useState<BookItemResponse>()
  const navigator = useNavigate()
  const { id } = useParams()

  const mapAuthors = (authors: AuthorBookByIdResponse[]): AuthorBookResponse[] => {
    const returnValue: AuthorBookResponse[] = []
    for (let index = 0; index < authors.length; index++) {
      returnValue.push({
        Id: authors[index].Id,
        FirstName: authors[index].Firstname,
        LastName: authors[index].Lastname
      })
    }
    return returnValue
  }

  useEffect(() => {
    getBookById(id as string).then((response) => {
      setBook({
        Id: response.data.Id,
        Title: response.data.Title,
        Description: response.data.Description,
        Isbn: response.data.ISBN,
        Cover: response.data.Cover,
        PublishDate: response.data.PublishDate,
        Authors: mapAuthors(response.data.Authors),
        Quantity: response.data.Quantity
      })
    }).catch(() => alert('Error with getting book'))
  }, [ id ])
  return (
    <div>
      <CreateUpdateBookForm onCreateOrModifySuccess={() => navigator('/home')} book={book}/>
    </div>
  )
}

export default AddModifyPage
