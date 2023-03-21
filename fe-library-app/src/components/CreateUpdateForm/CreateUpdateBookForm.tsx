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
  const [ showAuthorModal, setShowAuthorModal ] = useState(false)
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
        coverShow: book.Cover
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
    const files = event.target.files
    const reader = new FileReader()
    if (files !== null) {
      reader.readAsDataURL(files[0])
      setNewBookProps({ ... newBookProps, cover: files[0] })
      reader.onloadend = () => {
        if(reader.result)
        {
          const pervCover = (reader.result as string).split(';base64,')[1]
          setNewBookProps((bookProps) => {return{ ... bookProps, coverShow: pervCover }})
        }
      }
    }
  }

  const handleChangeInput = (value: string | number, formProperty: keyof newBookInterface) => {
    setNewBookProps((bookProps) => {return{ ...bookProps, [formProperty]: value }})
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
    const decodedData = window.atob(base64Image)
    const uIntArray = new Uint8Array(decodedData.length)

    for (let i = 0; i < decodedData.length; ++i) {
      uIntArray[i] = decodedData.charCodeAt(i)
    }

    return new Blob([ uIntArray ], { type: 'image/png' })
  }

  const handleCreateUpdateClick = () => {
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
    setShowAuthorForm((perv) => !perv)
  }

  return (
    <div className={styles.add_modify_book_form}>
      <div className={styles.add_modify_book_cover}>
        <img
          src={newBookProps.coverShow !== '' && newBookProps.coverShow != null ? 'data:image/png;base64,' + newBookProps.coverShow : DefaultBookCover}
          alt='Book cover'
        />
        <input type='file' onChange={handleCoverChange} disabled={showAuthorForm} />
      </div>
      <div className={styles.add_modify_book_inputs_val}>
        <div className={styles.add_modify_book_form_validation}>
          <label>Title</label>
          <input
            className={inputError.titleError ? styles.add_modify_book_error_inputs : ''}
            type='text'
            value={newBookProps.title}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              handleChangeInput(target.value, 'title')
            }}
            onBlur={handleTitleBlur}
            onFocus={() =>
              setInputError((inputError) => {
                return { ...inputError, titleError: false }
              })
            }
            disabled={showAuthorForm}
          />
        </div>
        <label className={styles.add_modify_book_error_label}>
          {inputError.titleError ? 'Title is required' : ''}
        </label>
      </div>
      <div className={styles.add_modify_book_inputs}>
        <label>Description</label>
        <textarea
          value={newBookProps.description}
          onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
            handleChangeInput(target.value, 'description')
          }}
          rows={5}
          disabled={showAuthorForm}
        />
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
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              handleChangeInput(target.value, 'isbn')
            }}
            onBlur={handleIsbnBlur}
            onFocus={() => {
              setInputError((inputError) => {
                return { ...inputError, isbnErrorEmpty: false, isbnErrorFormat: false }
              })
              setIsbnErrorMessage('')
            }}
            disabled={showAuthorForm}
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
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              handleChangeInput((target.value !== '' ? parseInt(target.value) : 0), 'quantity')
            }}
            onBlur={handleQuantityBlur}
            onFocus={() =>
              setInputError((inputError) => {
                return { ...inputError, quantityError: false }
              })
            }
            min={0}
            disabled={showAuthorForm}
          />
        </div>
        <label className={styles.add_modify_book_error_label}>
          {inputError.quantityError ? 'Quantity must be > 0' : ''}
        </label>
      </div>
      <div className={styles.add_modify_book_inputs}>
        <label>Publish date</label>
        <input
          type='date'
          value={newBookProps.publishDate}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
            handleChangeInput(target.value, 'publishDate')
          }}
          disabled={showAuthorForm}
        />
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
            isDisabled={showAuthorForm}
            styles={{
              container: (baseStyles) => ({
                ...baseStyles,
                width: '100%'
              })
            }}
          />
          <button className={styles.add_author_button_phone} onClick={() => setShowAuthorModal(true)}>
            +
          </button>
          <button className={styles.add_author_button_desktop} onClick={handleShowAuthorForm}>
            {showAuthorForm ? '-' : '+'}
          </button>
          {showAuthorModal && (
            <CreateAuthorModal
              onCreateAuthorSuccess={getAuthorList}
              onHideModal={() => setShowAuthorModal(false)}
            />
          )}
        </div>
      </div>
      {showAuthorForm && (
        <CreateAuthor
          onCreateAuthorSuccess={() => {
            setShowAuthorForm(false)
            getAuthorList()
          }}
        />
      )}
      <div className={styles.add_modify_book_button}>
        <button onClick={handleCreateUpdateClick}>{props.book ? 'Modify' : 'Create'}</button>
      </div>
    </div>
  )
}

export default CreateUpdateBookForm
