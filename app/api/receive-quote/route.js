import { NextResponse } from "next/server"

export async function POST(req){
    const body  = await req.json()
    console.log(body)

    console.log("hello world")
    return NextResponse.json({ success: true, message:'success'});
}