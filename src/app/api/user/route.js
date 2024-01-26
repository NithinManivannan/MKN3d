import { NextResponse } from "next/server";
import { connectToDb } from "./utils";
import { User } from "@/lib/models"

export async function GET() {

//   await dbConnect();

  return NextResponse.json({ msg: "success" });
}


export async function POST(req) {
  const body = await req.json();
   await connectToDb();
  const user = await User.create(body)

  return NextResponse.json({ msg:"success",data: user });
}