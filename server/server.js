import express from "express";
import connect from "./database/mongodb.js"
import cors from "cors";
import bodyParser from "body-parser";
import TransactionRouters from "./routes/transactions.js"
import AuthApi from "./routes/AuthApi.js"
import passport from "passport";
import passportConfig from "./config/passport.js";
import * as dotenv from "dotenv";
dotenv.config();

const app=express();
const PORT=4000;
app.use(cors());
app.use(bodyParser.json())
app.use(passport.initialize());
passportConfig(passport);

await connect();

app.get("/",(req,res)=>{
    res.send("Hello");
    res.end();
})

app.use("/transaction",TransactionRouters);
app.use("/auth",AuthApi);


app.listen(PORT,()=>{
    console.log("server is running at http://localhost:4000");
})