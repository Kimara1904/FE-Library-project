import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { BookItemResponse, deleteBook } from '../../../services/BookService'
import DefaultBookCover from './DefaultBookCover.png'
import styles from './BookCard.module.css'
import CreateUpdateBookModal from '../../../modals/CreateUpdateBookModal'
import { rentBook } from '../../../services/RentalService'
import { isUserLoggedIn } from '../../../services/AuthService'
import { isAdmin, isLibrarian } from '../../../jwt/JwtRoleChecker'

interface BookProp{
    book: BookItemResponse
    onBookListModified: () => void,
}

const BookCard = (props: BookProp) => {
  const navigator = useNavigate()
  const [ showUpdateModal, setShowUpdateModal ] = useState(false)

  const isAdminOrLibrarian = isAdmin() || isLibrarian()

  const handleModifyClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    navigator('/add_modify/' + props.book.Id.toString())
  }

  const handleBookCardClick = () => {
    navigator('/book_detail/' + props.book.Id.toString())
  }

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    if (confirm('Are you sure that you want to delete this book?')) {
      deleteBook(props.book.Id.toString())
        .then(() => {
          alert('You successfully delete book ' + props.book.Title)
          props.onBookListModified()
        })
        .catch(() => {
          alert('Something went wrong with deleting book')
        })
    }
  }

  const handleRentBook = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    rentBook(props.book.Id.toString())
      .then(() => {
        alert('Book is rented successfully')
        props.book.Available = props.book.Available - 1
      })
      .catch(() => {
        alert('Error with renting book')
      })
  }

  return (
    <div className={styles.book_card} onClick={handleBookCardClick}>
      <img
        src={
          props.book.Cover !== '' ? 'data:image/png;base64,' + props.book.Cover : DefaultBookCover
        }
        alt='Book cover'
      />
      <div className={styles.info}>
        <label>Title: </label>
        <div className={styles.data}>{props.book.Title}</div>
      </div>
      <div className={styles.info}>
        <label>ISBN: </label>
        <div className={styles.data}>{props.book.Isbn}</div>
      </div>
      <div className={styles.info}>
        <label>Authors: </label>
        <div className={styles.authors}>
          {props.book.Authors.map((author) => (
            <div className={styles.data} key={author.Id}>
              {author.LastName + ' ' + author.FirstName}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.extra_func}>
        {isUserLoggedIn() && <button onClick={handleRentBook} disabled={props.book.Available <= 0}>Rent</button>}
        {isAdminOrLibrarian && (
          <button className={styles.book_phone_button} onClick={handleModifyClick}>
            Modify
          </button>
        )}
        {isAdminOrLibrarian && (
          <button
            className={styles.book_desktop_button}
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              event.stopPropagation()
              setShowUpdateModal(true)
            }}
          >
            Modify
          </button>
        )}
        {isAdminOrLibrarian && <button onClick={handleDeleteClick}>Delete</button>}
      </div>
      {showUpdateModal && (
        <CreateUpdateBookModal
          onCreateOrModifySuccess={() => {
            props.onBookListModified
          }}
          id={props.book.Id}
          onHideModal={() =>
            setShowUpdateModal(false)
          }
        />
      )}
    </div>
  )
}

export default BookCard
