"use client"

import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";
import { getPost } from "@/lib/data";
import { useState, useEffect, useContext } from "react";
import { useShoppingCart } from 'use-shopping-cart';
import { useRouter } from 'next/navigation'
import { useNotification } from "@/provider/notificationContext";

// FETCH DATA WITH AN API
const getData = async (slug) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/gifts/${slug}`,{
    //cache: "no-store",
    method: "PUT", // change GET to PUT
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

export default function SinglePostPage({ params }) {
  const { slug } = params;
  const [post, setPost] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter(); // Instantiate useRouter
  const { showNotification } = useNotification();

  const { cartDetails, addItem,setItemQuantity } = useShoppingCart();

  useEffect(() => {
    getData(slug)
      .then(data => setPost(data))
      .catch(error => console.error('Error fetching post:', error));
  }, [slug]);

  const handleAddToCart = (e) => {
    e.preventDefault();

    // Show global added to cart notification
    showNotification('Added to Cart');

    console.log("Add to Cart Clicked with quantity:", quantity);
    if (cartDetails[post.slug]) {
      // If the item exists, update the quantity
      setItemQuantity(post.slug, cartDetails[post.slug].quantity + parseInt(quantity));
    } else {
      // If the item doesn't exist, add it to the cart
      const product = {
        id: post.slug, // Make sure to have an id property for your product
        name: post.title,
        price: parseInt(post.price),
        currency: 'INR',
        image: post.img,
      };
      addItem(product, { count: parseInt(quantity) });
    }
    router.push('/cart');
    // Reset quantity input to 1 after adding to cart
    setQuantity(1);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {post.img && (
        <div className={styles.imgContainer}>
          <Image
            src={post.img}
            alt={post.title}
            width={500}
            height={500}
            className={styles.img}
          />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.price}>Price ₹{post.price}</p>
        <p className={styles.description}>{post.desc}</p>
        <form onSubmit={handleAddToCart}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            max="10"
            step="1"
          />
          <button className={styles.addToCartBtn} href="/cart">Add to Cart</button>
        </form>
      </div>
    </div>
  );
}
