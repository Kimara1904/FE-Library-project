import { ChangeEvent, useState } from 'react'

import { Filters } from '../AppRouter/pages/HomePage'
import styles from './Filter.module.css'

interface FilterProps{
  filterChange: (filterData: Filters) => void,
  switchShowFilter: boolean,
  hideFilter: () => void
}

const Filter = (props: FilterProps) => {
  const [ desc, setDesc ] = useState('')
  const [ isbn, setIsbn ] = useState('')
  const [ authorFirstName, setAuthorFirstName ] = useState('')
  const [ authorLastName, setAuthorLastName ] = useState('')

  const handleChangeDesc = (event: ChangeEvent<HTMLInputElement>) => {
    setDesc(event.currentTarget.value)
  }
  const handleChangeIsbn = (event: ChangeEvent<HTMLInputElement>) => {
    setIsbn(event.currentTarget.value)
  }
  const handleChangeAuthorFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthorFirstName(event.currentTarget.value)
  }
  const handleChangeAuthorLastName = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthorLastName(event.currentTarget.value)
  }

  const handleFilterClick = () => {
    props.filterChange({
      description: desc,
      isbn,
      authorFirstName,
      authorLastName
    })
    props.hideFilter()
  }

  const handleFilterClear = () => {
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
        <input type='text' value={desc} onChange={handleChangeDesc} />
      </div>
      <div className={styles.filter_input}>
        <label>ISBN: </label>
        <input type='text' value={isbn} onChange={handleChangeIsbn} />
      </div>
      <div className={styles.filter_input}>
        <label>Authors first name</label>
        <input type='text' value={authorFirstName} onChange={handleChangeAuthorFirstName} />
      </div>
      <div className={styles.filter_input}>
        <label>Authors last name</label>
        <input type='text' value={authorLastName} onChange={handleChangeAuthorLastName} />
      </div>
      <button onClick={handleFilterClick}>
        Filter
      </button>
      <button onClick={handleFilterClear}>Clear</button>
    </div>
  )
}

export default Filter
