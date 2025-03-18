import express from "express";
import bcrypt from "bcryptjs";
import mongoose from 'mongoose';
import userModel from "./model/userSchema.js";
import cors from "cors";


const app = express();

const PORT = 6060;

app.use(express.json());
app.use(cors());


const DB_URI = "mongodb+srv://admin:admin@cluster0.nflly.mongodb.net/";

mongoose.connect(DB_URI);

mongoose.connection.on("connected", () => {
  console.log("mongodb connect successfully..");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});


app.post('/api/signup', async (req,res)=>{
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName || !email || !password){
        res.status(400).json({
            message: "required field are missing",
        })
    }

    const encrptPassword = await bcrypt.hash(password,5);

    console.log(encrptPassword);

    // create database now 

    let userObj = {
        firstName,
        lastName,
        email,
        password: encrptPassword,
    };

    const saveData = await userModel.create(userObj);

    res.status(200).json({
        message: 'signup successfully ',
        saveData,
    })
});


app.post("/api/login", async (req,res)=>{
    const { email, password} = req.body;

    if(!email || !password){
        res.status(400).json({
            message: "required field are missing",
        })
    }

   const emailExist = await userModel.findOne({email});

   if (!emailExist){
    res.status(400).json({
        message: "invalid email or password"
    })
   }

   console.log(emailExist);

   const comparePassword = await bcrypt.compare(password, emailExist.password);

   if(!comparePassword){
    res.status(400).json({
        message: "invaild email or password",
    });
   }

   res.status(200).json({
    message: "login successfully",
   })
})


app.listen(PORT, ()=>{
    console.log("server start");
})