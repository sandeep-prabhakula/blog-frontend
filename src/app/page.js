import Image from 'next/image'
import styles from './page.module.css'
import Button from "@/components/button/Button";
import Hero from "public/hero.png";

export default function Home() {
  return (
    <main className={styles.main}>
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
          <Image src={Hero} alt="" className={styles.img} />
        </div>
      </div>

    </main>
  )
}
