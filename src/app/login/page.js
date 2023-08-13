'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const login = async (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            setError('Empty Credential not accpted!')
        } else if (!email.includes('@')) {
            setError('Provide a valid email id!!!')
        } else {
            setError('')
            const payload = {
                'email': email,
                'password': password
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authenticate`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json()
            window.sessionStorage.setItem('currentUser', JSON.stringify(data))
            router.push(`/comments`)
        }
    }

    const onEmailChanged = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordChanged = (e) => {
        setPassword(e.target.value)
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Sign in</h1>
            <form className={styles.form}>

                {error && <small className={styles.error}>{error}</small>}
                <input type="email" placeholder="name" className={styles.input} onChange={onEmailChanged} />
                <input type="password" placeholder="email" className={styles.input} onChange={onPasswordChanged} />
            </form>
            <button className={styles.loginBtn} onClick={login}>Login</button>
        </div>
    )
}

export default Login