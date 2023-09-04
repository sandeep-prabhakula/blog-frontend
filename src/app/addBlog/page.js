'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

const AddBlog = () => {
    const router = useRouter()

    const [uid, setUid] = useState('')

    const [blog,setBlog] = useState({
        title:"",
        description:"",
        postedAt:"",
        code:"",
        image:"",
    })
    useEffect(() => {
        if (!window.sessionStorage.getItem('currentUser')) {
            router.push('/login')
        } else {
            const temp = JSON.parse(window.sessionStorage.getItem('currentUser'))
            setUid(temp.jwtToken)
        }
    }, [])
    
    
    const handleChange = (e)=>{
        setBlog((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const addNewBLog = async (e) => {
        const payload = blog
        e.preventDefault()
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-blog`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${uid}`,
                'Access-Control-Allow-Origin':"*",
                'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
            }
        })
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Add new blog</h1>
            <form className={styles.form}>
                <input type="text" placeholder="title" className={styles.input} required onChange={handleChange} name='title'/>
                <input type="text" placeholder="imageURL" className={styles.input} required onChange={handleChange} name='image'/>
                <input type="date" placeholder="dd-mm-yyyy" className={styles.input} required onChange={handleChange} name='postedAt'/>
                <textarea
                    className={styles.textArea}
                    placeholder="description"
                    cols="30"
                    rows="10"
                    required
                    onChange={handleChange}
                    name='description'
                ></textarea>

                <textarea
                    className={styles.textArea}
                    placeholder="code"
                    cols="30"
                    rows="10"
                    onChange={handleChange}
                    name = 'code'
                ></textarea>
                <button className={styles.submitBtn} onClick={addNewBLog}>Send</button>
            </form>
        </div>
    )
}

export default AddBlog