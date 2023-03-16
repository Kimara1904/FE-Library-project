import { useNavigate } from 'react-router-dom'

import { BookItemResponse } from '../../../services/BookService'
import DefaultBookCover from './DefaultBookCover.png'
import styles from './BookCard.module.css'

interface BookProp{
    book: BookItemResponse
}

const BookCard = (props: BookProp) => {
  const navigator = useNavigate()

  const handleModifyClick = () => {
    navigator('/add_modify/' + props.book.Id.toString())
  }

  return (
    <div className={styles.book_card}>
      <img src={props.book.Cover !== '' ? 'data:image/png;base64,' + props.book.Cover : DefaultBookCover} alt='Book cover' />
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
          {props.book.Authors.map((author) => <div className={styles.data} key={author.Id}>{author.LastName + ' ' + author.FirstName}</div>)}
        </div>
      </div>
      <div className={styles.extra_func}>
        <button onClick={handleModifyClick}>Modify</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default BookCard
