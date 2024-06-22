'use client'
import React, { useEffect, useState, useCallback } from 'react'
import Loader from '@/components/loader/Loader'
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css'
import localFont from 'next/font/local'
import PrevButton from '@/components/prevButton/PrevButton';
import NextButton from '@/components/nextButton/NextButton';
import CloseButton from '@/components/closeButton/CloseButton';

const imgTitleFont = localFont({ src: '../../fonts/osiris.otf' })
const blogTitleFont = localFont({ src: "../../fonts/Corbert Condensed Black.otf" })
const blogDescriptionFont = localFont({ src: "../../fonts/NexaExtraLight.ttf" })
const Blog = () => {
  const [searchedblogs, setSearchedBlogs] = useState([])
  const [blogs, setBlogs] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletingBlogId, setDeletingBlogID] = useState('')
  useEffect(() => {
    async function fetchBlogs() {
      try {
        // PROD

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-all-blogs?pageNumber=${pageNumber}&pageSize=5`)

        // TEST

        // const res = await fetch(`http://localhost:8080/get-all-blogs?pageNumber=${pageNumber}&pageSize=5`, {
        //   cache: "no-store",
        // })
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
      setLoading(true)
      const url = `${process.env.NEXT_PUBLIC_API_URL}/search-blogs/${value}`
      const res = await fetch(url)
      const data = await res.json()
      setSearchedBlogs(data)
      setLoading(false)
    } else setSearchedBlogs([])

  }

  // Delete Blog

  const deleteBlog = async (e) => {
    // const blogId = e.currentTarget.getAttribute('blog-id')
    const blogId = deletingBlogId
    const url = `${process.env.NEXT_PUBLIC_API_URL}/delete-blog/${blogId}`
    // const url = `http://localhost:8080/delete-blog/${blogId}`
    try {

      await fetch(url, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(window.sessionStorage.getItem('currentUser')).jwtToken}`,
          'Access-Control-Allow-Origin': "*",
          'Access-Control-Allow-Methods': 'DELETE'
        }
      })
      setDeletingBlogID('')
      setShowDeleteModal(!showDeleteModal)
    } catch (error) {
      console.log(error)
    }
  }

  // Open and Close modals
  const modalPopup = (e) => {
    setDeletingBlogID(e.currentTarget.getAttribute('blog-id'))
    setShowDeleteModal(!showDeleteModal)
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
      {
        showDeleteModal &&
        <div className={styles.modalOverlay}>
          <div className={styles.modalWrapper}>
            <div className={styles.modal}>
              <div className={`${styles.modalHeader} ${blogTitleFont.className}`}>
                <div href="#" onClick={modalPopup}>
                  <CloseButton/>
                </div>
              </div>
              <div className={styles.modalBody}>
                <h3 className={`${blogTitleFont.className}`}>Deletion alert</h3>
                <h3 className={`${blogDescriptionFont.className}`}>Do you really want to delete this blog?</h3>
                <button className={styles.nextBtn} onClick={deleteBlog}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      }
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
              <div key={item.id}>
                {window.sessionStorage.getItem('currentUser') ? <Link href={{
                  pathname: '/edit',
                  query: {
                    id: item.id
                  }
                }}>
                  <Image
                    src='/images/editBlog.svg'
                    alt='edit'
                    width={48}
                    height={48} />
                </Link> : <></>}
                {window.sessionStorage.getItem('currentUser') ? <div >
                  <Image
                    src='/images/deleteBlog.svg'
                    alt='delete'
                    width={48}
                    height={48}
                    onClick={deleteBlog}
                    blog-id={item.id} />
                </div> : <></>}
                <Link href={`/blogPost/${item.id}`} className={styles.container} >

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
              </div>
            ))}

          </div> : <></>}
      </div>

      <div className={styles.titleDiv}>
        <h1 className={`${styles.pageTitle} ${imgTitleFont.className}`}>Blogs</h1>
      </div>
      {blogs.map((item) => (<div key={item.id}>
        {JSON.parse(window.sessionStorage.getItem('currentUser')).userData.roles === 'ROLE_ADMIN' ? <Link href={{
          pathname: '/edit',
          query: {
            id: item.id
          }
        }}>
          <Image
            src='/images/editBlog.svg'
            alt='edit'
            width={48}
            height={48} />
        </Link> : <></>}
        {JSON.parse(window.sessionStorage.getItem('currentUser')).userData.roles === 'ROLE_ADMIN' ? <div >
          <Image
            src='/images/deleteBlog.svg'
            alt='delete'
            width={48}
            height={48}
            onClick={modalPopup}
            blog-id={item.id} />
        </div> : <></>}
        <Link href={`/blogPost/${item.id}`} className={styles.container} >

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
            <p className={`${styles.desc} ${blogDescriptionFont.className}`}>{item.description.substring(0, 125)}...</p>
          </div>


        </Link>
      </div>
      ))}

      <div className={styles.pagination}>

        <span style={{ display: `${pageNumber === 0 ? 'none' : 'block'}` }} onClick={prevPage} >

        <PrevButton />
        </span>
        <span onClick={nextPage} style={{ display: `${blogs.length < 5 ? 'none' : 'block'}` }} >

        <NextButton />
        </span>

      </div>
    </div>
  );
};

export default Blog;
