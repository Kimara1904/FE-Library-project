import { useEffect, useState } from 'react'

import styles from './Search.module.css'

interface SearchProps{
  searchChange: (newInput: string) => void
}

const Search = (props: SearchProps) => {
  const [ enteredSearch, setEnteredSearch ] = useState('')

  useEffect(() => {
    const timeOut = setTimeout(() => props.searchChange(enteredSearch), 500)
    return () => clearTimeout(timeOut)
  }, [ enteredSearch, props ])

  return (
    <span className={styles.search}>
      <input
        type='text'
        placeholder='Search here'
        onChange={(event) => setEnteredSearch(event.target.value)}
      />
    </span>
  )
}

export default Search
