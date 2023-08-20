'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Tutorials = () => {
    const tutorials = [
        {
            id: 1,
            language: 'Java',
            image: `/java.png`
        },
        {
            id: 2,
            language: 'Kotlin',
            image: `/kotlin.png`
        },
        {
            id: 3,
            language: 'Spring Boot',
            image: `/spring-boot.png`
        },
        {
            id: 4,
            language: 'ReactJs',
            image: `/reactjs.png`
        },
        {
            id: 5,
            language: 'Javascript',
            image: `/js.png`
        },
        {
            id: 6,
            language: "Android",
            image: `/android.png`
        },
        {
            id: 7,
            language: 'MySQL',
            image: `/mysql.png`
        }
    ]
    const [courses, setCourses] = useState([])
    useEffect(() => {
        setCourses(tutorials)
    }, [])

    return (
        <div className={styles.container}>

            <h1 className={styles.title}>Tutorials</h1>

            <div className={styles.courses}>
                {
                    courses.map((item) => {
                        return <Link href={`/`} key={item.id}>
                            <div className={styles.card}>
                                <Image
                                    src={item.image}
                                    alt={item.language}
                                    width = {200}
                                    height = {200}
                                />
                                <h3>{item.language}</h3>

                            </div>

                        </Link>
                    })
                }
            </div>

        </div>
    )
}

export default Tutorials