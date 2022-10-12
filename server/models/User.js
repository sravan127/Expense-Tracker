import mongoose, { Schema } from "mongoose";

const {schema}=mongoose;

const userSchema=new Schema(
    {
    firstName:{type:String, required:["First Name is required"]},
    lastName: {type:String, required:["Last Name is required"]},
    email:{type:String, required:["Email is required"]},
    password:{type:String, required:["Password is required"]},
    },
    {timestamps:true}
)

export default new mongoose.model("User", userSchema)