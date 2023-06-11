import React from 'react'
import Image from 'next/image';
import styles from './page.module.css'
import Head from 'next/head';
async function getData(id) {
  const res = await fetch(`https://sandeep-prabhakula-blog-backend.up.railway.app/blog/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function generateMetadata({ params }) {

  const post = await getData(params.id)
  return {
    title: post.title,
    description: post.description,
  };
}

const Blog = async ({ params }) => {
  const data = await getData(params.id)
  return (
    <div className={styles.container}>
      <Head>
        <title>{data.title}</title>
        <meta name='description' content={`${data.description}`}/>
        <meta property='og:title' content={`${data.title}`}/>
        <meta property='og:description' content={`${data.description}`}/>
        <meta property='og:image' content={`${data.image}`}/>
        <meta property='og:url' content={`https://codeverse-chronicles.netlify.app/${data.id}`}/>
        <meta property='og:site_name' content='https://codeverse-chronicles.netlify.app'/>

      </Head>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>

          <div className={styles.author}>
            <Image
              src={data.image}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>Sandeep Prabhakula</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data.image}
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          {data.description}
        </p>
      </div>
    </div>
  )
}

export default Blog