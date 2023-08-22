import React from 'react'
import styles from './footer.module.css'
import Link from 'next/link'
import Image from 'next/image'
const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h3>Sandeep Prabhakula </h3>
                <small className={styles.copyright}>&copy;Copyright 2023 Codeverse Chronicles</small>
            </div>
            <div className={styles.socialProfiles}>
                <ul>
                    <li><Link  href={`https://instagram.com/sandyo9o7`} target='_blank'>
                        <Image src='/images/instagram.svg'
                            height={24}
                            alt='instagram'
                            width={24} />
                    </Link></li>
                    <li><Link  href={`https://twitter.com/SandeepSandy_o9`} target='_blank'>
                        <Image src='/images/twitter.svg'
                        height={24}
                        alt='twitter'
                        width={24} />
                        </Link></li>
                    <li><Link  href={`https://linkedin.com/in/sandeep-prabhakula`} target='_blank'>
                        <Image src='/images/linkedin.svg'
                        height={24}
                        alt='linkedin'
                        width={24} />
                        </Link></li>
                    <li><Link  href={`https://github.com/sandeep-prabhakula`} target='_blank'>
                        <Image src='/images/github.svg'
                        height={24}
                        alt='github'
                        width={24} />
                        </Link></li>
                    <li><Link  href={`https://facebook.com/sandeep.prabhakula`} target='_blank'>
                        <Image
                        src='/images/facebook.svg'
                        alt='facebook'
                        height={24}
                        width={24} />
                        </Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer