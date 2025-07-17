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
  const logoutURL = `${process.env.NEXT_PUBLIC_API_URL}/logout`
  // const logoutURL = "http://localhost:8080/logout"
  const logout = async(e)=>{
    const response = await fetch(logoutURL,{
      method:"POST",
      headers:{
        Authorization: `Bearer ${user.jwtToken}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      }
    })
    const res =await response.text()
    console.log(res)
    if(res === "Logout successful"){
      window.sessionStorage.removeItem('currentUser')
      router.push("/login")
    }
  }
  useEffect(() => {
    let user = window.sessionStorage.getItem('currentUser')
    if (user===null || JSON.parse(window.sessionStorage.getItem('currentUser')).userData.roles !== "ROLE_ADMIN"){
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
        <button className={`${styles.floatingActionButton} ${imgTitleFont.className}`} onClick={logout}>
            Logout
          </button>
      </div>
            
    </>
  )
}

export default AdminConsole