import { GetBookResponse } from '../../../services/BookService'
import DefaultBookCover from './DefaultBookCover.png'
import styles from './Book.module.css'

interface BookProp{
    book: GetBookResponse
}

const Book = (props: BookProp) => {
  return (
    <div className={styles.book_card}>
      <img src={props.book.cover !== '' ? props.book.cover : DefaultBookCover} alt='Book cover' />
      <div className={styles.info}>
        <label>Title: </label>
        <div className={styles.data}>{props.book.title}</div>
      </div>
      <div className={styles.info}>
        <label>ISBN: </label>
        <div className={styles.data}>{props.book.isbn}</div>
      </div>
      <div className={styles.info}>
        <label>Authors: </label>
        <div className={styles.authors}>
          {props.book.authors.map((author) => <div className={styles.data} key={author.id}>{author.lastName + ' ' + author.firstName}</div>)}
        </div>
      </div>
      <div className={styles.extra_func}>
        <button>Modify</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default Book
