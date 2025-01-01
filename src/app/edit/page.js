"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const imgTitleFont = localFont({ src: "../../fonts/osiris.otf" });
const EditBlog = () => {
  const router = useRouter();
  const [content, setContent] = useState("");

  const searchParams = useSearchParams();
  const query = searchParams.get("id");
  const [uid, setUid] = useState({});

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [blog, setBlog] = useState({
    id: "",
    title: "",
    description: "",
    postedAt: "",
    image: "",
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["link", "image"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "formula",
  ];

  useEffect(() => {
    // const {data} = props.id

    if (!window.sessionStorage.getItem("currentUser")) {
      router.push("/login");
    } else {
      const temp = JSON.parse(window.sessionStorage.getItem("currentUser"));
      setUid(temp);

      // PROD

      // prodBlog()

      // TEST
      // testBlog()
    }
    prodBlog();
  }, []);

  const testBlog = async () => {
    const res = await fetch(`http://localhost:3000/dummy.json`, {
      cache: "no-store",
    });
    const data = await res.json();
    setBlog(data[query]);
  };
  const prodBlog = async () => {
    // ${process.env.NEXT_PUBLIC_API_URL}
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/${query}`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    setContent(data.description)
    setBlog(data);
  };

  const handleChange = (e) => {
    setBlog((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const UpdateBLog = async (e) => {
    setError("");
    setSuccess("");
    const payload = blog;
    blog["description"] = content;
    e.preventDefault();
    if (
      payload.title !== "" &&
      payload.description !== "" &&
      payload.postedAt !== "" &&
      payload.image !== ""
    ) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-blog`, {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${uid.jwtToken}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
          },
        });
        setSuccess("Blog Updated Successfully");
      } catch (error) {
        setError("Something went Wrong");
      }
    } else {
      setError("All fields are mandatory");
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${imgTitleFont.className}`}>
        Update blog
      </h1>
      {success && <small className={styles.success}>{success}</small>}
      {error && <small className={styles.error}>{error}</small>}
      <form className={styles.form}>
        <input
          type="text"
          placeholder="title"
          className={styles.input}
          required
          onChange={handleChange}
          name="title"
          value={blog.title !== "" ? blog.title : ""}
        />
        <input
          type="text"
          placeholder="imageURL"
          className={styles.input}
          required
          onChange={handleChange}
          name="image"
          value={blog.image !== "" ? blog.image : ""}
        />
        {/* <input type="date" placeholder="dd-mm-yyyy" className={styles.input} required onChange={handleChange} name='postedAt' value={blog.postedAt!==''?blog.postedAt:""} /> */}
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
        />

        <button className={styles.submitBtn} onClick={UpdateBLog}>
          Send
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
