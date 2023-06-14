import Image from 'next/image'
import styles from './page.module.css'
import Button from "@/components/button/Button";
import Hero from "public/hero.png";
import Head from 'next/head';
import Logo from 'public/logo.png'

export default function Home() {
  return (
    <main className={styles.main}>
      <Head>
        <meta name="keywords" content="coding, code, codeverse, chronicles, codeverse chronicles, sandeep, sandy, sandeep prabhakula, java, android, spring boot, reactjs, nextjs, mongodb, sql, kotlin, javascript" />
        <meta property='og:title' content='Codeverse Chronicles' />
        <meta property='og:description' content='Knowledge from every corner of the earth' />
        <meta property='og:image' content={`${Logo}`} />
        <meta property='og:url' content={`https://codeverse-chronicles.netlify.app`} />
        <meta property='og:site_name' content='Codeverse Chronicles' />
      </Head>
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>
            Master the Art of Tech : Insights, Tutorials, and Strategies
          </h1>
          <p className={styles.desc}>
            From novice to expert, our blog feeds your technological adventure. Discover, study, and master the world of coding.
          </p>
          <Button url="https://sandeep-prabhakula.netlify.app" text="See My Works" />
        </div>
        <div className={styles.item}>
          <Image src={Hero} alt="codeverseChronicles" className={styles.img} />
        </div>
      </div>

    </main>
  )
}
