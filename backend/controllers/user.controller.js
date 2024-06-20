import User from "../models/user.model.js";

export const getUserForSide = async (req,res)=>{
    try{
        const loggedInUser=req.user._id;

        const filteredUsers=await User.find({_id:{$ne:loggedInUser}}).select("-password");
        // const users=await User.find({}).select("username profilepic");
        res.status(200).json(filteredUsers);
    }
    catch(error){
        console.log("Error in getUserForSide",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};
