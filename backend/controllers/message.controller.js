import Conversation from "../models/conversation.model.js";
import Message from "../models/message.models.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;  // Assuming receiverId is passed as 'id' in params
        const senderId = req.user._id;
        
        console.log("Sender ID:", senderId);
        console.log("Receiver ID:", receiverId);
        console.log("Message:", message);

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        //if new mwssage is created then push the message id in the conversation
        if(newMessage){
        console.log("New Message Object:", newMessage);
        conversation.messages.push(newMessage._id);
        }

        //Socket io functionality
        await Promise.all([conversation.save(),newMessage.save()]);


        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in send message:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try{
        const { id: userToChatId } = req.params;  // Assuming userToChatId is passed as 'id' in params
        const senderId = req.user._id;

        console.log("Sender ID:", senderId);
        console.log("Receiver ID:", userToChatId);

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); //Not referrring to the message model but to the messages array in the conversation model

        if(!conversation){
            return res.status(200).json([]);
        }

        const messages = conversation.messages;
        

        res.status(200).json(conversation.messages);
    }
    catch(error){
        console.error("Error in get messages:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
