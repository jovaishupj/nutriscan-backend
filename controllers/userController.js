import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateToken=(userId)=>{
    const token=jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"1h"});
    return token;
}

const registrUser=async(req,res)=>{
    try{
     
        const {name,email,password}=req.body || {};

        if(!name || !email || !password){
            return res.status(400).json({status:400, message:"Name, email, and password are required"});
        }

        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.status(409).json({status:409, message:"User already exists"});
        }

        const user=userModel({
            name,email,password
        });
        const savedUser=await user.save();
        console.log("User registered successfully:", savedUser);
        const token=generateToken(savedUser._id);
        res.status(201).json({status:201, data:{user:savedUser.name, token}});
    }
    catch(error){
          console.error("Error registering user:", error);  
        res.status(500).json({status:500, message:error.message});
    }
}



const LoginUser=async(req,res)=>{
    try{
        const{email,password}=req.body || {};

        if(!email || !password){
            return res.status(400).json({status:400, message:"Email and password are required"});
        }

        const user= await userModel.findOne({email});
        if(!user){
            return res.status(404).json({status:404, message:"Invalid Login credentials"});
        }
        const isPasswordValid= await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(401).json({status:401, message:"Invalid Login credentials"});
        }
        console.log("User logged in successfully:", user);
        const token=generateToken(user._id);
        res.json({status:200,  data:{user:user.name, token}});
    }
    catch(error){
        console.error("Error logging in user:", error);
        res.status(500).json({status:500, message:error.message});
    }
}




export {registrUser,LoginUser};
