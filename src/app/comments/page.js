'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
// https://sandeep-prabhakula-blog-backend.up.railway.app
const Comments = () => {
  const [comments, setComments] = useState([])
  const params = useSearchParams()
  const uid = params.get('uid')
  useEffect(() => {
    fetch(`http://localhost:8080/get-all-comments/${uid}`, {
      method: 'GET'
    }).then((res)=>res.json())
    .then((data)=>{
      setComments(data)
    })
  }, [])

  return (
    <div className={styles.container}>
      {comments.map((item) => {
        const id = item.id+"-"+uid
        return <Link href={`/comments/${id}`} key={item.id}>
          <div className={styles.comment}>
            <h1 className={styles.title}>{item.name}</h1>
            <h2 className={styles.title}>{item.email}</h2>
            <p className={styles.desc}>{item.message.substring(0, 75)}</p>
          </div>
        </Link>
      })}
    </div>
  )
}

export default Comments