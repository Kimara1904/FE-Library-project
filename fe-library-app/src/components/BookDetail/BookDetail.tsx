import { useCallback, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import CreateUpdateBookModal from '../../modals/CreateUpdateBookModal'
import { BookByIdItemResponse, deleteBook, getBookById } from '../../services/BookService'
import DefaultBookCover from '../BookList/BookCard/DefaultBookCover.png'
import style from './BookDetail.module.css'

const BookDetail = () => {
  const { id } = useParams()
  const [ book, setBook ] = useState<BookByIdItemResponse>()
  const navigate = useNavigate()
  const [ showUpdateBookModal, setShowUpdateBookModal ] = useState(false)

  const getBookInfo = useCallback((id: string) => {
    getBookById(id.toString())
      .then((response) => {
        setBook(response.data)
      })
      .catch(() => {
        alert('Error with getting book details')
      })
  }, [])

  useEffect(() => {
    getBookInfo(id as string)
  }, [ getBookInfo, id ])

  const handleModifyBookClick = () => {
    navigate(`/add_modify/${id as string}`)
  }

  const handleBookDelete = () => {
    if (confirm('Are you sure that you want to delete this book?')) {
      deleteBook(id as string)
        .then(() => {
          alert('You successfully delete book ' + (book?.Title as string))
          navigate('/home')
        })
        .catch(() => {
          alert('Something went wrong with deleting book')
        })
    }
  }

  return (
    <div className={style.book_details_rent_history}>
      <h1>Book Detail:</h1>
      <div className={style.book_details}>
        <img
          src={
            book?.Cover !== '' && book?.Cover != null
              ? 'data:image/png;base64,' + book?.Cover
              : DefaultBookCover
          }
          alt='Book cover'
        />
        <div>
          <table>
            <tbody>
              <tr>
                <th>Title</th>
                <td>{book?.Title}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{book?.Description}</td>
              </tr>
              <tr>
                <th>Isbn</th>
                <td>{book?.ISBN}</td>
              </tr>
              <tr>
                <th>Quantity</th>
                <td>{book?.Quantity}</td>
              </tr>
              <tr>
                <th>Available</th>
                <td>{book?.Available}</td>
              </tr>
              <tr>
                <th>Publish date</th>
                <td>
                  {book?.PublishDate != null ? new Date(book?.PublishDate).toDateString() : ''}
                </td>
              </tr>
              <tr>
                <th className={style.book_details_author_th}rowSpan={book?.Authors.length !== 0 ? book?.Authors.length : 1}>Authors</th>
                {book?.Authors.length === 0 ? (
                  <td />
                ) : (
                  <td>
                    {(book?.Authors[0].Firstname as string) +
                      ' ' +
                      (book?.Authors[0].Lastname as string)}
                  </td>
                )}
              </tr>
              {(book?.Authors.length as number) > 0 && (
                <>
                  {book?.Authors.slice(1).map((author) => (
                    <tr key={author.Id}>
                      <td>
                        {author.Firstname} {author.Lastname}
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
          {showUpdateBookModal && (
            <CreateUpdateBookModal
              onCreateOrModifySuccess={() => getBookInfo(id as string)}
              onHideModal={() => setShowUpdateBookModal(false)}
              id={parseInt(id as string)}
            />
          )}
          <div className={style.book_details_buttons}>
            <button className={style.book_modify_phone} onClick={handleModifyBookClick}>
              Modify
            </button>
            <button className={style.book_modify_desktop} onClick={() => setShowUpdateBookModal(true)}>
              Modify
            </button>
            <button onClick={handleBookDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetail
