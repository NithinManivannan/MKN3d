"use client";

import Image from "next/image";
import styles from "./home.module.css";
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>3D Printing Services</h1>
        <p className={styles.desc}>
        Fully customized Solutions, Products and Gifts
        </p>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => router.push('/about')}>Learn More</button>
          <button className={styles.button} onClick={() => router.push('/contact')}>Contact</button>

        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/hero.gif" alt="" fill className={styles.heroImg}/>
      </div>
    </div>
  );
};

export default Home;