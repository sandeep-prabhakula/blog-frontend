"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import localFont from "next/font/local";

const imgTitleFont = localFont({ src: "../../fonts/osiris.otf" });
const Contact = () => {
  const [comment, setComment] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setComment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const data = comment;

    if (data.name === "" || data.email === "" || data.message === "") {
      setSuccess("");
      setError("Empty Credentials");
    } else if (!data.email.includes("@")) {
      setSuccess("");
      setError("Provide a valid email");
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-comment`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          setError("");
          setComment({
            name: "",
            email: "",
            message: "",
          });
          setSuccess("Message Sent :-)");
        })
        .catch(() => {
          setSuccess("");
          setError("something went wrong!!");
        });
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${imgTitleFont.className}`}>
        Let&apos;s Keep in Touch
      </h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            src="/contact.png"
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          {success && <small className={styles.success}>{success}</small>}
          {error && <small className={styles.error}>{error}</small>}
          <input
            type="text"
            placeholder="name"
            className={styles.input}
            onChange={handleChange}
            required
            name="name"
            value={comment.name}
          />
          <input
            type="email"
            placeholder="email"
            className={styles.input}
            onChange={handleChange}
            required
            name="email"
            value={comment.email}
          />
          <textarea
            className={styles.textArea}
            placeholder="message"
            cols="30"
            rows="10"
            onChange={handleChange}
            name="message"
            value={comment.message}
          ></textarea>
          <button
            className={styles.submitBtn}
            
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
