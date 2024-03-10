'use client'
import React, { useEffect, useState, useCallback } from 'react'
import Loader from '@/components/loader/Loader'
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css'
import localFont from 'next/font/local'

const imgTitleFont = localFont({ src: '../../fonts/osiris.otf' })
const blogTitleFont = localFont({ src: "../../fonts/Corbert Condensed Black.otf" })
const blogDescriptionFont = localFont({ src: "../../fonts/NexaExtraLight.ttf" })
const Blog = () => {
  const [searchedblogs, setSearchedBlogs] = useState([])
  const [blogs, setBlogs] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchBlogs() {
      try {
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-all-blogs?pageNumber=${pageNumber}&pageSize=5`)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-all-blogs?pageNumber=${pageNumber}&pageSize=5`)
        const data = await res.json()
        setBlogs(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBlogs()
  }, [pageNumber])



  const debounce = (func) => {
    let timer
    return function (...args) {
      const context = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, 500)
    }
  }

  const onTextChangeListener = async (e) => {
    const value = e.target.value
    if (value.length !== 0) {
      // Api Call for search
      // ${process.env.NEXT_PUBLIC_API_URL}
      const url = `${process.env.NEXT_PUBLIC_API_URL}/search-blogs/${value}`
      const res = await fetch(url)
      const data = await res.json()
      setSearchedBlogs(data)
    } else setSearchedBlogs([])

  }

  const optimizedSearch = useCallback(debounce(onTextChangeListener), [])

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
      <div className={styles.searchDiv}>
        <input
          placeholder='Search here'
          className={`${styles.input}`}

          onChange={optimizedSearch}
        />
        {searchedblogs.length !== 0 ?
          <div className={`${styles.searchedPopup}`}>
            <h1 className={`${styles.title} ${blogDescriptionFont.className}`}>Blogs related to your search</h1>
            {searchedblogs.map((item) => (
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

          </div> : <></>}
      </div>

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
