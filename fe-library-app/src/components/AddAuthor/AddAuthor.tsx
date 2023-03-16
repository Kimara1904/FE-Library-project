import { createRef, useState } from 'react'

import { createAuthor } from '../../services/AuthorService'
import styles from './AddAuthor.module.css'

interface AddAuthorProps {
  onFinish: () => void,
  onHide?: () => void
}

const AddAuthor = (props: AddAuthorProps) => {
  const [ authorFirstNameError, setAuthorFirstNameError ] = useState(false)
  const [ authorLastNameError, setAuthorLastNameError ] = useState(false)

  const authorFirstNameRef = createRef<HTMLInputElement>()
  const authorLastNameRef = createRef<HTMLInputElement>()

  const handleAuthorFirstNameBlur = () => {
    if (authorFirstNameRef.current?.value.trim().length === 0) {
      setAuthorFirstNameError(true)
    }
  }

  const handleAuthorLastNameBlur = () => {
    if (authorLastNameRef.current?.value.trim().length === 0) {
      setAuthorLastNameError(true)
    }
  }

  const handleSubmit = () => {
    if (authorFirstNameError || authorLastNameError) {
      alert('Invalid requested inputs!')
      return
    }

    createAuthor({
      FirstName: authorFirstNameRef.current?.value as string,
      LastName: authorLastNameRef.current?.value as string
    }).then(() => {
      props.onFinish()
      if (props.onHide) {
        props.onHide()
      }
    }).catch(() => {
      alert('Something went wrong with creating author')
    })
  }

  return (
    <div className={styles.add_author}>
      <form onSubmit={handleSubmit}>
        <div className={styles.add_author_input}>
          <label>Authors first name:</label>
          <input
            className={authorFirstNameError ? styles.add_author_input_error : ''}
            type='text'
            ref={authorFirstNameRef}
            onBlur={handleAuthorFirstNameBlur}
            onFocus={() => setAuthorFirstNameError(false)}
          />
        </div>
        <div className={authorFirstNameError ? styles.add_author_error_label : styles.add_author_error_transparent}>
          <label>First name is required</label>
        </div>
        <div className={styles.add_author_input}>
          <label>Authors last name:</label>
          <input
            className={authorLastNameError ? styles.add_author_input_error : ''}
            type='text'
            ref={authorLastNameRef}
            onBlur={handleAuthorLastNameBlur}
            onFocus={() => setAuthorLastNameError(false)}
          />
        </div>
        <div className={authorLastNameError ? styles.add_author_error_label : styles.add_author_error_transparent}>
          <label>Last name is required</label>
        </div>
        <button>Create</button>
      </form>
    </div>
  )
}

export default AddAuthor
