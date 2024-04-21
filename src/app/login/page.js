'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import localFont from 'next/font/local'
import Link from 'next/link'

const imgTitleFont = localFont({ src: '../../fonts/osiris.otf' })
const Login = () => {

    const [error, setError] = useState('')
    const router = useRouter()
    const [loginDTO, setLoginDTO] = useState({
        "email": "",
        "password": ""
    })

    const handleChange = (e) => {
        setLoginDTO((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const login = async (e) => {
        e.preventDefault()
        if (loginDTO.email === '' || loginDTO.password === '') {
            setError('Empty Credential not accepted!')
        } else if (!loginDTO.email.includes('@')) {
            setError('Provide a valid email id!!!')
        } else {
            setError('')
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authenticate`, {
                method: 'POST',
                body: JSON.stringify(loginDTO),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json()
            window.sessionStorage.setItem('currentUser', JSON.stringify(data))
            router.push(`/`)
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={`${styles.title} ${imgTitleFont.className}`}>Sign in</h1>
            <form className={styles.form}>

                {error && <small className={styles.error}>{error}</small>}
                <input type="email" placeholder="email" className={styles.input} onChange={handleChange} name='email' autoComplete='on' />
                <input type="password" placeholder="password" className={styles.input} onChange={handleChange} name='password' />
                <Link href={`/reset-password`} className={`${styles.toSignupPage}`}>Forgot Password?</Link>
            </form>
            <button className={styles.loginBtn} onClick={login}>Login</button>
            <Link href={`/register`} className={`${styles.toSignupPage}`}>New User? SignUp</Link>
        </div>
    )
}

export default Login