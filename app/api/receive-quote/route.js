import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req){
    const {firstName,lastName,email,tel,details,image} = await req.json()
 


    const emailHtml = `
                   <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f7f7f7;
        padding: 20px;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        overflow: hidden;
      }
      .header {
        background-color: #000;
        color: #fff;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 20px;
      }
      .field {
        margin-bottom: 15px;
      }
      .field strong {
        display: block;
        margin-bottom: 5px;
        color: #555;
      }
      .footer {
        background-color: #f0f0f0;
        text-align: center;
        padding: 15px;
        font-size: 12px;
        color: #888;
      }
      a.button {
        display: inline-block;
        margin-top: 10px;
        padding: 10px 20px;
        background-color: #333;
        color: white;
        text-decoration: none;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>New Welding Quote Request</h2>
        <p>from radiantmetalsworkshop.com</p>
      </div>
      <div class="content">
        <div class="field">
          <strong>First Name:</strong>
          <span>${firstName}</span>
        </div>
        <div class="field">
          <strong>Last Name:</strong>
          <span>${lastName}</span>
        </div>
        <div class="field">
          <strong>Email:</strong>
          <span>${email}</span>
        </div>
        <div class="field">
          <strong>Phone:</strong>
          <span>${tel}</span>
        </div>
        <div class="field">
          <strong>Project Details:</strong>
          <p>${details}</p>
        </div>
        <div class="field">
          <strong>Uploaded Image:</strong>
          
            <p><a href=${image} class="button" target="_blank">View Uploaded Design</a></p>
        
        </div>
      </div>
      <div class="footer">
        You received this message via your website's quote form.
      </div>
    </div>
  </body>
</html>

                    `;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_USER_EMAIL, // Replace with your Gmail email
          pass: process.env.NODEMAILER_USER_PASS // Replace with your App Password
        },
      });
      
      // Email options
      const mailOptions = {
        from: "cyrilmwalimuke@gmail",
        to: email,
        subject: "You Have a New Welding Quote Inquiry",
        
        html:emailHtml,
        
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });


    console.log("hello world")
    return NextResponse.json({ success: true, message:'success'});
}




