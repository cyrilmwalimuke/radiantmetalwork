import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req){
    const { amount, phone_number, channel_id, external_reference } = await  req.json();

    const generateBasicAuthToken = () => {
        return "Basic " + Buffer.from("C4PKEOVqx1usksesQlSa:nX1OqVsQtrEta7dzDFuMq36UBjCl0NHMr0H2Y9g6").toString("base64");
      };

const PAYHERO_API_URL = "https://backend.payhero.co.ke/api/v2/payments";
  const CALLBACK_URL = "https://your-ngrok-url.ngrok-free.app/callback";
    try {
     const response = await axios.post(
      PAYHERO_API_URL,
      {
        amount: parseFloat(amount),
        phone_number,
        channel_id,
        provider: "m-pesa",
        external_reference,
        callback_url: CALLBACK_URL,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: generateBasicAuthToken(),
        },
      }
    );
  
    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Payment Error:", error.response ? error.response.data : error.message);
   return NextResponse.json({
      success: false,
      message: error.response ? error.response.data : "Payment request failed",
    });
  }

}

// C4PKEOVqx1usksesQlSa
// nX1OqVsQtrEta7dzDFuMq36UBjCl0NHMr0H2Y9g6
// Basic QzRQS0VPVnF4MXVza3Nlc1FsU2E6blgxT3FWc1F0ckV0YTdkekRGdU1xMzZVQmpDbDBOSE1yMEgyWTlnNg==
