import { createRef, useState } from 'react'

import { useNavigate } from 'react-router'

import { login } from '../../../services/AuthService'
import styles from './LoginPage.module.css'

const LoginPage = () => {
  const [ canSubmit, setCanSubmit ] = useState(false)

  const navigation = useNavigate()

  const emailRef = createRef<HTMLInputElement>()
  const passwordRef = createRef<HTMLInputElement>()

  const checkInputs = () => {
    if (emailRef.current?.value.trim().length !== 0 && passwordRef.current?.value.trim().length !== 0){
      setCanSubmit(true)
    }else{
      setCanSubmit(false)
    }
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const enteredEmail = emailRef.current?.value as string
    const enteredPassword = passwordRef.current?.value as string

    login(enteredEmail, enteredPassword)
      .then((response) => {
        sessionStorage.setItem('token', response.data.accessToken)
        navigation('/home')
      })
      .catch(() => {
        alert('Wrong email or password!')
      })
  }

  return (
    <div className={styles.login_form}>
      <form onSubmit={submitHandler}>
        <div>
          <label>Email</label>
          <input type='text' name='email' ref={emailRef} onChange={checkInputs}/>
        </div>
        <div>
          <label>Password</label>
          <input type='password' name='password' ref={passwordRef} onChange={checkInputs} />
        </div>
        <button className={canSubmit ? styles.login_button : styles.login_button_unable}>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
