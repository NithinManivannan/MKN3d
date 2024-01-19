import LoginForm from "@/components/loginForm/loginForm";
import { handleGithubLogin, handleGoogleLogin } from "@/lib/action";
import styles from "./login.module.css";
import Image from "next/image";

const LoginPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGoogleLogin}>
          <button className={styles.google}>
            <Image
              src="/googleLogo.png" // Update the path if needed
              alt="Google"
              width={30} // Set the width as needed
              height={30} // Set the height as needed
              className={styles.logo} // if you have specific styles for the logo
            />
            Login with Google
          </button>
        </form>
        <form action={handleGithubLogin}>
          <button className={styles.github}>
            <Image
              src="/githubLogo.png" // Update the path if needed
              alt="GitHub"
              width={24}
              height={24}
              className={styles.logo}
            />
            Login with Github
          </button>
        </form>
        <div className={styles.separator}>OR</div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;