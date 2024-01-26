"use client";

import { CartProvider as ShoppingCartProvider } from "use-shopping-cart";
import React from "react";

const CartProvider = ({ children }) => {
  return (
    <ShoppingCartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      currency="USD"
      successUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/success`}
      cancelUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/cancel`}
      billingAddressCollection={true}
      shouldPersist={true}
      language="pl-PL"
    >
      {children}
    </ShoppingCartProvider>
  );
};

export default CartProvider;
