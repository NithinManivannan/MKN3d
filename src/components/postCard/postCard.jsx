// components/postCard/PostCard.js
import Image from "next/image";
import styles from "./postCard.module.css";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <div className={styles.card}>
      <Link href={`/gifts/${post.slug}`} className={styles.imageWrapper}>
          <Image
            src={post.img}
            alt={post.title}
            width={400} // these should match the aspect ratio of your images
            height={250}
            className={styles.image}
          />
      </Link>
      <div className={styles.info}>
        <Link href={`/gifts/${post.slug}`}>
          <h1 className={styles.title}>{post.title}</h1>
        </Link>
        {post.price && <p className={styles.price}>₹{post.price}</p>}
        {post.description && <p className={styles.description}>{post.description}</p>}
      </div>
    </div>
  );
};

export default PostCard;
