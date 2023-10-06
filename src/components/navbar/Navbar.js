import React from 'react'
import styles from "./navbar.module.css";
import Link from 'next/link';
import Image from 'next/image';
import Icon from 'public/logo.png'
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
    title: "Tutorials",
    url: "/tutorials",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Login",
    url: "/login",
  },
  
];
const Navbar = () => {
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
      </div>
    </div>
  )
}

export default Navbar