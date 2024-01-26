import Link from "next/link"
import Links from './links/Links';
import Image from "next/image";
import styles from './navbar.module.css'
import { auth } from "@/lib/auth";
import ThemeSwitcher from '@/lib/themeSwitcher';

const Navbar = async () => {

  const session = await auth()

    console.log(session)

    return (
      
      <div className={styles.container}>
      <Link href="/">
          <Image
            className={styles.logoButton}
            src="/MKNLogo.png"
            alt="MKN3D Logo"
            width={100} 
            height={100}
          />
      </Link>
        <div>
            <Links session = {session}/>
        </div>
        <ThemeSwitcher />
        
      </div>
    )
  }
  export default Navbar