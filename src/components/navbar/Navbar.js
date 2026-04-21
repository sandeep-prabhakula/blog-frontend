"use client"
import React, { useState, useEffect } from 'react';
import styles from "./navbar.module.css";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import Icon from 'public/images/logo.png'
import localFont from 'next/font/local'

const imgTitleFont = localFont({ src: '../../fonts/osiris.otf' })
const endPointFont = localFont({ src: '../../fonts/Azedo-Bold.otf'})
const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "About",
    url: "/about",
  },
  {
    id: 3,
    title: "Blogs",
    url: "/blogPost",
  },
  
  {
    id: 4,
    title: "Contact",
    url: "/contact",
  } 
];
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const[ip, setIp] = useState("")
  useEffect(() => {
    // Example: Check if user is logged in (replace with actual auth logic)
    const userLoggedIn = sessionStorage.getItem("currentUser") !== null;
    setIsLoggedIn(userLoggedIn);

    async function getIP() {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-client-ip`)
        const data = await res.json()
        setIp(data.get("clientIP"));
      }catch(error){
        console.error(error);
      }
    }
    getIP()
  }, []);
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        <Image
          src={Icon}
          width={75}
          height={75}
          alt='logo'
        />
        <h1 className={imgTitleFont.className}>
          Codeverse Chronicles
        </h1>
      </Link>
      <div className={styles.links}>
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={`${styles.link} ${endPointFont.className}`}>
            {link.title}
          </Link>
        ))}
        <p>{ip}</p>
      </div>
    </div>
  )
}

export default Navbar