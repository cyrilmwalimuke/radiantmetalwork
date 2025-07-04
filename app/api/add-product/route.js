import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";


export async function POST(req){
    await dbConnect()
    console.log("hello world")


    const {name,price,category,imageUrls} = await req.json();
    console.log(name,price,category,imageUrls)
    const product = new Product({name,price,category,imageUrls});
    await product.save();
    return NextResponse.json({success:true})
 
    
}