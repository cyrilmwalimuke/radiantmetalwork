import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import axios from "axios";
import { NextResponse } from "next/server";




export async function POST(req) {
  await dbConnect();

  const {
    userRef,
    amount,
    orderItems,
    total,
    firstName,
    lastName,
    email,
    phone_number,
    deliveryFee,
    deliveryStation,
  } = await req.json();

  const generateBasicAuthToken = () => {
    return (
      "Basic " +
      Buffer.from("C4PKEOVqx1usksesQlSa:nX1OqVsQtrEta7dzDFuMq36UBjCl0NHMr0H2Y9g6").toString("base64")
    );
  };

  const PAYHERO_API_URL = "https://backend.payhero.co.ke/api/v2/payments";
  const CALLBACK_URL = "https://your-ngrok-url.ngrok-free.app/api/callback";

  try {
    const response = await axios.post(
      PAYHERO_API_URL,
      {
        amount: parseFloat(total),
        phone_number,
        channel_id: process.env.CHANNEL_ID,
        provider: "m-pesa",
        external_reference: userRef,
        callback_url: CALLBACK_URL,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: generateBasicAuthToken(),
        },
      }
    );

    // Save order after successful STK push
    const newOrder = new Order({
      userRef,
      amount,
      orderItems,
      total,
      firstName,
      lastName,
      email,
      phone_number,
      deliveryFee,
      deliveryStation,
    });

    await newOrder.save();

    return NextResponse.json({
      success: true,
      message: "Order created and STK push sent successfully",
      data: response.data,
      order: newOrder,
    });




  } catch (error) {
    console.error("Payment Error:", error.response ? error.response.data : error.message);
    return NextResponse.json({
      success: false,
      message: error.response ? error.response.data : "Payment request failed",
    });
  }
}
