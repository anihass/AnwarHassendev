require('dotenv').config({ path: "./backend/.env" });
const nodemailer = require('nodemailer');
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const signUp = async(req,res)=>{
    try{
        const {userName,password,email,role} = req.body;
        //check
        const chekUser = await User.findOne({$or:[{userName},{email}]});
        if(chekUser){
            res.status(404).json({
                success : false,
                message:'user already exist please try other user name'
            })
        }
         
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //creat a user

        const newlycreatedUser = new User({
            userName,
            email,
            password : hashedPassword,
            role : role || 'user'

    })
    await newlycreatedUser.save();
    if (newlycreatedUser){
        res.status(200).json({
            success : true,
            message : "User registered successfuly!"
        })
    }else{
        res.satus(404).json({
            success : false,
            message : "user already exist"
        })

    }    
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : "somthing went wrong!"
        });        
    }
};

const logIn = async(req,res)=>{
    try{
        const {userName,password} = req.body;
        const user = await User.findOne({userName});
        if(!user){
            return res.status(404).json({
                success : false,
                message : "user  not found"
            });
        };
        const matchPassword = await bcrypt.compare(password,user.password);
        if(!matchPassword){
            return res.status(401).json({
                success : false,
                message : "incorrect password"
            });
        };

        const accesstoken = jwt.sign({
            userId : user._id,
            userName: user.userName,
            role:user.role
        },SECRET_KEY,{expiresIn :'15m'});

        res.status(200).json({
            success : true,
            message:'Logged in successfully!',accesstoken
        });        
    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message:"Something went wrong!"
        })

    }
};

const sendMessage = (req,res) =>{
    try{
        
    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS// use Gmail App Password, not your real password
        }
    });

  const mailOptions = {
        from: process.env.EMAIL_USER, // your Gmail
        replyTo: email             ,
        to: "anwarhassen28@gmail.com",
        subject: `New Contact Form Message from ${name}`,
        text: message
    };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Erorr sending message!"
        })      
        } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({
            success : true,
            message : "message successfuly sent!"
        })
        }
    });

    }catch{        
        console.log(error);
        res.status(500).json({
            success : false,
            message:"Something went wrong!"
        })
    }
};


module.exports = {signUp,logIn,sendMessage};