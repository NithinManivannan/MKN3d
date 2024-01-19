import Image from "next/image";
import styles from "./about.module.css";

export const metadata = {
  title: "About Page",
  description: "Description about MKN 3D company",
};


const AboutPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About MKN 3D</h2>
        <h1 className={styles.title}>
        We craft digital solutions that stand out for their creativity and quality.
        </h1>
        <p className={styles.desc}>
        MKN 3D specializes in design innovation and rapid prototyping. Our dedicated team delivers tailor-made solutions, cutting-edge products, and unique gifts. With a team of talented engineers, we transform bold ideas into reality. Partner with us for custom creations that set new standards in engineering and design.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>5+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>200+</h1>
            <p>Custom Solutions Delivered</p>
          </div>
          <div className={styles.box}>
            <h1>50+</h1>
            <p>Customers Satisfied</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src="/about.png"
          alt="About Image"
          fill
          className={styles.img}
        />
      </div>
    </div>
  );
};

export default AboutPage;