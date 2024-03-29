import { FormEvent, useState } from 'react'

import { createAuthor } from '../../services/AuthorService'
import styles from './CreateAuthor.module.css'

interface CreateAuthorProps {
  onCreateAuthorSuccess: () => void,
  onHideModal?: () => void
}

const CreateAuthor = (props: CreateAuthorProps) => {
  const [ authorFirstNameError, setAuthorFirstNameError ] = useState(false)
  const [ authorLastNameError, setAuthorLastNameError ] = useState(false)
  const [ authorFirstName, setAuthorFirstName ] = useState('')
  const [ authorLastName, setAuthorLastName ] = useState('')

  const handleAuthorFirstNameBlur = () => {
    if (authorFirstName.trim().length === 0) {
      setAuthorFirstNameError(true)
    }
  }

  const handleAuthorLastNameBlur = () => {
    if (authorLastName.trim().length === 0) {
      setAuthorLastNameError(true)
    }
  }

  const clearForm = () => {
    setAuthorFirstName('')
    setAuthorLastName('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (authorFirstNameError || authorLastNameError) {
      alert('Invalid requested inputs!')
      return
    }

    createAuthor({
      FirstName: authorFirstName,
      LastName: authorLastName
    }).then(() => {
      props.onCreateAuthorSuccess()
      clearForm()
      if (props.onHideModal) {
        props.onHideModal()
      }
      alert('Successfully created Author')
    }).catch(() => {
      alert('Something went wrong with creating author')
    })
  }

  return (
    <div className={styles.add_author}>
      <form onSubmit={handleSubmit}>
        <div className={styles.add_author_title}>Create new author</div>
        <div className={styles.add_author_input}>
          <label>Authors first name:</label>
          <input
            className={authorFirstNameError ? styles.add_author_input_error : ''}
            type='text'
            value={authorFirstName}
            onBlur={handleAuthorFirstNameBlur}
            onFocus={() => setAuthorFirstNameError(false)}
            onChange={(event) => setAuthorFirstName(event.currentTarget.value)}
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
            value={authorLastName}
            onBlur={handleAuthorLastNameBlur}
            onChange={(event) => setAuthorLastName(event.currentTarget.value)}
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

export default CreateAuthor
