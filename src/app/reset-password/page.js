"use client";
import React, { useState } from "react";
import localFont from "next/font/local";
import styles from "./page.module.css";

const imgTitleFont = localFont({ src: "../../fonts/osiris.otf" });
const ResetPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const sendResetPasswordLink = async () => {
    try {
      setError("");
      setSuccess("");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/send-mail?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (res.status === 200)
        setSuccess(
          "Mail sent to the email. Please check the spam folder if not found"
        );
      if (res.status === 204)
        setError(`Mail ID ${email} not found in our servers.`);
      else setError("Internal Server Error");
    } catch (error) {
      // setError(error)
      console.log(error);
    }
    // const data = await res.json()
    // console.log(data);
  };
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${imgTitleFont.className}`}>
        Forgot Password
      </h1>
      <form className={styles.form}>
        {success && <small className={styles.success}>{success}</small>}
        {error && <small className={styles.error}>{error}</small>}
        <input
          type="email"
          placeholder="email"
          className={styles.input}
          onChange={handleChange}
          name="email"
          autoComplete="on"
        />
        {/* <input type="password" placeholder="password" className={styles.input} onChange={handleChange} name='password' /> */}
      </form>
      <button className={styles.loginBtn} onClick={sendResetPasswordLink}>
        Send email
      </button>
      {/* <Link href={`/register`} className={`${styles.toSignupPage}`}>New User? SignUp</Link> */}
    </div>
  );
};

export default ResetPassword;
