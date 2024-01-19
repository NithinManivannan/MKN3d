import PostCard from "@/components/postCard/postCard";
import styles from "./gifts.module.css";
import { getPosts } from "@/lib/data";
import { PUT } from "../api/gifts/route";

// // FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch("https://mkn3d.vercel.app/api/gifts", {
    cache: "no-store",
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

  // FETCH DATA WITHOUT AN API
  // const posts = await getPosts();

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