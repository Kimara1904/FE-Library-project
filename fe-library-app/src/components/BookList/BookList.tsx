import { BookItemResponse } from '../../services/BookService'
import BookCard from './BookCard/BookCard'
import styles from './BookList.module.css'

interface BookListProps{
    books: BookItemResponse[]
    onBookListChange: () => void
}

const BookList = (props: BookListProps) => {
  return (
    <div className={styles.books}>
      {props.books.map((book) => {
        return <BookCard key={book.Id} book={book} onBookListModified={props.onBookListChange}/>
      })}
    </div>
  )
}

export default BookList
