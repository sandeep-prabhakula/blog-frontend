'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import localFont from 'next/font/local'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const imgTitleFont = localFont({ src: '../../fonts/osiris.otf' })
const Register = () => {

  const [error, setError] = useState('')
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
  }

  const handleChange = (e) => {
    setRegisterDTO((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const register = async () => {
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
        const url = `${process.env.NEXT_PUBLIC_API_URL}/register`
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify(registerDTO),
          headers: {
            "Content-Type": "application/json",
          }
        })
        router.push("/login")
      }
      catch (err) {
        console.error(err)
        setError('Something went wrong ‼')
      }
    }

  }
  return (
    <>
      <div className={styles.container}>
        <h1 className={`${styles.title} ${imgTitleFont.className}`}>Register</h1>
        <form className={styles.form}>

          {error && <small className={styles.error}>{error}</small>}
          <input type="email" placeholder="email" className={styles.input} onChange={handleChange} name='email' autoComplete='on' required />
          <input type="password" placeholder="password" className={styles.input} onChange={handleChange} name='password' required />
          <input type="password" placeholder="confirm password" className={styles.input} onChange={confirmPasswordHandler} name='password' required />
        </form>
        <button className={styles.loginBtn} onClick={register} type='submit'>Register</button>
        <Link href={`/login`}>
        Already a user ? Login
        </Link>
      </div>
    </>
  )
}

export default Register