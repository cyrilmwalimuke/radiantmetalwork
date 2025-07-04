import mongoose from 'mongoose'
const orderItemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    // img: {
    //   type: String,
    //   required: true
    // },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    // id: {
    //   type: Number,
    //   required: true,
    
    // },
    
  
  
  });

  
  const OrderSchema = new mongoose.Schema({
    userRef: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    orderItems: {
      type: [orderItemSchema],
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone_number: {
      type: String,
      required: true
    },
    deliveryFee: {
      type: Number,
      required: true
    },
    deliveryStation: {
      type: String,
      required: true
    },
    status:{
      type:String,
      default:'processing'
    }
    
  
    
  },{timestamps:true});
  



// Avoid model overwrite error in dev
export default mongoose.models.Order || mongoose.model('Order', OrderSchema)