import dbConnect from "@/lib/db";
import CallbackStatus from "@/models/CallbackStatus";
import { NextResponse } from "next/server";

export async function POST(req){
    await dbConnect()
    const data = await req.json();
    console.log(data.response);

    if (data.response.ResultCode !== 0) {
        return NextResponse.json({ message: "Payment failed" });
      } 
    const updatedOrder = await CallbackStatus.findOneAndUpdate(
        { phone_number: data.response.Phone}, // match by phone_number in DB
        {
          status: "paid",
         
        },
        { new: true } // return the updated document
      );
      
    if (!updatedOrder) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

    

   
   
    return NextResponse.json(updatedOrder)
}