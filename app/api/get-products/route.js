import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req){
    await dbConnect()
    const products  = await Product.find({})
    return NextResponse.json(products)
}