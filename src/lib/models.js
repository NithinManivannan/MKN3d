import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
  product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', // Reference the Post model
      required: true
  },
  quantity: {
      type: Number,
      required: true,
      min: 1
  }
});

// Cart Schema
const cartSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference the User model
      required: true
  },
  items: [cartItemSchema]
}, { timestamps: true });

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
export const Cart = mongoose.models?.Cart || mongoose.model("Cart", cartSchema);
export const Payment = mongoose.models?.Payment||mongoose.model("Payment", paymentSchema);