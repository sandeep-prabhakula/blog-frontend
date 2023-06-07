import React from 'react'
import styles from './footer.module.css'
import Link from 'next/link'
const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h3>Sandeep Prabhakula </h3>
                <small className={styles.copyright}>&copy;Copyright 2023 Codeverse Chronicles</small>
            </div>
            <div className={styles.socialProfiles}>
                <ul>
                    <li><Link href={`https://instagram.com/sandyo9o7`}>Instagram</Link></li>
                    <li><Link href={`https://twitter.com/SandeepSandy_o9`}>Twitter</Link></li>
                    <li><Link href={`https://linkedin.com/in/sandeep-prabhakula`}>LinkedIn</Link></li>
                    <li><Link href={`https://github.com/sandeep-prabhakula`}>Github</Link></li>
                    <li><Link href={`https://linktree.com/sandeepprabhakula`}>Linktree</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer