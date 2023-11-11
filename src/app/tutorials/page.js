'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Button from '@/components/button/Button'
import localFont from 'next/font/local'

const imgTitleFont = localFont({ src: '../../fonts/osiris.otf' })
const courseTitleFont = localFont({ src: '../../fonts/Azedo-Bold.otf'})
const Tutorials = () => {
    const tutorials = [
        {
            id: 1,
            language: 'Java',
            image: `/images/java.svg`,
            url:`https://docs.oracle.com/en/java/`
        },
        {
            id: 2,
            language: 'Kotlin',
            image: `/images/kotlin.svg`,
            url:`https://play.kotlinlang.org/byExample/overview`
        },
        {
            id: 3,
            language: 'Spring',
            image: `/images/spring.svg`,
            url:`https://docs.spring.io/spring-framework/reference/index.html`
        },
        {
            id: 4,
            language: 'ReactJs',
            image: `/images/reactjs.svg`,
            url:`https://react.dev/`
        },
        {
            id: 5,
            language: 'Javascript',
            image: `/images/js.svg`,
            url:`https://developer.mozilla.org/en-US/docs/Web/JavaScript`
        },
        {
            id: 6,
            language: "Android",
            image: `/images/android.svg`,
            url:`https://developer.android.com/guide/components/fundamentals`
        },
        {
            id: 7,
            language: 'MySQL',
            image: `/images/mysql.svg`,
            url:`https://sqlbolt.com/`
        },
        {
            id: 8,
            language: 'solidity',
            image: `/images/solidity.svg`,
            url:`https://docs.soliditylang.org/en/v0.8.21/`
        }
    ]
    const [courses, setCourses] = useState([])
    useEffect(() => {
        setCourses(tutorials)
    }, [])

    return (
        <div className={styles.container}>

            <h1 className={`${styles.title} ${imgTitleFont.className}`}>Tutorials</h1>

            <div className={styles.courses}>
                {
                    courses.map((item) => {
                        return <div className={styles.card} key={item.id}>
                                <Image
                                    src={item.image}
                                    alt={item.language}
                                    width = {96}
                                    height = {96}
                                />
                                <h3 className={courseTitleFont.className}>{item.language}</h3>
                                <Button text={`Start Learning`} url={item.url}/>
                            </div>

                    })
                }
            </div>

        </div>
    )
}

export default Tutorials