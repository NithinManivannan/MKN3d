import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"

const PostCard = ({post}) => {

  return ( 
    <div className={styles.container}>
      <div className={styles.top}>
        {post.img && <Link href = {`/gifts/${post.slug}`} className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img}/>
        </Link>}
       
      </div>
      <div className={styles.bottom}>
      <Link href={`/gifts/${post.slug}`}>
        <h1 className={styles.title}>{post.title}</h1>
        </Link>
      </div>
    </div>
  )
}

export default PostCard