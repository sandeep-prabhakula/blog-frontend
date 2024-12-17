import React from 'react'
import styles from './page.module.css'

const getData = async(id)=>{
        
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/${id}`,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': 'GET'
      }
    })
    return res.json()
}

const Comment = async({params}) => {

    const data = await getData(params.id)
    
  return (
    <div className={styles.container}>
        <h2 className={styles.title}>Message from {data.name}</h2>
        <h4 className={styles.author}>{data.email}</h4>
        <p className={styles.message}>{data.message}</p>
        <a href={`mailto:${data.email}`} className={styles.replyBtn}>Reply with an email</a>
    </div>
  )
}

export default Comment