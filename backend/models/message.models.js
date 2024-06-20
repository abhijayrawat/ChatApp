import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        required:true
    },
    },{timestamps:true})//mongo will automatcially try to create two field
    //s createdAt and updatedAt in the database and will automatically update them whenever we create or update a document;     
    const Message=mongoose.model('Message',messageSchema);
    export default Message;