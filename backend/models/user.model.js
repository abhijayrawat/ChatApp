import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:6,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilepic:{
        type:String,
        default:""
    },
    //Createdat upadtedat => Member since
    },
     {timestamps:true}
);

const User=mongoose.model("User",userSchema);
export default User;

