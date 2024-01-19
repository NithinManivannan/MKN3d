"use client";
import Image from "next/image";
import styles from "./contact.module.css";
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Link from "next/link"


// export const metadata = {
//   title: "Contact",
//   description: "MKN 3D Contact Method",
// };

const ContactPage = () => {
const [state, handleSubmit] = useForm("xqkrajwj"); // Replace with your Formspree form ID
  if (state.succeeded) {
    return (      
      <div className={styles.thankYouContainer}>
    <h1 className={styles.thankYouMessage}>Thanks for contacting us!</h1>
    <p className={styles.inquiryMessage}>We have received your message and will look into it.</p>
    
    <Link href="/" passHref>
      <button className={styles.homeButton}>Return to Homepage</button>
    </Link>
    </div>
    )
  }
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
      <Image src="/contact.png" alt="" fill className={styles.img} />
    </div>
    <div className={styles.formContainer}>
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        id="name"
        type="text" 
        name="name"
        placeholder="Name"
        
      />
      <ValidationError 
        prefix="Name" 
        field="name"
        errors={state.errors}
      />

      <input
        id="email"
        type="email" 
        name="email"
        placeholder="Email Address"

      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />

      <input
        id="phone"
        type="tel" 
        name="phone"
        placeholder="Phone Number (Optional)"

      />
      <ValidationError 
        prefix="Phone" 
        field="phone"
        errors={state.errors}
      />

      <textarea
        id="message"
        name="message"
        placeholder="Message"
        
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />

      <button type="submit" disabled={state.submitting} className={styles.button}>
        Submit
      </button>
    </form>
    </div>
    </div>
  );
}
export default ContactPage;


