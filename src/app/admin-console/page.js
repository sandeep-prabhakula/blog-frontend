'use client'
import React, {useEffect, useState } from 'react'
import styles from './adminConsole.module.css'
import localFont from 'next/font/local'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const imgTitleFont = localFont({ src: '../../fonts/osiris.otf' })

const AdminConsole = () => {
  const url = 'https://search.google.com/search-console/performance/search-analytics?resource_id=https%3A%2F%2Fcodeverse-chronicles.vercel.app%2F&search_type=WEB'

  const [hover, setHover] = useState(false)
  const onMouseHoverOnComposeButton = () => {
    setHover(true)
  }
  const onMouseOutOnComposeButton = () => {
    setHover(false)
  }
  const router = useRouter()
  const [user,setUser] = useState({})

  useEffect(() => {
    if (JSON.parse(window.sessionStorage.getItem('currentUser')).userData.roles !== "ROLE_ADMIN"){
        router.push('/login')
    }else{
      const temp = JSON.parse(window.sessionStorage.getItem('currentUser'))
      setUser(temp)
    }
}, [])

  return (
    <>

      <h1 className={`${imgTitleFont.className} ${styles.title}`}>Admin Console</h1>
      <div className={`${styles.container}`}>
        <a href={`${url}`} target='_blank'>
          <button className={`${styles.floatingActionButton} ${imgTitleFont.className}`}>
            view website insights
          </button>

        </a>
        <Link href={`/addBlog`}>

          <button className={`${styles.floatingActionButton} ${imgTitleFont.className}`} onMouseOver={onMouseHoverOnComposeButton} onMouseOut={onMouseOutOnComposeButton}>
            <Image src={`/images/pencil.svg`}
              height={24}
              alt='Compose new Blog'
              width={24}
            />

            <span style={{
              'display': `${hover === true ? 'block' : 'none'}`,
            }}>Compose</span>
          </button>
        </Link>
      </div>

    </>
  )
}

export default AdminConsole