import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import Select, { MultiValue } from 'react-select'

import AddAuthorModal from '../../modals/AddAuthorModal'
import { GetAuthorResponse, getAuthors } from '../../services/AuthorService'
import { createBook, getBookById, modifyBook } from '../../services/BookService'
import AddAuthor from '../AddAuthor/AddAuthor'
import DefaultBookCover from '../BookList/BookCard/DefaultBookCover.png'
import styles from './AddModifyBookForm.module.css'

interface AddModifyBookFormProps {
  onFinish: () => void,
  onHide?: () => void,
  id?: string
}

const AddModifyBookForm = (props: AddModifyBookFormProps) => {
  const [ authorList, setAuthorList ] = useState<GetAuthorResponse[]>([])
  const [ selectedAuthors, setSelectedAuthors ] = useState<GetAuthorResponse[]>([])
  const [ newBookTitle, setNewBookTitle ] = useState('')
  const [ newBookDisc, setNewBookDisc ] = useState('')
  const [ newBookIsbn, setNewBookIsbn ] = useState('')
  const [ newBookQuantity, setNewBookQuantity ] = useState(0)
  const [ newBookCoverShow, setNewBookCoverShow ] = useState('')
  const [ newBookCover, setNewBookCover ] = useState<Blob>(new Blob())
  const [ newBookPublishDate, setNewBookPublishDate ] = useState('')
  const [ isbnErrorMessage, setIsbnErrorMessage ] = useState('')
  const [ inputError, setInputError ] = useState({
    titleError: false,
    isbnErrorEmpty: false,
    isbnErrorFormat: false,
    quantityError: false
  })
  const [ showAddAuthor, setShowAddAuthor ] = useState(false)

  const getAuthorList = useCallback(() => {
    if(props.id != null)
    {
      getBookById(props.id)
        .then((response) => {
          setNewBookTitle(response.data.Title)
          setNewBookDisc(response.data.Description)
          setNewBookIsbn(response.data.ISBN)
          setNewBookQuantity(response.data.Quantity)
          setNewBookPublishDate(new Intl.DateTimeFormat('en-CA').format(new Date(response.data.PublishDate)))
          setSelectedAuthors(response.data.Authors.map((author) => {
            return {
              Id: author.Id,
              FirstName: author.Firstname,
              LastName: author.Lastname
            }
          }))
          setNewBookCoverShow('data:image/png;base64,' + response.data.Cover)
        }).catch(() => alert('Something went wrong'))
    }
    getAuthors()
      .then((response) => {
        setAuthorList(response.data)
      })
      .catch(() => alert('Error with getting authors'))
  }, [ props.id ])

  useEffect(() => {
    getAuthorList()
  }, [ getAuthorList ])

  const handleSelectChange = (selection: MultiValue<GetAuthorResponse>) => {
    setSelectedAuthors(selection as GetAuthorResponse[])
  }

  const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    const reader = new FileReader()
    if (files !== null) {
      reader.readAsDataURL(files[0])
      setNewBookCover(files[0])
      reader.onloadend = () => {
        if(reader.result)
          setNewBookCoverShow(reader.result as string)
      }
    }
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewBookTitle(event.currentTarget.value)
  }

  const handleDescChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewBookDisc(event.currentTarget.value)
  }

  const handleIsbnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewBookIsbn(event.currentTarget.value)
  }

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewBookQuantity(event.currentTarget.value !== '' ? parseInt(event.currentTarget.value) : 0)
  }

  const handlePublishDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewBookPublishDate(event.currentTarget.value)
  }

  const handleTitleBlur = () => {
    if (newBookTitle.trim().length === 0){
      setInputError((inputError) => {return{ ...inputError, titleError: true }})
    }
  }

  const handleIsbnBlur = () => {
    const pattern = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
    if (newBookIsbn.trim().length === 0)
    {
      setInputError((inputError) => {return{ ...inputError, isbnErrorEmpty: true }})
      setIsbnErrorMessage('Isbn is required')
    }
    else if (pattern.test(newBookIsbn) === false)
    {
      setInputError((inputError) => {return{ ...inputError, isbnErrorFormat: true }})
      setIsbnErrorMessage('Bad format of Isbn')
    }
  }

  const handleQuantityBlur = () => {
    if (newBookQuantity <= 0)
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
    formData.append('Title', newBookTitle)
    formData.append('Description', newBookDisc)
    formData.append('Isbn', newBookIsbn)
    formData.append('Quantity', newBookQuantity.toString())
    formData.append('PublishDate', newBookPublishDate)
    selectedAuthors.forEach((author) => formData.append('AuthorIds', author.Id.toString()))
    if (props.id) {
      formData.append('Id', props.id)
      formData.append('Cover', base64ToBlob(newBookCoverShow))
      modifyBook(formData)
        .then(() => props.onFinish())
        .catch(() => alert('Something went wrong with modifying!'))
    }else{
      formData.append('Cover', newBookCover)
      createBook(formData)
        .then(() => props.onFinish())
        .catch(() => alert('Something went wrong with adding!'))
    }
  }

  const handleShowAddAuthor = () => {
    setShowAddAuthor(true)
  }

  const handleHideAddAuthor = () => {
    setShowAddAuthor(false)
  }

  return (
    <div className={styles.add_modify_book_form}>
      <div className={styles.add_modify_book_cover}>
        <img src={newBookCoverShow !== '' ? newBookCoverShow : DefaultBookCover} alt='Book cover' />
        <input type='file' onChange={handleCoverChange} />
      </div>
      <div className={styles.add_modify_book_inputs_val}>
        <div className={styles.add_modify_book_form_validation}>
          <label>Title</label>
          <input
            className={inputError.titleError ? styles.add_modify_book_error_inputs : ''}
            type='text'
            value={newBookTitle}
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
        <textarea value={newBookDisc} onChange={handleDescChange} rows={5} />
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
            value={newBookIsbn}
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
            value={newBookQuantity}
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
        <input type='date' value={newBookPublishDate} onChange={handlePublishDateChange} />
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
          <button className={styles.add_author_button} onClick={handleShowAddAuthor}>+</button>
          {showAddAuthor && <AddAuthorModal onFinish={getAuthorList} onHide={handleHideAddAuthor} />}
        </div>
      </div>
      <div className={styles.add_modify_book_button}>
        <button onClick={handleClick}>{props.id ? 'Modify' : 'Create'}</button>
      </div>
      <div className={styles.add_author_form}>
        <AddAuthor onFinish={() => getAuthorList()}/>
      </div>
    </div>
  )
}

export default AddModifyBookForm
