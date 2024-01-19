"use client"

import { addPost } from "@/lib/action";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";
import React, { useState } from 'react';

const AdminPostForm = ({userId}) => {
  const [state, formAction] = useFormState(addPost, undefined);
  const [base64Image, setBase64Image] = useState("");
  
const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setBase64Image(base64);
  };

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Product</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="slug" placeholder="URL" />
      <input type="text" name="price" placeholder="Price" />
      <input 
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      <input 
        type="hidden"
        name="img"
        value={base64Image}
      />
      <textarea type="text" name="desc" placeholder="description" rows={10} />
      <button>Add</button>
      {state?.error}
    </form>
  );
};

export default AdminPostForm;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}