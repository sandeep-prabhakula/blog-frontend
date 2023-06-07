import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'

const tutorials = [
    {
        language: 'Java',
        image: 'public/java.png'
    },
    {
        language: 'Kotlin',
        image: 'public/kotlin.png'
    },
    {
        language: 'Spring Boot',
        image: 'public/spring-boot.png'
    },
    {
        language: 'ReactJs',
        image: 'public/reactjs.png'
    },
    {
        language: 'Javascript',
        image: 'public/js.png'
    },
    {
        language: "Android",
        image: 'public/android.png'
    },
    {
        language: 'MySQL',
        image: 'public/mysql.png'
    }
]

const Tutorials = () => {

    return (
        <div className={styles.container}>

            <h1 className={styles.title}>Tutorials</h1>
            {
                tutorials.map((item) => {
                    <Link href={`/`} as={`${item.image}`}>
                        <div className={styles.card}>
                            <Image
                                src={`${item.image}`}
                                alt={item.language}
                                width={200}
                                height={200}
                            />
                            <h3>{item.language}</h3>

                        </div>

                    </Link>
                })
            }
        </div>
    )
}

export default Tutorials