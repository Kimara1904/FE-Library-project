import { GetBookResponse } from '../../services/BookService'
import Book from './BookCard/Book'

interface BookListProps{
    books: GetBookResponse[]
}

const BookList = (props: BookListProps) => {
  return (
    <div>
      {props.books.map((book) => {
        return <Book key={book.isbn} />
      })}
    </div>
  )
}

export default BookList
