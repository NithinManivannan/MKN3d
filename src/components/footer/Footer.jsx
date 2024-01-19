import styles from "./footer.module.css";
import Link from "next/link"

const Footer = () => {
  return (
    <div className={styles.container}>
      <Link href = "/" className={styles.logo}>MKN3D</Link>
      <div className={styles.text}>
        MKN 3D © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;