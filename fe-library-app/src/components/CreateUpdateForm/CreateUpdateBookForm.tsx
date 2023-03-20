import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import Select, { MultiValue } from 'react-select'

import CreateAuthorModal from '../../modals/CreateAuthorModal'
import { GetAuthorResponse, getAuthors } from '../../services/AuthorService'
import { BookByIdItemResponse, createBook, modifyBook } from '../../services/BookService'
import CreateAuthor from '../CreateAuthor/CreateAuthor'
import DefaultBookCover from '../BookList/BookCard/DefaultBookCover.png'
import styles from './CreateUpdateBookForm.module.css'

interface CreateUpdateBookFormProps {
  book?: BookByIdItemResponse,
  onCreateOrModifySuccess: () => void,
  onHideModal?: () => void
}

interface newBookInterface {
  title: string,
  description: string,
  isbn: string,
  quantity: number,
  coverShow: string,
  cover: Blob,
  publishDate: string
}

const CreateUpdateBookForm = (props: CreateUpdateBookFormProps) => {
  const [ authorList, setAuthorList ] = useState<GetAuthorResponse[]>([])
  const [ selectedAuthors, setSelectedAuthors ] = useState<GetAuthorResponse[]>([])
  const [ newBookProps, setNewBookProps ] = useState<newBookInterface>({
    title: '',
    description: '',
    isbn: '',
    quantity: 0,
    coverShow: '',
    cover: new Blob(),
    publishDate: ''
  })
  const [ isbnErrorMessage, setIsbnErrorMessage ] = useState('')
  const [ inputError, setInputError ] = useState({
    titleError: false,
    isbnErrorEmpty: false,
    isbnErrorFormat: false,
    quantityError: false
  })
  const [ showAuthorForm, setShowAuthorForm ] = useState(false)

  const getAuthorList = () => {
    getAuthors()
      .then((response) => {
        setAuthorList(response.data)
      })
      .catch(() => alert('Error with getting authors'))
  }

  const setBookInitialValues = useCallback((book: BookByIdItemResponse) => {
    setNewBookProps((bookProps) => {
      return {
        ...bookProps,
        title: book.Title,
        description: book.Description,
        isbn: book.ISBN,
        quantity: book.Quantity,
        publishDate: book.PublishDate ? new Intl.DateTimeFormat('en-CA').format(new Date(book.PublishDate)) : '',
        coverShow: 'data:image/png;base64,' + (book.Cover)
      }
    })
    setSelectedAuthors(
      book.Authors.map((author) => {
        return {
          Id: author.Id,
          FirstName: author.Firstname,
          LastName: author.Lastname
        }
      })
    )
  }, [])

  useEffect(() => {
    getAuthorList()
    if (props.book) {
      setBookInitialValues(props.book)
    }
  }, [ props.book, setBookInitialValues ])

  const handleSelectChange = (selection: MultiValue<GetAuthorResponse>) => {
    setSelectedAuthors(selection as GetAuthorResponse[])
  }

  const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    const reader = new FileReader()
    if (files !== null) {
      reader.readAsDataURL(files[0])
      setNewBookProps({ ... newBookProps, cover: files[0] })
      reader.onloadend = () => {
        if(reader.result)
          setNewBookProps(({ ... newBookProps, coverShow: reader.result as string }))
      }
    }
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewBookProps((bookProps) => {return{ ... bookProps, title: event.currentTarget.value }})
  }

  const handleDescChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewBookProps((bookProps) => {return{ ... bookProps, description: event.currentTarget.value }})
  }

  const handleIsbnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewBookProps((bookProps) => {return{ ... bookProps, isbn: event.currentTarget.value }})
  }

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewBookProps((bookProps) => {return{ ... bookProps, quantity: event.currentTarget.value !== '' ? parseInt(event.currentTarget.value) : 0 }})
  }

  const handlePublishDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewBookProps((bookProps) => {return{ ... bookProps, isbn: event.currentTarget.value }})
  }

  const handleTitleBlur = () => {
    if (newBookProps.title.trim().length === 0){
      setInputError((inputError) => {return{ ...inputError, titleError: true }})
    }
  }

  const handleIsbnBlur = () => {
    const pattern = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
    if (newBookProps.isbn.trim().length === 0)
    {
      setInputError((inputError) => {return{ ...inputError, isbnErrorEmpty: true }})
      setIsbnErrorMessage('Isbn is required')
    }
    else if (pattern.test(newBookProps.isbn) === false)
    {
      setInputError((inputError) => {return{ ...inputError, isbnErrorFormat: true }})
      setIsbnErrorMessage('Bad format of Isbn')
    }
  }

  const handleQuantityBlur = () => {
    if (newBookProps.quantity <= 0)
    {
      setInputError((inputError) => {return{ ...inputError, quantityError: true }})
    }
  }

  const base64ToBlob = (base64Image: string): Blob => {
    const parts = base64Image.split(';base64,')
    const imageType = parts[0].split(':')[1]
    const decodedData = window.atob(parts[1])
    const uIntArray = new Uint8Array(decodedData.length)

    for (let i = 0; i < decodedData.length; ++i) {
      uIntArray[i] = decodedData.charCodeAt(i)
    }

    return new Blob([ uIntArray ], { type: imageType })
  }

  const handleClick = () => {
    if (inputError.titleError || inputError.isbnErrorEmpty || inputError.isbnErrorFormat || inputError.quantityError)
    {
      alert('Invalid requested inputs!')
      return
    }
    const formData = new FormData()
    formData.append('Title', newBookProps.title)
    formData.append('Description', newBookProps.description)
    formData.append('Isbn', newBookProps.isbn)
    formData.append('Quantity', newBookProps.quantity.toString())
    formData.append('PublishDate', newBookProps.publishDate)
    selectedAuthors.forEach((author) => formData.append('AuthorIds', author.Id.toString()))
    if (props.book) {
      formData.append('Id', props.book.Id.toString())
      formData.append('Cover', base64ToBlob(newBookProps.coverShow))
      modifyBook(formData)
        .then(() => {
          if(props.onHideModal)
            props.onHideModal()
          props.onCreateOrModifySuccess()
        })
        .catch(() => alert('Something went wrong with modifying!'))
    }else{
      formData.append('Cover', newBookProps.cover)
      createBook(formData)
        .then(() => props.onCreateOrModifySuccess())
        .catch(() => alert('Something went wrong with adding!'))
    }
  }

  const handleShowAuthorForm = () => {
    setShowAuthorForm(true)
  }

  const handleHideAuthorForm = () => {
    setShowAuthorForm(false)
  }

  return (
    <div className={styles.add_modify_book_form}>
      <div className={styles.add_modify_book_cover}>
        <img src={newBookProps.coverShow !== '' ? newBookProps.coverShow : DefaultBookCover} alt='Book cover' />
        <input type='file' onChange={handleCoverChange} />
      </div>
      <div className={styles.add_modify_book_inputs_val}>
        <div className={styles.add_modify_book_form_validation}>
          <label>Title</label>
          <input
            className={inputError.titleError ? styles.add_modify_book_error_inputs : ''}
            type='text'
            value={newBookProps.title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onFocus={() =>
              setInputError((inputError) => {
                return { ...inputError, titleError: false }
              })
            }
          />
        </div>
        <label className={styles.add_modify_book_error_label}>
          {inputError.titleError ? 'Title is required' : ''}
        </label>
      </div>
      <div className={styles.add_modify_book_inputs}>
        <label>Description</label>
        <textarea value={newBookProps.description} onChange={handleDescChange} rows={5} />
      </div>
      <div className={styles.add_modify_book_inputs_val}>
        <div className={styles.add_modify_book_form_validation}>
          <label>Isbn</label>
          <input
            className={
              inputError.isbnErrorEmpty || inputError.isbnErrorFormat
                ? styles.add_modify_book_error_inputs
                : ''
            }
            type='text'
            value={newBookProps.isbn}
            onChange={handleIsbnChange}
            onBlur={handleIsbnBlur}
            onFocus={() => {
              setInputError((inputError) => {
                return { ...inputError, isbnErrorEmpty: false, isbnErrorFormat: false }
              })
              setIsbnErrorMessage('')
            }}
          />
        </div>
        <label className={styles.add_modify_book_error_label}>{isbnErrorMessage}</label>
      </div>
      <div className={styles.add_modify_book_inputs_val}>
        <div className={styles.add_modify_book_form_validation}>
          <label>Quantity</label>
          <input
            className={inputError.quantityError ? styles.add_modify_book_error_inputs : ''}
            type='number'
            value={newBookProps.quantity}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
            onFocus={() =>
              setInputError((inputError) => {
                return { ...inputError, quantityError: false }
              })
            }
          />
        </div>
        <label className={styles.add_modify_book_error_label}>
          {inputError.quantityError ? 'Quantity must be > 0' : ''}
        </label>
      </div>
      <div className={styles.add_modify_book_inputs}>
        <label>Publish date</label>
        <input type='date' value={newBookProps.publishDate} onChange={handlePublishDateChange} />
      </div>
      <div className={styles.add_modify_book_inputs}>
        <label>Authors</label>
        <div className={styles.add_modify_select}>
          <Select
            options={authorList}
            getOptionLabel={(option: GetAuthorResponse) => option.FirstName + ' ' + option.LastName}
            getOptionValue={(option: GetAuthorResponse) => option.Id.toString()}
            value={selectedAuthors}
            onChange={handleSelectChange}
            isSearchable={true}
            maxMenuHeight={130}
            isMulti={true}
          />
          <button className={styles.add_author_button} onClick={handleShowAuthorForm}>+</button>
          {showAuthorForm && <CreateAuthorModal onCreateAuthorSuccess={getAuthorList} onHideModal={handleHideAuthorForm} />}
        </div>
      </div>
      <div className={styles.add_modify_book_button}>
        <button onClick={handleClick}>{props.book ? 'Modify' : 'Create'}</button>
      </div>
      <div className={styles.add_author_form}>
        <CreateAuthor onCreateAuthorSuccess={() => getAuthorList()}/>
      </div>
    </div>
  )
}

export default CreateUpdateBookForm
