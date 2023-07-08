'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  useEffect(() => {
    fetch(`${process.env.API_URL}/get-all-blogs?pageNumber=${pageNumber}&pageSize=5`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data)
      }
      );
  }, [pageNumber])

  const nextPage = async () => {
    setPageNumber(prevActiveStep => prevActiveStep + 1)
  }
  const prevPage = async () => {
    setPageNumber(prevActiveStep => prevActiveStep - 1)
  }
  if (blogs.length === 0) return <h3 className={styles.desc}>No blogs found</h3>
  return (
    <div className={styles.mainContainer}>
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
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.description.substring(0, 125)}</p>
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
