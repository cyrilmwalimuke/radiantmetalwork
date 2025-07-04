// lib/mongoose.js
import mongoose from 'mongoose';




const MONGODB_URI = process.env.MONGODB_URI 

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * Global is used here to maintain a cached connection across hot reloads in development
 * to prevent connections growing exponentially during dev.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: 'your_db_name_here', // optional
    }).then((mongoose) => mongoose).then(()=>console.log('connected to db'));
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
