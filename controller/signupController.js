import userModel from "../model/userSchema.js";
import bcrypt from "bcryptjs";

export const signupController = async (req,res) =>{

    try {

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

    } catch (error) {
        console.log(error);
    }
}