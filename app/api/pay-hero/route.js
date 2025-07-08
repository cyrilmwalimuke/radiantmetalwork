import dbConnect from "@/lib/db";
import CallbackStatus from "@/models/CallbackStatus";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req){
  await dbConnect()
    const { amount, phone_number, channel_id, external_reference } = await  req.json();
 
    const newCallbackStatus = new CallbackStatus({phone_number})
        
    await newCallbackStatus.save()



    const generateBasicAuthToken = () => {
        return "Basic " + Buffer.from("C4PKEOVqx1usksesQlSa:nX1OqVsQtrEta7dzDFuMq36UBjCl0NHMr0H2Y9g6").toString("base64");
      };

      const PAYHERO_API_URL = "https://backend.payhero.co.ke/api/v2/payments";
      const CALLBACK_URL = "https://e646f7691823.ngrok-free.app/api/callback";
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

    const finalStatus = await waitForStatus(phone_number, 10000); // wait up to 10 seconds
    console.log("Final Status:", finalStatus);

    if (!finalStatus) {
      return NextResponse.json({
        success: false,
        message: "Payment status not updated in time",
      });
    }


  
    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Payment Error:", error.response ? error.response.data : error.message);
   return NextResponse.json({
      success: false,
      message: error.response ? error.response.data : "Payment request failed",
    });
  }

}


async function waitForStatus(phone_number, maxWaitMs = 10000) {
  const pollInterval = 1000; // 1 second
  const maxTries = Math.floor(maxWaitMs / pollInterval);
  let tries = 0;

  while (tries < maxTries) {
    const statusDoc = await CallbackStatus.findOne({ phone_number });

    if (statusDoc?.status && statusDoc.status !== "pending") {
      return statusDoc; // status updated
    }

    await new Promise((resolve) => setTimeout(resolve, pollInterval));
    tries++;
  }

  return null; // timeout
}

// C4PKEOVqx1usksesQlSa
// nX1OqVsQtrEta7dzDFuMq36UBjCl0NHMr0H2Y9g6
// Basic QzRQS0VPVnF4MXVza3Nlc1FsU2E6blgxT3FWc1F0ckV0YTdkekRGdU1xMzZVQmpDbDBOSE1yMEgyWTlnNg==
