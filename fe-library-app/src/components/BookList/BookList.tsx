import { GetBookResponse } from '../../services/BookService'
import BookCard from './BookCard/BookCard'
import styles from './BookList.module.css'

interface BookListProps{
    books: GetBookResponse[]
}

const BookList = (props: BookListProps) => {
  return (
    <div className={styles.books}>
      {props.books.map((book) => {
        return <BookCard key={book.Id} book={book} />
      })}
    </div>
  )
}

export default BookList
