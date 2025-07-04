import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';


export async function generateReceiptPdf({ customerName, customerAddress, orderId, items, logoBytes, signatureBytes }) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const { width, height } = page.getSize();
  
    let y = height - 50;
  
    // === LOGO ===
    if (logoBytes) {
      const logoImage = await pdfDoc.embedPng(logoBytes); // Use embedJpg if JPG
      const logoDims = logoImage.scale(0.25);
      page.drawImage(logoImage, {
        x: width - logoDims.width - 40,
        y: y - logoDims.height + 20,
        width: logoDims.width,
        height: logoDims.height,
      });
    }
  
    // === HEADER ===
    page.drawText('RECEIPT', {
      x: 50,
      y,
      size: 24,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.3),
    });
  
    y -= 40;
    page.drawText(`Order ID: ${orderId}`, { x: 50, y, size: 12, font });
    y -= 20;
    page.drawText(`Bill To: ${customerName}`, { x: 50, y, size: 12, font });
    y -= 15;
    page.drawText(`${customerAddress}`, { x: 50, y, size: 12, font });
  
    // === TABLE HEADER ===
    y -= 40;
    page.drawText('QTY', { x: 50, y, size: 12, font: boldFont });
    page.drawText('DESCRIPTION', { x: 100, y, size: 12, font: boldFont });
    page.drawText('UNIT PRICE', { x: 320, y, size: 12, font: boldFont });
    page.drawText('AMOUNT', { x: 430, y, size: 12, font: boldFont });
  
    y -= 15;
    page.drawLine({ start: { x: 50, y }, end: { x: width - 50, y }, thickness: 1, color: rgb(0.8, 0.1, 0.1) });
  
    // === TABLE ROWS ===
    y -= 20;
    let subtotal = 0;
  
    for (const item of items) {
      const amount = item.price * item.quantity;
      subtotal += amount;
  
      page.drawText(`${item.quantity}`, { x: 50, y, size: 12, font });
      page.drawText(item.name, { x: 100, y, size: 12, font });
      page.drawText(`KSh ${item.price.toFixed(2)}`, { x: 320, y, size: 12, font });
      page.drawText(`KSh ${amount.toFixed(2)}`, { x: 430, y, size: 12, font });
  
      y -= 20;
    }
  
    // === TOTALS ===
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
  
    y -= 10;
    page.drawLine({ start: { x: 50, y }, end: { x: width - 50, y }, thickness: 1, color: rgb(0.8, 0.1, 0.1) });
  
    y -= 20;
    page.drawText(`Subtotal:`, { x: 320, y, size: 12, font: boldFont });
    page.drawText(`KSh ${subtotal.toFixed(2)}`, { x: 430, y, size: 12, font });
  
    y -= 20;
    page.drawText(`Sales Tax (5%):`, { x: 320, y, size: 12, font: boldFont });
    page.drawText(`KSh ${tax.toFixed(2)}`, { x: 430, y, size: 12, font });
  
    y -= 20;
    page.drawText(`TOTAL:`, { x: 320, y, size: 14, font: boldFont });
    page.drawText(`KSh ${total.toFixed(2)}`, { x: 430, y, size: 14, font: boldFont, color: rgb(0, 0.3, 0.6) });
  
    // === SIGNATURE ===
    if (signatureBytes) {
      const signatureImage = await pdfDoc.embedPng(signatureBytes);
      const sigDims = signatureImage.scale(0.5);
      page.drawImage(signatureImage, {
        x: 400,
        y: 100,
        width: sigDims.width,
        height: sigDims.height,
      });
    }
  
    // === FOOTER ===
    y = 120;
    page.drawText('Thank you!', {
      x: 50,
      y,
      size: 16,
      font: boldFont,
      color: rgb(0.2, 0.2, 0.5),
    });
    y -= 20;
    page.drawText('Payment is due within 15 days', { x: 50, y, size: 10, font });
    y -= 12;
    page.drawText('Bank: Equity Bank', { x: 50, y, size: 10, font });
    y -= 12;
    page.drawText('Account: 1234567890, Routing: 098765432', { x: 50, y, size: 10, font });
  
    return await pdfDoc.save();
  }

export async function POST(req) {
  try {
    const { customerEmail,customerName,customerAddress, orderId, items, total } = await req.json();

    const logoPath = path.join(process.cwd(), 'public/logo-main.png');
    const signaturePath = path.join(process.cwd(), 'public/signature.png');

    const [logoBytes, signatureBytes] = await Promise.all([fs.readFile(logoPath),fs.readFile(signaturePath),]);
    const pdfBytes = await generateReceiptPdf({
        customerName,
        customerAddress,
        orderId,
        items,
        logoBytes,
        signatureBytes,
      });

    // 1. Generate PDF
    // const pdfDoc = await PDFDocument.create();
    // const page = pdfDoc.addPage([600, 400]);
    // const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    // const { width, height } = page.getSize();

    // page.drawText('Receipt', {
    //   x: 50,
    //   y: height - 50,
    //   size: 24,
    //   font,
    //   color: rgb(0, 0, 0),
    // });

    // page.drawText(`Order ID: ${orderId}`, { x: 50, y: height - 90, size: 12, font });

    // let y = height - 120;
    // items.forEach((item, index) => {
    //   page.drawText(`${index + 1}. ${item.name} - ${item.price} x ${item.quantity}`, {
    //     x: 50,
    //     y,
    //     size: 12,
    //     font,
    //   });
    //   y -= 20;
    // });

    // page.drawText(`Total: ${total}`, { x: 50, y: y - 20, size: 14, font });

    // const pdfBytes = await pdfDoc.save();

    // 2. Setup mail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your provider (e.g., SendGrid, Mailgun)
      auth: {
        user: process.env.NODEMAILER_USER_EMAIL, // Replace with your Gmail email
        pass: process.env.NODEMAILER_USER_PASS // Replace with your App Password
      },
    });

    // 3. Send the email with PDF attached
    await transporter.sendMail({
      from: `"Your Store" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: 'Your Receipt',
      text: 'Thanks for your order. Find your receipt attached.',
      attachments: [
        {
          filename: `receipt-${orderId}.pdf`,
          content: Buffer.from(pdfBytes),
          contentType: 'application/pdf',
        },
      ],
    });

    return NextResponse.json({ success: true, message: 'Receipt sent' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to send receipt' }, { status: 500 });
  }
}
