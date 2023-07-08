'use client'
import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";

const Contact = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('')
  const onNameChange = (e) => {
    setName(e.target.value)
  }
  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const onMessageChange = (e) => {
    setMessage(e.target.value)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      'name': name,
      'email': email,
      'message': message
    }
    if (name === '' || email === '' || message === '') {
      setSuccess('')
      setError('Empty Credentials')
    } else if (!email.includes("@")) {
      setSuccess('')
      setError('Provide a valid email')
    }
    else {
      fetch(`${process.env.API_URL}/add-comment`, {
        method: 'POST',
        body: JSON.stringify(data), headers: {
          "Content-Type": "application/json",
        }
      }).then(() => {
        setError('')
        setSuccess('Message Sent :-)')
        setName('')
        setEmail('')
        setMessage('')
      }).catch(() => {
        setSuccess('')
        setError('something went wrong!!');
      })
    }

  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let&apos;s Keep in Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            src="/contact.png"
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
        <form className={styles.form}>
          {success && <small className={styles.success}>{success}</small>}
          {error && <small className={styles.error}>{error}</small>}
          <input type="text" placeholder="name" className={styles.input} onChange={onNameChange} required/>
          <input type="email" placeholder="email" className={styles.input} onChange={onEmailChange} required/>
          <textarea
            className={styles.textArea}
            placeholder="message"
            cols="30"
            rows="10"
            onChange={onMessageChange}
          ></textarea>
          <button className={styles.submitBtn} onClick={onSubmit}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Contact