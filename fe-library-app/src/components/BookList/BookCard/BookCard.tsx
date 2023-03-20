import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { BookItemResponse, deleteBook } from '../../../services/BookService'
import DefaultBookCover from './DefaultBookCover.png'
import styles from './BookCard.module.css'
import CreateUpdateBookModal from '../../../modals/CreateUpdateBookModal'

interface BookProp{
    book: BookItemResponse
    onBookListModified: () => void,
}

const BookCard = (props: BookProp) => {
  const navigator = useNavigate()
  const [ showModifyModule, setShowModifyModule ] = useState(false)

  const handleModifyClick = () => {
    navigator('/add_modify/' + props.book.Id.toString())
  }

  const handleDeleteClick = () => {
    if (confirm('Are you sure that you want to delete this book?') === true) {
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

  return (
    <div className={styles.book_card}>
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
        <button className={styles.book_phone_button} onClick={handleModifyClick}>
          Modify
        </button>
        <button className={styles.book_desktop_button} onClick={() => setShowModifyModule(true)}>
          Modify
        </button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
      {showModifyModule && (
        <CreateUpdateBookModal
          onCreateOrModifySuccess={props.onBookListModified}
          id={props.book.Id}
          onHideModal={() => setShowModifyModule(false)}
        />
      )}
    </div>
  )
}

export default BookCard
