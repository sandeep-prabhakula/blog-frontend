'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import localFont from 'next/font/local'

const imgTitleFont = localFont({ src: '../../fonts/osiris.otf' })
const EditBlog = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('id')
    const [uid, setUid] = useState('')

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('')

    const [blog, setBlog] = useState({
        id:"",
        title: "",
        description: "",
        postedAt: "",
        image: "",
    })
    useEffect(() => {
        // const {data} = props.id 
        
        if (!window.sessionStorage.getItem('currentUser')) {
            router.push('/login')
        } else {
            const temp = JSON.parse(window.sessionStorage.getItem('currentUser'))
            setUid(temp.jwtToken)
            
            // PROD

            // prodBlog()


            // TEST
            // testBlog()

              
        }
        prodBlog()
    }, [])

    const testBlog = async()=>{
        const res = await fetch(`http://localhost:3000/dummy.json`, {
            cache: "no-store",
          })
          const data = await res.json()
          setBlog(data[query])
    }
    const prodBlog = async()=>{
        // ${process.env.NEXT_PUBLIC_API_URL}
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${query}`, {
            cache: "no-store",
          })
          const data = await res.json()
          setBlog(data)
    }


    const handleChange = (e) => {
        setBlog((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const UpdateBLog = async (e) => {
        setError('')
        setSuccess('')
        const payload = blog
        e.preventDefault()
        if (payload.title !== '' && payload.description !== "" && payload.postedAt !== '' && payload.image !== '') {
            try {

                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-blog`, {
                    method: 'PUT',
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${uid}`,
                        'Access-Control-Allow-Origin': "*",
                        'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
                    }
                })
                setSuccess('Blog Updated Successfully')
            } catch (error) {
                setError('Something went Wrong')
            }
        }else {
            setError('All fields are mandatory')
        }

    }
    return (
        <div className={styles.container}>
            <h1 className={`${styles.title} ${imgTitleFont.className}`}>Update blog</h1>
            {success && <small className={styles.success}>{success}</small>}
            {error && <small className={styles.error}>{error}</small>}
            <form className={styles.form}>
                <input type="text" placeholder="title" className={styles.input} required onChange={handleChange} name='title' value={blog.title!==''?blog.title:""} />
                <input type="text" placeholder="imageURL" className={styles.input} required onChange={handleChange} name='image' value={blog.image!==''?blog.image:""} />
                {/* <input type="date" placeholder="dd-mm-yyyy" className={styles.input} required onChange={handleChange} name='postedAt' value={blog.postedAt!==''?blog.postedAt:""} /> */}
                <textarea
                    className={styles.textArea}
                    placeholder="description"
                    cols="30"
                    rows="10"
                    required
                    onChange={handleChange}
                    name='description'
                    value={blog.description!==''?blog.description:""}
                ></textarea>

                <button className={styles.submitBtn} onClick={UpdateBLog}>Send</button>
            </form>
        </div>
    )
}

export default EditBlog