"use client"
import React,{useState} from "react";

const Buy = ({ makePayment }) => {

  const [isLoading, setIsLoading] = useState(false);



  return (
    <div className="flex flex-col items-center justify-center mt-[100px]">
    <button
     onClick={() => {
          makePayment({ productId: "example_ebook" });
        }}
      disabled={isLoading}
      className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? 'Processing...' : 'Checkout'}
    </button>



    </div>
  );
};

export default Buy;