'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
const Comments = () => {
  const [comments, setComments] = useState([])
  const getComments = async()=>{
  let jwtToken = ""
    if(window.sessionStorage.getItem('currentUser')){
      jwtToken = await JSON.parse(window.sessionStorage.getItem('currentUser')).jwtToken
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-all-comments`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': "*",
        "Authorization": `Bearer `+jwtToken,
      }
    })
    const data = await res.json()
    setComments(data)
  }
  useEffect(() => {
    async function tempComments(){
      await(getComments())
    } 
    tempComments()    
  }, [])

  return (
    <div className={styles.container}>
      {comments.map((item) => {
        return <div className={styles.comment} key={item.id}>
          <h1 className={styles.title}>{item.name}</h1>
          <h2 className={styles.title}>{item.email}</h2>
          <p className={styles.desc}>{item.message}</p>
        </div>
      })}
    </div>
  )
}

export default Comments