import PostCard from "@/components/postCard/postCard";
import styles from "./gifts.module.css";
import { getPosts } from "@/lib/data";

// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/gifts`, {
    //cache: "no-store",
    method: "PUT", // change GET to PUT
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const giftsPage = async() => {

  // FETCH DATA WITH AN API
  const posts = await getData();


  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default giftsPage;