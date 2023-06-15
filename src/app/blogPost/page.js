import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css'
async function getData() {
  const res = await fetch("https://sandeep-prabhakula-blog-backend.up.railway.app/get-all-blogs", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Blog = async () => {
  let data = await getData();
  data = data.reverse();
  return (
    <div className={styles.mainContainer}>
      {data.map((item) => (
        <Link href={`/blogPost/${item.id}`} className={styles.container} key={item.id}>
          <div className={styles.imageContainer}>
            <Image
              src={item.image}
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.description.substring(0,125)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
