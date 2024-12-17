'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import localFont from 'next/font/local'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const imgTitleFont = localFont({ src: '../../fonts/osiris.otf' })
const Register = () => {

  const [error, setError] = useState('')
  const [loading,setLoading] = useState(false)
  const router = useRouter()
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  const [registerDTO, setRegisterDTO] = useState({
    "email": "",
    "password": "",
    "roles": "ROLE_USER",
  })

  const [confirmPassword, setConfirmPassword] = useState('')

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value)
    if (e.target.value !== registerDTO.password) setError(`Password didn't match`)
    else setError('')
  }

  const handleChange = (e) => {
    setRegisterDTO((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (e.target.name === 'email' && !/\S+@\S+\.\S+/.test(registerDTO.email)) {
      setError('Provide a valid email id');
      return;
    }
    else setError('')
    if (e.target.name === 'password' && !regex.test(registerDTO.password) || registerDTO.password.length < 8) {
      setError('Setup a strong Password!')
      return
    }
    else setError('')
  }

  const register = async (e) => {
    e.preventDefault()
    if (!registerDTO.email || !registerDTO.password || !confirmPassword) {
      setError('Empty Credential not accepted!')
    }
    else if (!/\S+@\S+\.\S+/.test(registerDTO.email)) {
      setError('Provide a valid email id!!!')
    }
    else if (confirmPassword !== registerDTO.password) {
      setError("Password did not match")
    } else if (!regex.test(registerDTO.password) || registerDTO.password.length < 8) {
      setError("Provide a valid password")
    }
    else {
      try {
        setLoading(true)
        const url = `${process.env.NEXT_PUBLIC_API_URL}/register`
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify(registerDTO),
          headers: {
            "Content-Type": "application/json",
          }
        })
        setLoading(false)
        router.push("/login")
      }
      catch (err) {
        setLoading(false)
        console.error(err)
        setError('Something went wrong ‼')
      }
    }

  }
  return (
    <>
      <div className={styles.container}>
        <h1 className={`${styles.title} ${imgTitleFont.className}`}>Register</h1>
        {error && <small className={styles.error}>{error}</small>}
        <div className={`${styles.loginBox}`}>

          <form onSubmit={register}>
            <div className={`${styles.userBox}`}>
              <input type="email" required onChange={handleChange} name='email' autoComplete='on' />
              <label>Email</label>
            </div>
            <div className={`${styles.userBox}`}>
              <input type="password" required onChange={handleChange} name='password' />
              <label>Password</label>
            </div>
            <div className={`${styles.userBox}`}>
              <input type="password" required onChange={confirmPasswordHandler} name='password' />
              <label>Confirm Password</label>
            </div>
            <center>
              <button type='submit'>
                {loading? 'Loading ... ':'Register'}
                <span></span>
              </button></center>
          </form>
        </div>
        <span className={`${styles.toLoginPage}`}>
          Already a user ? <b>
            <Link href={`/login`}>Login</Link>
            </b>
        </span>
      </div>
    </>
  )
}

export default Register