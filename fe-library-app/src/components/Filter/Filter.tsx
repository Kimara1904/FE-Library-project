import { ChangeEvent, useState } from 'react'

import { Filters } from '../AppRouter/pages/HomePage'
import styles from './Filter.module.css'

interface FilterProps{
  filterChange: (filterData: Filters) => void,
  switchShowFilter: boolean,
  hideFilter: () => void
}

const Filter = (props: FilterProps) => {
  const initialState: Filters = {
    description: '',
    isbn: '',
    authorFirstName: '',
    authorLastName: ''
  }
  const [ desc, setDesc ] = useState(initialState.description)
  const [ isbn, setIsbn ] = useState(initialState.isbn)
  const [ authorFirstName, setAuthorFirstName ] = useState(initialState.authorFirstName)
  const [ authorLastName, setAuthorLastName ] = useState(initialState.authorLastName)

  const changeDescHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDesc(event.currentTarget.value)
  }
  const changeIsbnHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsbn(event.currentTarget.value)
  }
  const changeAuthorFirstNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthorFirstName(event.currentTarget.value)
  }
  const changeAuthorLastNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthorLastName(event.currentTarget.value)
  }

  const filterHandler = () => {
    props.filterChange({
      description: desc,
      isbn,
      authorFirstName,
      authorLastName
    })
    props.hideFilter()
  }

  const clearFilter = () => {
    setDesc('')
    setIsbn('')
    setAuthorFirstName('')
    setAuthorLastName('')
    props.filterChange({
      description: '',
      isbn: '',
      authorFirstName: '',
      authorLastName: ''
    })
    props.hideFilter()
  }

  return (
    <div className={props.switchShowFilter ? styles.filter : styles.filter_hidden}>
      <div className={styles.filter_input}>
        <label>Description: </label>
        <input type='text' value={desc} onChange={changeDescHandler} />
      </div>
      <div className={styles.filter_input}>
        <label>ISBN: </label>
        <input type='text' value={isbn} onChange={changeIsbnHandler} />
      </div>
      <div className={styles.filter_input}>
        <label>Authors first name</label>
        <input type='text' value={authorFirstName} onChange={changeAuthorFirstNameHandler} />
      </div>
      <div className={styles.filter_input}>
        <label>Authors last name</label>
        <input type='text' value={authorLastName} onChange={changeAuthorLastNameHandler} />
      </div>
      <button onClick={filterHandler}>
        Filter
      </button>
      <button onClick={clearFilter}>Clear</button>
    </div>
  )
}

export default Filter
