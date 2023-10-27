'use client'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/loader/Loader'
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css'
import localFont from 'next/font/local'

const imgTitleFont = localFont({ src: '../../fonts/osiris.otf' })
const blogTitleFont = localFont({ src: "../../fonts/Corbert Condensed Black.otf" })
const blogDescriptionFont = localFont({ src: "../../fonts/NexaExtraLight.ttf" })
const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //testing 
    // fetch(`/dummy.json`)

    //production
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-all-blogs?pageNumber=${pageNumber}&pageSize=5`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data)
        setLoading(false)
      }
      );
  }, [pageNumber])

  const nextPage = async () => {
    setBlogs([])
    setPageNumber(prevActiveStep => prevActiveStep + 1)
  }
  const prevPage = async () => {
    setBlogs([])
    setPageNumber(prevActiveStep => prevActiveStep - 1)
  }
  if (blogs.length === 0 || loading) return <div className={styles.dummyContainer}>
    <Loader />
  </div>
  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleDiv}>
        <h1 className={`${styles.pageTitle} ${imgTitleFont.className}`}>Blogs</h1>
      </div>
      {blogs.map((item) => (
        <Link href={`/blogPost/${item.id}`} className={styles.container} key={item.id}>
          <div className={styles.imageContainer}>
            <Image
              src={item.image}
              alt=""
              width={300}
              height={200}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={`${styles.title} ${blogTitleFont.className}`}>{item.title}</h1>
            <p className={`${styles.desc} ${blogDescriptionFont.className}`}>{item.description.substring(0, 125)}</p>
          </div>
        </Link>
      ))}

      <div className={styles.pagination}>

        <button className={styles.nextBtn} style={{ display: `${pageNumber === 0 ? 'none' : 'block'}` }} onClick={prevPage}>
          Previous
        </button>
        <button className={styles.nextBtn} onClick={nextPage} style={{ display: `${blogs.length < 5 ? 'none' : 'block'}` }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Blog;
