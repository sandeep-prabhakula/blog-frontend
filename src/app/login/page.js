'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import localFont from 'next/font/local'
import Link from 'next/link'

const imgTitleFont = localFont({ src: '../../fonts/osiris.otf' })
const errorFont = localFont({src:'../../fonts/OpenSans.ttf'})
const Login = () => {

    const [error, setError] = useState('')
    const [success,setSuccess] = useState('')
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
            try {
                
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authenticate`, {
                    method: 'POST',
                    body: JSON.stringify(loginDTO),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const data = await res.json()
                window.sessionStorage.setItem('currentUser', JSON.stringify(data))
                if(data.userData.roles === 'ROLE_ADMIN')
                router.push(`/admin-console`)
            else router.push("/")
            } catch (error) {
                
                setError('Something went wrong!')
                console.log(error)
            }
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={`${styles.title} ${imgTitleFont.className}`}>Sign in</h1>
            <form className={styles.form} onSubmit={login}>

                {error && <small className={`${errorFont.className} ${styles.error}`}>{error}</small>}
                <input type="email" placeholder="email" className={styles.input} onChange={handleChange} name='email' autoComplete='on' />
                <input type="password" placeholder="password" className={styles.input} onChange={handleChange} name='password' />
                <button className={styles.loginBtn} type='submit' >Login</button>
            </form>
            <Link href={`/reset-password`} className={`${styles.toSignupPage}`}>Forgot Password?</Link>
            <Link href={`/register`} className={`${styles.toSignupPage}`}>Don't have an account? SignUp</Link>
        </div>
    )
}

export default Login