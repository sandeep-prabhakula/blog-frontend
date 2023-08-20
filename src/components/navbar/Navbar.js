import React from 'react'
import styles from "./navbar.module.css";
import Link from 'next/link';
import Image from 'next/image';
import Icon from 'public/logo.png'
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
        <h1>
          Codeverse Chronicles
        </h1>
      </Link>
      <div className={styles.links}>
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Navbar