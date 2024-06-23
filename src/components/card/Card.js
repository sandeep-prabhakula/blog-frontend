import React from 'react'
import styles from './card.module.css'
import Image from 'next/image'
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
                <p className={`${styles.cardTitle}`}>{blog.title}</p>
                <p className={`${styles.cardBody}`}>
                    {blog.description.substring(0, 125)}...
                </p>
                <p className={`${styles.footer}`}>Written by <span className={`${styles.byName}`}>Sandeep Prabhakula</span> on <span className={`${styles.date}`}>{ blog.postedAt}</span></p>
            </div>
        </>
    )
}

export default Card