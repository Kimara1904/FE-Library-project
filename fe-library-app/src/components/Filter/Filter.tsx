import { createRef } from 'react'

const Filter = () => {
  const descRef = createRef<HTMLInputElement>()
  const isbnRef = createRef<HTMLInputElement>()
  const authorFirstNameRef = createRef<HTMLInputElement>()
  const authorLastNameRef = createRef<HTMLInputElement>()


  return (
    <div>
      <form >
        <div>
          <label>Description: </label>
          <input type='text' ref={descRef} />
        </div>
        <div>
          <label>ISBN: </label>
          <input type='text' ref={isbnRef}/>
        </div>
        <div>
          <label>Authors first name</label>
          <input type='text' ref={authorFirstNameRef}/>
        </div>
        <div>
          <label>Authors last name</label>
          <input type='text' ref={authorLastNameRef}/>
        </div>
        <button>Filter</button>
      </form>
    </div>
  )
}

export default Filter
