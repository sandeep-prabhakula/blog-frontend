'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
const AddBlog = () => {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [imageURL, setImageURL] = useState('')
    const [date, setDate] = useState('')
    const [desc, setDesc] = useState('')
    const [code, setCode] = useState('')
    const [uid, setUid] = useState('')
    useEffect(() => {
        if (!window.sessionStorage.getItem('currentUser')) {
            router.push('/login')
        } else {
            const temp = JSON.parse(window.sessionStorage.getItem('currentUser'))
            setUid(temp.id)
        }
    }, [])
    const onTitleChanged = (e) => {
        setTitle(e.target.value)
    }
    const onDescChange = (e) => {
        setDesc(e.target.value)
    }
    const onImageURLChange = (e) => {
        setImageURL(e.target.value)
    }
    const onCodeChange = (e) => {
        setCode(e.target.value)
    }
    const onDateChange = (e) => {
        setDate(e.target.value)
    }
    const addNewBLog = async (e) => {
        const payload = {
            "title": title,
            "postedAt": date,
            "image": imageURL,
            "code": code,
            "description": desc
        }
        e.preventDefault()
        const res = await fetch(`https://sandeep-prabhakula-blog-backend.up.railway.app/add-blog/${uid}`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            }
        })
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Add new blog</h1>
            <form className={styles.form}>
                <input type="text" placeholder="title" className={styles.input} required onChange={onTitleChanged} />
                <input type="text" placeholder="imageURL" className={styles.input} required onChange={onImageURLChange} />
                <input type="date" placeholder="dd-mm-yyyy" className={styles.input} required onChange={onDateChange} />
                <textarea
                    className={styles.textArea}
                    placeholder="description"
                    cols="30"
                    rows="10"
                    required
                    onChange={onDescChange}
                ></textarea>

                <textarea
                    className={styles.textArea}
                    placeholder="code"
                    cols="30"
                    rows="10"
                    onChange={onCodeChange}
                ></textarea>
                <button className={styles.submitBtn} onClick={addNewBLog}>Send</button>
            </form>
        </div>
    )
}

export default AddBlog