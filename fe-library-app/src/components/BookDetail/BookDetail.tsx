import { useCallback, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { isAdmin, isLibrarian } from '../../jwt/JwtRoleChecker'
import CreateUpdateBookModal from '../../modals/CreateUpdateBookModal'
import { isUserLoggedIn } from '../../services/AuthService'
import { BookByIdItemResponse, deleteBook, getBookById } from '../../services/BookService'
import { getRentalHistory, rentBook, RentHistoryResponse, returnBook } from '../../services/RentalService'
import DefaultBookCover from '../BookList/BookCard/DefaultBookCover.png'
import style from './BookDetail.module.css'

const BookDetail = () => {
  const { id } = useParams()
  const [ book, setBook ] = useState<BookByIdItemResponse>()
  const [ rentalHistory, setRentalHistory ] = useState<RentHistoryResponse[]>([])
  const navigate = useNavigate()
  const [ showUpdateBookModal, setShowUpdateBookModal ] = useState(false)
  const isAdminOrLibrarian = isAdmin() || isLibrarian()

  const getBookInfo = useCallback((id: string) => {
    getBookById(id.toString())
      .then((response) => {
        setBook(response.data)
      })
      .catch(() => {
        alert('Error with getting book details')
      })
  }, [])

  const getRentalHistoryForBook = useCallback((id: string) => {
    getRentalHistory(id)
      .then((response) => {
        setRentalHistory(response.data)
      })
      .catch(() => {
        alert('Error with getting rental history')
      })
  }, [])

  useEffect(() => {
    getBookInfo(id as string)
  }, [ getBookInfo, id ])

  useEffect(() => {
    getRentalHistoryForBook(id as string)
  }, [ getRentalHistoryForBook, id ])

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

  const handleBookReturn = (rentId: number) => {
    returnBook(rentId.toString())
      .then(() => {
        alert('Book is returned successfully')
        getRentalHistoryForBook(id as string)
        setBook((prevState) => {
          if (prevState) {
            return {
              ...prevState,
              Available: prevState && prevState.Available + 1
            }
          }
        })
      })
      .catch(() => {
        alert('Error with returning book')
      })
  }

  const handleRentBook = () => {
    rentBook(id as string)
      .then(() => {
        alert('Book is rented successfully')
        getRentalHistoryForBook(id as string)
        setBook((prevState) => {
          if (prevState) {
            return {
              ...prevState,
              Available: prevState && prevState.Available - 1
            }
          }
        })
      })
      .catch(() => {
        alert('Error with renting book')
      })
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
        <div className={style.book_info}>
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
                <td>{isAdminOrLibrarian ? book?.Available : (book?.Available as number) > 0 ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <th>Publish date</th>
                <td>
                  {book?.PublishDate != null ? new Date(book?.PublishDate).toDateString() : ''}
                </td>
              </tr>
              <tr>
                <th
                  className={style.book_details_author_th}
                  rowSpan={book?.Authors.length !== 0 ? book?.Authors.length : 1}
                >
                  Authors
                </th>
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
            {isUserLoggedIn() && <button onClick={handleRentBook} disabled={(book?.Available as number) <= 0}>Rent</button>}
            {isAdminOrLibrarian && (
              <button className={style.book_modify_phone} onClick={handleModifyBookClick}>
                Modify
              </button>
            )}
            {isAdminOrLibrarian && (
              <button
                className={style.book_modify_desktop}
                onClick={() => setShowUpdateBookModal(true)}
              >
                Modify
              </button>
            )}
            {isAdminOrLibrarian && <button onClick={handleBookDelete}>Delete</button>}
          </div>
        </div>
      </div>
      {isAdminOrLibrarian &&
        <>
          <h1>Rental History</h1>
          <div className={style.rent_history}>
            {rentalHistory.length === 0 ? (
              <h4>There is no rent history</h4>
            ) : (
              <table>
                <tbody>
                  <tr>
                    <th className={style.rented_date}>Rented Date</th>
                    <th>User</th>
                  </tr>
                  {rentalHistory.map((rentHistory) => {
                    return (
                      <tr key={rentHistory.Id}>
                        <td className={style.rented_date}>
                          {new Date(rentHistory.RentDate).toDateString().substring(4)}
                        </td>
                        <td>{rentHistory.User.Email}</td>
                        {rentHistory.IsReturned ? (
                          <td className={style.return_button}>Returned</td>
                        ) : (
                          <td className={style.return_button}>
                            <button onClick={() => handleBookReturn(rentHistory.Id)}>Return</button>
                          </td>
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      }
    </div>
  )
}

export default BookDetail
