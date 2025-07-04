import dbConnect from '@/lib/db'
import Order from '@/models/Order'
import { NextResponse } from 'next/server'

export async function GET() {
    await dbConnect()
    
    const adminOrders  = await Order.find({})
  return NextResponse.json(adminOrders)
}
