import React from 'react'
import styles from './card.module.css'
import Image from 'next/image'
import localFont from 'next/font/local'

const blogTitleFont = localFont({ src: "../../fonts/Corbert Condensed Black.otf" })
const blogDescriptionFont = localFont({ src: "../../fonts/NexaExtraLight.ttf" })
const Card = ({ blog }) => {
    return (
        <>
            <div className={`${styles.card}`}>
                <div className={`${styles.cardImage}`}>
                    <Image
                        src={blog.image}
                        width={300}
                        height={200}
                    />
                </div>
                <p className={`${styles.cardTitle} ${blogTitleFont.className}`}>{blog.title}</p>
                <p className={`${styles.cardBody} ${blogDescriptionFont.className}`}>
                    {blog.description}
                </p>
            </div>
        </>
    )
}

export default Card