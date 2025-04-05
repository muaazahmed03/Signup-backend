import express from "express";
import bcrypt from "bcryptjs";
import mongoose from 'mongoose';
import userModel from "./model/userSchema.js";
import cors from "cors";
import { connectDB } from "./database/database.js";
import router from "./router/routes.js";
import "dotenv/config";


const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/muaaz', router);

connectDB();


app.listen(PORT, ()=>{
    console.log("server start");
})