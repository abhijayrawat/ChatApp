import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup=async (req,res)=>{   
try{
    const{fullname,username,password,confirmPassword,gender}=req.body;
    

    if(password!==confirmPassword){
        return res.status(400).json({error:"Password and confirm password do not match"});
    }

    const user=await User.findOne({username});

    if(user){
        return res.status(400).json({error:"User already exists"});
    }
    //hash password here
    const salt=await bcryptjs.genSalt(10);
    const hashedPassword=await bcryptjs.hash(password,salt);


const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`;
const girlProfilePic=`https://avatar.iran.lia.run/public/girl?username=${username}`;

const newUser=new User({
    fullname,
    username,
    password:hashedPassword,
    gender,
    profilepic:gender==="male"? boyProfilePic:girlProfilePic
});
if(newUser){
    //Generate jwt tokens
generateTokenAndSetCookie(newUser._id,res);
await newUser.save();

res.status(201).json({
    _id:newUser._id,
    fullname:newUser.fullname,
    username:newUser.username,
    profilepic:newUser.profilepic,
    message:"User created successfully"})
}
else{
    res.status(400).json({error:"User already exists"});
}

}


catch(error){
    console.log("error in signup",error.message);
    res.status(500).json({error:"Server Error in signup"});
}
};
export const login=async (req,res)=>{
    // res.send("Login");
    try{
        const{username,password}=req.body;
        const user=await User.findOne({username});
        const isPasswordCorrect=await bcryptjs.compare(password,user?.password || "");
        if(!isPasswordCorrect || !user){
            return res.status(400).json({error:"Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            profilepic:user.profilepic,
            message:"User logged in successfully"
        });
    }
    catch(error){
        console.log("error in login",error.message);
        res.status(500).json({error:"Server Error in login"});
    }
    console.log("Login");
};

export const logout=(req,res)=>{

    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"User logged out successfully"});
    }
    catch{
        console.log("error in logout controller",error.message);
        res.status(500).json({error:"Server Error in logout"});
    }
};