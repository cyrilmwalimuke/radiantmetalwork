import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(req){
    await dbConnect()
    const {email} = await req.json()
    try {
      const validUser = await User.findOne({email})
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const token =jwt.sign({id:validUser._id},process.env.JWT_SECRET)
      const {password:pass,...rest} = validUser._doc
    //   res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    return NextResponse.json(rest)

    
    } catch (error) {
      console.log(error)
      
    }

}
