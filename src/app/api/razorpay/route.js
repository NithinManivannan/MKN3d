import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });


export async function POST(req) {

    const payment_capture = 1;
    const { amount } = await req.json();
    const currency = "INR";
    const options = {
        amount: (amount).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
        notes: {
            // These notes will be added to your transaction. So you can search it within their dashboard.
            // Also, it's included in webhooks as well. So you can automate it.
            paymentFor: "testingDemo",
            userId: "100",
            productId: 'P100'
        }
    };

   // Create Razorpay order
   try {
    const order = await instance.orders.create(options);
    return NextResponse.json({ msg: "success", order });
       } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ msg: "error", error: error.message }, { status: 500 });
    }
    }