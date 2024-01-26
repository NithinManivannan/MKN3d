"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShoppingCart } from 'use-shopping-cart';
import styles from './cart.module.css';
import BuyProduct from "@/components/razorpay/BuyProduct";

// Utility function to load external scripts
const loadScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CartPage() {
  const { cartDetails, removeItem, setItemQuantity } = useShoppingCart();
  
  
  // Initialize quantities based on cartDetails
  const [quantities, setQuantities] = useState(() => 
    Object.keys(cartDetails).reduce((acc, key) => ({
      ...acc, [key]: cartDetails[key].quantity
    }), {})
  );

  // Synchronize quantities when cartDetails change
  useEffect(() => {
    setQuantities(
      Object.keys(cartDetails).reduce((acc, key) => ({
        ...acc, [key]: cartDetails[key].quantity
      }), {})
    );
  }, [cartDetails]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities(prev => ({ ...prev, [itemId]: newQuantity }));
  };

  const updateCart = (item) => {  
    const newQuantity = quantities[item.id];

    // Update the item quantity directly using setItemQuantity
    if (newQuantity !== item.quantity) {
      setItemQuantity(item.id, newQuantity);
    }
  };

  const handleRemoveClick = (itemId) => {
    removeItem(itemId);
  };

  // Calculate total amount
  const totalAmount = Object.values(cartDetails).reduce((total, item) => total + item.quantity * item.price, 0);

  if (Object.keys(cartDetails).length === 0) {
    return <p className={styles.emptyCart}>Your cart is empty. <Link href="/gifts">Go to shop</Link></p>;
  }

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.heading}>Your Shopping Cart</h1>
      <ul className={styles.cartList}>
        {Object.values(cartDetails).map((item) => (
          <li key={item.id} className={styles.cartItem}>
            <div className={styles.productImage}>
              <Image src={item.image} alt={item.name} width={100} height={100} />
            </div>
            <div className={styles.productDetails}>
              <h3 className={styles.productTitle}>{item.name}</h3>
              <p className={styles.productPrice}>Price: ₹{item.price}</p>
              <div className={styles.quantitySelector}>
                <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  max="10"
                  value={quantities[item.id]}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
                <button onClick={() => updateCart(item)}>Update</button>
              </div>
              <button className={styles.removeButton} onClick={() => handleRemoveClick(item.id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.cartSummary}>
        <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
        <BuyProduct totalAmount={totalAmount*100} /> 
      </div>
    </div>
  );
}
