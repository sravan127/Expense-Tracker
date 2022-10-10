import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app=express();
const PORT=4000;
app.use(cors);

await mongoose.connect("mongodb+srv://sravan:sravan123@cluster0.ue6g8tf.mongodb.net/?retryWrites=true&w=majority")

console.log("Mongo DB connection made");

app.get("/",(req,res)=>{
    res.send("Hello");
    res.end();
})

app.listen(PORT,()=>{
    console.log("server is running at http://localhost:4000");
})