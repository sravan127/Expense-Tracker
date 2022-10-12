import {Router} from "express";
import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router=Router();

router.post("/register", async (req,res)=>{
    const {email, firstName, lastName, password}=req.body;
    const userExists=await User.findOne({email});
    if(userExists){
        res.status(406).json({message:"User Already Exists"})
        return;
    }
    const salt=await bcrypt.genSaltSync(10);
    const hashedPassword=await bcrypt.hashSync(password,salt);
    const user=await User({email, firstName, lastName, password:hashedPassword});
    await user.save();
    res.status(201).json({message: "user created SuccessFully!!"})
})

router.post("/login",async (req,res)=>{
    const {email, password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        res.status(406).json({message:"User Not Found!"})
        return;
    }

    const matched=await bcrypt.compare(password,user.password);
    if(!matched){
        res.status(406).json({message:"Password does not match!"})
        return;
    }

    const payload={username: email, _id:user._id}
    const token=jwt.sign(payload,process.env.JWT_SECRET);
    res.status(200).json({message:"Login success!",token})
    
})


export default router;