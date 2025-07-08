import mongoose from 'mongoose';

const CallbackSchema = new mongoose.Schema({
  
  status:{
      type:String,
      default:'pending'
      
  },
  phone_number:{
      type:String

  }

  
  

},{timestamps:true})

export default mongoose.models.CallbackStatus || mongoose.model('CallbackStatus', CallbackSchema);
