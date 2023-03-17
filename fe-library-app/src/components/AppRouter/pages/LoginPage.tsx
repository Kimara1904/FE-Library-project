import { createRef, useState } from 'react'

import { useNavigate } from 'react-router'
import axios, { AxiosError } from 'axios'

import { login } from '../../../services/AuthService'
import styles from './LoginPage.module.css'

const LoginPage = () => {
  const [ emailError, setEmailError ] = useState(false)
  const [ passwordError, setPasswordError ] = useState(false)
  const [ loginError, setLoginError ] = useState(false)

  const navigation = useNavigate()

  const emailRef = createRef<HTMLInputElement>()
  const passwordRef = createRef<HTMLInputElement>()

  const handleBlurEmail = () => {
    if (emailRef.current?.value.trim().length === 0) {
      setEmailError(true)
    }
  }

  const handleBlurPassword = () =>{
    if (passwordRef.current?.value.trim().length === 0) {
      setPasswordError(true)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const enteredEmail = emailRef.current?.value as string
    const enteredPassword = passwordRef.current?.value as string

    if (enteredEmail.trim().length === 0) {
      setEmailError(true)
      return
    }

    if (enteredPassword.trim().length === 0) {
      setPasswordError(true)
      return
    }

    login(enteredEmail, enteredPassword)
      .then((response) => {
        sessionStorage.setItem('token', response.data.AccessToken)
        navigation('/home')
        window.location.reload()
      })
      .catch((error: AxiosError) => {
        if (axios.isAxiosError(error)) {
          setLoginError(true)
        }
      })
  }

  return (
    <div className={styles.login_form}>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.login_label_desc}>Email</label>
          <input className={emailError ? styles.login_input_invalid : ''} type='text' name='email' ref={emailRef} onBlur={handleBlurEmail} onFocus={() => setEmailError(false)}/>
        </div>
        <label className={!emailError ? styles.success_login_input : styles.err_login_input}>Email is required</label>
        <div>
          <label className={styles.login_label_desc}>Password</label>
          <input className={passwordError ? styles.login_input_invalid : ''} type='password' name='password' ref={passwordRef} onBlur={handleBlurPassword} onFocus={() => setPasswordError(false)}/>
        </div>
        <label className={!passwordError ? styles.success_login_input : styles.err_login_input}>Password is required</label>
        <div className={styles.form_div_button_label_error}>
          <label className={!loginError ? styles.success_login_credentials : styles.err_login_credentials}>Wrong credentials</label>
          <button className={styles.login_button}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
