import { createRef } from 'react'

import { Filters } from '../AppRouter/pages/HomePage'
import styles from './Filter.module.css'

interface FilterProps{
  filterChange: (filterData: Filters) => void
}

const Filter = (props: FilterProps) => {
  const descRef = createRef<HTMLInputElement>()
  const isbnRef = createRef<HTMLInputElement>()
  const authorFirstNameRef = createRef<HTMLInputElement>()
  const authorLastNameRef = createRef<HTMLInputElement>()

  const submitHandler = () => {
    const filterData: Filters = {
      description: descRef.current?.value as string,
      isbn: isbnRef.current?.value as string,
      authorFirstName: authorFirstNameRef.current?.value as string,
      authorLastName: authorLastNameRef.current?.value as string
    }
    props.filterChange(filterData)
  }

  return (
    <div className={styles.filter}>
      <form onSubmit={submitHandler}>
        <div className={styles.filter_input}>
          <label>Description: </label>
          <input type='text' ref={descRef} />
        </div>
        <div className={styles.filter_input}>
          <label>ISBN: </label>
          <input type='text' ref={isbnRef}/>
        </div>
        <div className={styles.filter_input}>
          <label>Authors first name</label>
          <input type='text' ref={authorFirstNameRef}/>
        </div>
        <div className={styles.filter_input}>
          <label>Authors last name</label>
          <input type='text' ref={authorLastNameRef}/>
        </div>
        <button>Filter</button>
      </form>
    </div>
  )
}

export default Filter
