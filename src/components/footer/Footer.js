import React from 'react'
import styles from './footer.module.css'
import Link from 'next/link'
import Image from 'next/image'
const links = [
    {
      id: 1,
      image: "/images/instagram.svg",
      url: "https://instagram.com/sandyo9o7",
    },
    {
      id: 2,
      image: "/images/twitter.svg",
      url: "https://twitter.com/SandeepSandy_o9",
    },
    {
      id: 3,
      image: "/images/linkedin.svg",
      url: "https://linkedin.com/in/sandeep-prabhakula",
    },
    {
      id: 4,
      image: "/images/github.svg",
      url: "https://github.com/sandeep-prabhakula",
    },
    {
      id: 5,
      image: "/images/facebook.svg",
      url: "https://facebook.com/sandeep.prabhakula",
    },
    
  ];
const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h3>Sandeep Prabhakula </h3>
                <small className={styles.copyright}>&copy;Copyright 2023 Codeverse Chronicles</small>
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