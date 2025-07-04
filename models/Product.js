import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  
  name:{
      type:String
      
  },
  price:{
      type:Number

  },
  category:{
      type:String
  },
  amount:{
      type:Number,
      default:1
  },
  imageUrls:{
      type:Array
  }
  
  

},{timestamps:true})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
