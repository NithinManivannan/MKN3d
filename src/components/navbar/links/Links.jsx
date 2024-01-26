"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./links.module.css"
import NavLink from './navLink/navLink';
import { handleLogout } from "@/lib/action";
import { useShoppingCart } from 'use-shopping-cart'; // Import the hook
import { FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const links = [
    {
        title: "Homepage",
        path: "/",
    },
    {
        title: "About",
        path: "/about",
    },
    {
        title: "Contact",
        path: "/contact",
    },
    {
        title: "Gifts",
        path: "/gifts",
    },
];

const Links = ({session}) => {

    const router = useRouter();


    const[open, setOpen] = useState(false)

    // Use the useShoppingCart hook to get the cart count
    const { cartCount } = useShoppingCart();

    return (
    <div className={styles.container}>        
        <div className={styles.links}>
        {links.map((link =>(
            <NavLink item ={link} key = {link.title}/>
        )))}{
            session?.user ? (
                <>
                {session.user?.isAdmin && (<NavLink item = {{title: "Admin", path: "/admin"}}/>)}
                <form action={handleLogout}>
                <button className={styles.logout}>Logout</button>
                </form>
                </>
            ) : (
                <NavLink item = {{title: "Login", path: "/login"}}/>
            ) 
        }
            <div className={styles.cartIcon}  onClick={() => router.push('/cart')}>
            <FaShoppingCart size={30} />
                {cartCount > 0 && (
                    <span className={styles.cartCount}>{cartCount}</span>
                )}
            </div>
        </div>
        <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
        {open && <div className= {styles.mobileLinks}>
                {links.map((link) => (
                    <NavLink item = {link} key = {link.title}/>
                ))}
            </div>
        }
    </div>
    )
  }
  export default Links