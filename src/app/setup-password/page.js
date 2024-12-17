'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import localFont from 'next/font/local'
import Link from 'next/link'

const imgTitleFont = localFont({ src: '../../fonts/osiris.otf' })
const SetupPassword = () => {
    const searchParams = useSearchParams()
    const uid = searchParams.get('id')
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    const [error, setError] = useState('')
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const onConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const setupPassword = async () => {

        if (confirmPassword !== password) {
            setError("Password did not match")
        } else if (!regex.test(password) || password.length < 8) {
            setError("Provide a valid password")
        }
        else {
            try {
                const url = `${process.env.NEXT_PUBLIC_API_URL}/reset-password`
                await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        'uid':uid,
                        'password':password
                    }),
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
        <div className={styles.container}>
            <h1 className={`${styles.title} ${imgTitleFont.className}`}>Setup new password</h1>
            <form className={styles.form}>

                {error && <small className={styles.error}>{error}</small>}
                <input type="password" placeholder="password" className={styles.input} onChange={onPasswordChange} name='password' autoComplete='on' />
                <input type="password" placeholder="confirm password" className={styles.input} onChange={onConfirmPasswordChange} name='confirmPassword' />

            </form>
            <button className={styles.loginBtn} onClick={setupPassword}>Update password</button>

        </div>
    )
}

export default SetupPassword