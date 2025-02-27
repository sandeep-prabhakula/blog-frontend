import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Head from "next/head";
import Link from "next/link";
import localFont from "next/font/local";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { androidstudio } from "react-syntax-highlighter/dist/esm/styles/hljs";

const blogTitleFont = localFont({
  src: "../../../fonts/BebasNeue-Regular.otf",
});
const aboutAuthorFont = localFont({ src: "../../../fonts/NexaExtraLight.ttf" });
const descriptionFont = localFont({ src: "../../../fonts/OpenSans.ttf" });

async function getData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function test(id) {
  const res = await fetch(`http://localhost:3000/dummy.json`, {
    cache: "no-store",
  });
  const data = await res.json();
  const obj = data[id - 1];
  return obj;
}

export async function generateMetadata({ params }) {
  //testing
  // const post =await test(params.id)

  //production
  const post = await getData(params.id);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [
        {
          url: post.image,
          width: 300,
          height: 200,
        },
      ],
      title: post.title,
      description: post.description,
    },
    keywords: post.title.split(" "),
  };
}

const Blog = async ({ params }) => {
  let key = 0;

  //production
  const data = await getData(params.id);

  const isNewFormat = data.description.startsWith("<");

  //testing
  // const data =await test(params.id)

  return (
    <div className={styles.container}>
      <Head>
        <title>{data.title}</title>
        <meta name="title" content={`${data.title}`} />
        <meta name="description" content={`${data.description}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${data.title}`} />
        <meta
          property="og:description"
          content={`${data.description.substring(0, 101) + "..."}`}
        />
        <meta property="og:image" content={`${data.image}`} />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:url"
          content={`https://codeverse-chronicles.netlify.app/${data.id}`}
        />
        <meta
          property="og:site_name"
          content="https://codeverse-chronicles.netlify.app"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={`${data.title}`} />
        <meta
          property="twitter:url"
          content={`https://codeverse-chronicles.netlify.app/${data.id}`}
        />
        <meta property="twitter:image" content={`${data.image}`} />
        <meta property="twitter:description" content={`${data.description}`} />
      </Head>
      <div className={`${styles.path} ${aboutAuthorFont.className}`}>
        <Link href="/">
          <small>Codeverse Chronicles &gt; </small>
        </Link>
        <Link href="/blogPost">
          <small>Blogs &gt; </small>
        </Link>
        <small> {data.title} </small>
      </div>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={`${styles.title} ${blogTitleFont.className}`}>
            {data.title}
          </h1>
          <div className={`${styles.author} ${aboutAuthorFont.className}`}>
            <small className={styles.username}>
              Author : Sandeep Prabhakula | Published on: {data.postedAt}
            </small>
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
            height={500}
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          {isNewFormat?<div dangerouslySetInnerHTML={{__html:data.description}}/>:data.description.split("\n\n").map((paragraph) => {
            // Heading
            if (paragraph.endsWith(":"))
              return (
                <h3 className={`${blogTitleFont.className}`}>
                  {paragraph}
                  <br />
                </h3>
              );

            // Code
            if (paragraph.startsWith("```"))
              return (
                <SyntaxHighlighter style={androidstudio} showLineNumbers>
                  {paragraph.slice(3, -3)}
                </SyntaxHighlighter>
              );

            // Images
            if (paragraph.startsWith("["))
              return (
                <div className={styles.imageContainer}>
                  <Image
                    src={paragraph.slice(1, -1)}
                    alt=""
                    width={500}
                    height={500}
                    className={styles.image}
                  />
                </div>
              );

            // Description
            return (
              <p
                className={`${styles.text} ${descriptionFont.className}`}
                key={key++}
              >
                {paragraph}
                <br />
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;
