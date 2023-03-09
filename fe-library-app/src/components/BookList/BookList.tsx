import { GetBookResponse } from '../../services/BookService'
import Book from './BookCard/Book'

interface BookListProps{
    books: GetBookResponse[]
}

const BookList = (props: BookListProps) => {
  return (
    <div>
      {props.books.map((book) => {
        return <Book key={book.id} book={book} />
      })}
    </div>
  )
}

export default BookList
