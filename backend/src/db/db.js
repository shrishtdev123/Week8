const mongoose=require("mongoose");
require("dotenv").config({path: './src/db/.env'});
const db_uri = process.env.MONGODB_URI
     .replace('${MONGODB_USERNAME}', process.env.MONGODB_USERNAME)
     .replace('${MONGODB_PASSWORD}', process.env.MONGODB_PASSWORD)

mongoose.connect(db_uri);
// create the scheama 
const UserShema=mongoose.Schema({
         username:{
              type:String,
              required:true,
              unique:true,
              trim:true,
              lowercase:true,
         },
         password:{
            type:String,
            required:true,
       },
         firstname:{
            type:String,
            required:true,
            trim:true,
       },
         lastname:{
            type:String,
            required:true,
            trim:true,
       },
})

 
// this is acount schema 

const accountSchema = new mongoose.Schema({
     userId: {
         type: mongoose.Schema.Types.ObjectId, // Reference to User model
         ref: 'User',
         required: true
     },
     balance: {
         type: Number,
         required: true
     }
 });
 
 // now we create the model if both schema
 const Account = mongoose.model("Account",accountSchema);
 const User = mongoose.model("User",UserShema);
 
 module.exports = {
      User,
      Account,
 };