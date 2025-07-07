import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req){
    await dbConnect()
    const {email,password} = await req.json()
    const newUser = new User({email,password})
    try {
        await newUser.save()
return NextResponse.json({
            success: true,
            message: "User created successfully"
        })

        console.log("new user created")
    
    } catch (error) {
      console.log(error)
      
    }

}
