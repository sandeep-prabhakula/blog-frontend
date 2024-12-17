'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import localFont from 'next/font/local'
import Link from 'next/link'

const imgTitleFont = localFont({ src: '../../fonts/osiris.otf' })
const errorFont = localFont({ src: '../../fonts/OpenSans.ttf' })
const Login = () => {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
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
                setLoading(true)
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authenticate`, {
                    method: 'POST',
                    body: JSON.stringify(loginDTO),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const data = await res.json()
                window.sessionStorage.setItem('currentUser', JSON.stringify(data))
                if (data.userData.roles === 'ROLE_ADMIN') {
                    setLoading(false)
                    router.push(`/admin-console`)
                }
                else {
                    setLoading(false)
                    router.push("/")
                }
            } catch (error) {
                setLoading(false)
                setError('Something went wrong!')
                console.log(error)
            }
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={`${styles.title} ${imgTitleFont.className}`}>Sign in</h1>
            {error && <small className={`${errorFont.className} ${styles.error}`}>{error}</small>}




            <div className={`${styles.loginBox}`}>

                <form onSubmit={login}>
                    <div className={`${styles.userBox}`}>
                        <input type="email" required onChange={handleChange} name='email' autoComplete='on' />
                        <label>Email</label>
                    </div>
                    <div className={`${styles.userBox}`}>
                        <input type="password" required onChange={handleChange} name='password' />
                        <label>Password</label>
                    </div><center>
                        <button type='submit'>
                            {loading?'Loading...':'Login'}
                            <span></span>
                        </button></center>
                </form>
            </div>



            <Link href={`/reset-password`} className={`${styles.toSignupPage}`}>Forgot Password?</Link>
            <span className={`${styles.toSignupPage}`}>Don&apos;t have an account? <b>
                <Link href={`/register`}>SignUp</Link>
            </b>
            </span>
        </div>
    )
}

export default Login