import React from 'react'
import Image from 'next/image';
import styles from './page.module.css'
import Head from 'next/head';
import Link from 'next/link';

async function getData(id) {
  const res = await fetch(`${process.env.API_URL}/blog/${id}`, {
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
    openGraph: {
      images: [{
        url: post.image,
        width: 300,
        height: 200
      }],
      title:post.title,
      description:post.description,
    },
    keywords: post.title.split(' ')
  };
}

const Blog = async ({ params }) => {
  let key = 0
  const data = await getData(params.id)
  return (
    <div className={styles.container}>
      <Head>
        <title>{data.title}</title>
        <meta name='title' content={`${data.title}`} />
        <meta name='description' content={`${data.description}`} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={`${data.title}`} />
        <meta property='og:description' content={`${data.description.substring(0, 101) + "..."}`} />
        <meta property='og:image' content={`${data.image}`} />
        <meta property="og:locale" content="en_US" />
        <meta property='og:url' content={`https://codeverse-chronicles.netlify.app/${data.id}`} />
        <meta property='og:site_name' content='https://codeverse-chronicles.netlify.app' />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property='twitter:title' content={`${data.title}`} />
        <meta property='twitter:url' content={`https://codeverse-chronicles.netlify.app/${data.id}`} />
        <meta property='twitter:image' content={`${data.image}`} />
        <meta property='twitter:description' content={`${data.description}`} />


      </Head>
      <div className={styles.path}>
        <Link href='/'>
          <small>Codeverse Chronicles &gt; </small>
        </Link>
        <Link href='/blogPost'>
          <small>Blogs &gt; </small>
        </Link>
        <small> {data.title} </small>
      </div>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <div className={styles.author}>
            <small className={styles.username}>Author : Sandeep Prabhakula | Published on: {data.postedAt}</small>
          </div>

        </div>
      </div>
      <hr />
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Image
            src={data.image}
            alt=""
            width={500}
            height={400}
            className={styles.image}
          />
        </div>
        {data.description.split('\n\n').map((paragraph) => {
          if (paragraph.endsWith(":")) return <h3>{paragraph}<br /></h3>
          return <p className={styles.text} key={key++}>{paragraph}<br /></p>
        })}
      </div>
    </div>
  )
}

export default Blog