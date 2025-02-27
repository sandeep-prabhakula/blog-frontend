import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import localFont from 'next/font/local'

const imgTitleFont = localFont({ src: '../../fonts/osiris.otf' })
const imgDescFont = localFont({ src: '../../fonts/Azedo-Bold.otf' })
const descFont = localFont({src:'../../fonts/OpenSans.ttf'})
const about = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="/aboutImage.webp"
          fill={true}
          alt=""
          className={styles.img}
        />
        <div className={styles.imgText}>
          <h1 className={`${styles.imgTitle} ${imgTitleFont.className}`}>Codeverse Chronicles</h1>
          <h2 className={`${styles.imgDesc} ${imgDescFont.className}`}>
            Where Innovation Meets Coding Excellence
          </h2>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={`${styles.title} ${imgTitleFont.className}`}>Who Am I?</h1>
          <p className={`${descFont.className}`}>
            I&apos;m a technology enthusiast and coding specialist that want to share my expertise and thoughts with the rest of the world. My objective is to help people understand the ever-changing world of technology, remain up to speed on the newest trends, and improve their coding abilities.
            <br />
            <br />
            I&apos;m, at my heart, a technology and coding blog that seeks to be a trustworthy source of knowledge for computer lovers of all levels. I select and develop information on a variety of topics, such as new technology updates, emerging and trending technologies, and the principles of Data Structures and Algorithms (DSA).
          </p>
        </div>
        <div className={styles.item}>
          <h1 className={`${styles.title} ${imgTitleFont.className}`}>What I Do?</h1>
          <p className={`${descFont.className}`}>
            I&apos;m committed to providing you with the most up-to-date information and insights into the ever-changing realm of technology. I scours the internet landscape for high-quality articles covering a wide range of topics, from new technology updates to emerging and trending technologies.
            <br />
            <br />
            I realise how critical it is to stay ahead in this continuously changing digital world. That is why my blog is your one-stop shop for all things technological. I offer something for everyone, whether you&apos;re a seasoned professional or an inquisitive novice. Meticulously prepared articles take deep dives into a variety of tech fields, including detailed explanations, tutorials, and real-world applications.
          </p>
          
        </div>
      </div>
    </div>
  )
}

export default about