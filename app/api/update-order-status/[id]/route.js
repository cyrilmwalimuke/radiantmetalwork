import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function PUT(req,{params}){
    await dbConnect()
    const {id} = await params
    const { status } = await req.json();
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });


    return NextResponse.json(order)
}

     
  