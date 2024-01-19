
import { Post } from "@/lib/models"
import { connectToDb } from "@/lib/utils"
import { NextResponse } from "next/server/"

export const PUT = async(request) => {
    try{
        connectToDb()
        const posts = await Post.find()
        return NextResponse.json(posts)


    }catch(err){
        console.log(err)
        throw new Error("Failed to fetch posts!")
    }
}