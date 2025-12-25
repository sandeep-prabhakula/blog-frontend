import React from 'react'
import styles from './footer.module.css'
import Link from 'next/link'
import Image from 'next/image'
import localFont from 'next/font/local'
const endPointFont = localFont({ src: '../../fonts/osiris.otf' })
const links = [
    
    {
      id: 1,
      image: "/images/linkedin.svg",
      url: "https://linkedin.com/in/sandeep-prabhakula",
    },
    {
      id: 2,
      image: "/images/github.svg",
      url: "https://github.com/sandeep-prabhakula",
    },
    {
      id:3,
      image:'/images/mail.svg',
      url:"mailto:codeverse.chronicles.tech.blogs@gmail.com"
    }
    
  ];
const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h3 className={`${endPointFont.className}`}>Sandeep Prabhakula </h3>
                <small className={`${endPointFont.className} ${styles.copyright}`}>&copy;Copyright {new Date().getFullYear()} Codeverse Chronicles</small>
            </div>
            <div className={styles.socialProfiles}>

                {links.map((item)=>{
                    return <Link  href={item.url} target='_blank' key={item.id}>
                    <Image src={item.image}
                    height={24}
                    alt={item.url}
                    width={24} />
                    </Link>
                })}
            </div>
        </div>
    )
}

export default Footer