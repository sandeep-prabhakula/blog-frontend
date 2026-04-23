"use client";
import Dropdown from "@/components/dropdown/Dropdown";
import React, { useEffect, useState, useCallback } from "react";
import Loader from "@/components/loader/Loader";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import localFont from "next/font/local";
import PrevButton from "@/components/prevButton/PrevButton";
import NextButton from "@/components/nextButton/NextButton";
import CloseButton from "@/components/closeButton/CloseButton";
import Card from "@/components/card/Card";
import { useRouter, usePathname, useSearchParams } from "next/navigation"; // Added imports
const imgTitleFont = localFont({ src: "../../fonts/osiris.otf" });
const blogTitleFont = localFont({
  src: "../../fonts/Corbert Condensed Black.otf",
});
const blogDescriptionFont = localFont({
  src: "../../fonts/NexaExtraLight.ttf",
});
const Blog = () => {
  const [searchedblogs, setSearchedBlogs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingBlogId, setDeletingBlogID] = useState("");
  const [curUser, setCurUser] = useState({});
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageNumber = Number(searchParams.get("pageNumber")) || 0;
  const selectedValue = Number(searchParams.get("pageSize")) || 5;

    useEffect(() => {
    if (!searchParams.has("pageNumber") || !searchParams.has("pageSize")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("pageNumber", pageNumber.toString());
      params.set("pageSize", selectedValue.toString());
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, []);

  const updateURL = (newPage, newSize) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNumber", newPage.toString());
    params.set("pageSize", newSize.toString());
    router.push(`${pathname}?${params.toString()}`);
  };
  
  useEffect(() => {
    
    async function fetchBlogs() {
      try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-all-blogs?pageNumber=${pageNumber}&pageSize=${selectedValue}`)
        
        setCurUser(JSON.parse(window.sessionStorage.getItem("currentUser")));
        const data = await res.json();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlogs();
  }, [pageNumber,selectedValue]);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const onTextChangeListener = async (e) => {
    const value = e.target.value;
    if (value.length !== 0) {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/search-blogs/${value}`;
      const res = await fetch(url);
      const data = await res.json();
      setSearchedBlogs(data);
      setLoading(false);
    } else setSearchedBlogs([]);
  };

  // Delete Blog

  const deleteBlog = async (e) => {
    
    const blogId = deletingBlogId;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/delete-blog/${blogId}`;
    
    try {
      await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(window.sessionStorage.getItem("currentUser")).jwtToken
          }`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE",
        },
      });
      setDeletingBlogID("");
      setShowDeleteModal(!showDeleteModal);
    } catch (error) {
      console.log(error);
    }
  };

  // dropdown pagesize
  const handleValueChange = async(newValue) => {
    
    updateURL(0, newValue);
  };

  // Open and Close modals
  const modalPopup = (e) => {
    setDeletingBlogID(e.currentTarget.getAttribute("blog-id"));
    setShowDeleteModal(!showDeleteModal);
  };

  const optimizedSearch = useCallback(debounce(onTextChangeListener), []);

  const nextPage = async () => {
    setBlogs([]);
    updateURL(pageNumber + 1, selectedValue);
  };
  const prevPage = async () => {
    setBlogs([]);
    updateURL(Math.max(0, pageNumber - 1), selectedValue);
  };

  if (blogs.length === 0 || loading)
    return (
      <div className={styles.dummyContainer}>
        <Loader />
      </div>
    );
  return (
    <div className={styles.mainContainer}>
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalWrapper}>
            <div className={styles.modal}>
              <div
                className={`${styles.modalHeader} ${blogTitleFont.className}`}
              >
                <div href="#" onClick={modalPopup}>
                  <CloseButton />
                </div>
              </div>
              <div className={styles.modalBody}>
                <h3 className={`${blogTitleFont.className}`}>Deletion alert</h3>
                <h3 className={`${blogDescriptionFont.className}`}>
                  Do you really want to delete this blog?
                </h3>
                <button className={styles.deleteBtn} onClick={deleteBlog}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.searchDiv}>
        <input
          placeholder="Search here"
          className={`${styles.input}`}
          onChange={optimizedSearch}
        />

        
        {searchedblogs.length !== 0 ? (
          <div className={`${styles.searchedPopup}`}>
            <h1 className={`${styles.title} ${blogDescriptionFont.className}`}>
              Blogs related to your search
            </h1>
            <div className={styles.mappingCards}>
              {searchedblogs.map((item) => (
                <div key={item.id}>
                  {window.sessionStorage.getItem("currentUser") ? (
                    <Link
                      href={{
                        pathname: "/edit",
                        query: {
                          id: item.id,
                        },
                      }}
                    >
                      <Image
                        src="/images/editBlog.svg"
                        alt="edit"
                        width={48}
                        height={48}
                      />
                    </Link>
                  ) : (
                    <></>
                  )}
                  {window.sessionStorage.getItem("currentUser") ? (
                    <div>
                      <Image
                        src="/images/deleteBlog.svg"
                        alt="delete"
                        width={48}
                        height={48}
                        onClick={deleteBlog}
                        blog-id={item.id}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  <Link href={`/blogPost/${item.id}`}>
                    <Card blog={item} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className={styles.titleDiv}>
        <h1 className={`${styles.pageTitle} ${imgTitleFont.className}`}>
          Blogs
        </h1>
        <Dropdown selectedValue={selectedValue}onValueChange={handleValueChange} />
      </div>
      <div className={styles.mappingCards}>
        {blogs.map((item) => (
          <div key={item.id}>
            {curUser !== null && curUser.userData.roles === "ROLE_ADMIN" ? (
              <Link
                href={{
                  pathname: "/edit",
                  query: {
                    id: item.id,
                  },
                }}
              >
                <Image
                  src="/images/editBlog.svg"
                  alt="edit"
                  width={48}
                  height={48}
                />
              </Link>
            ) : (
              <></>
            )}
            {curUser !== null && curUser.userData.roles === "ROLE_ADMIN" ? (
              <div>
                <Image
                  src="/images/deleteBlog.svg"
                  alt="delete"
                  width={48}
                  height={48}
                  onClick={modalPopup}
                  blog-id={item.id}
                />
              </div>
            ) : (
              <></>
            )}
            <Link href={`/blogPost/${item.id}`}>
              <Card blog={item} />
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <span
          style={{ display: `${pageNumber === 0 ? "none" : "block"}` }}
          onClick={prevPage}
        >
          <PrevButton />
        </span>
        <span
          onClick={nextPage}
          style={{ display: `${blogs.length < 5 ? "none" : "block"}` }}
        >
          <NextButton />
        </span>
      </div>
    </div>
  );
};

export default Blog;
