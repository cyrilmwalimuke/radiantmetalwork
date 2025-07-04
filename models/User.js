import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: true },

}, { timestamps: true })

// Avoid model overwrite error in dev
export default mongoose.models.User || mongoose.model('User', userSchema)
