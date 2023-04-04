const { registerModel } = require("../models/register.model");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const userRout = express.Router();



userRout.post("/register", async (req, res) => {
    console.log(req.body)
    const {email, password,name} = req.body;
    const userPresent = await registerModel.findOne({email})
    //TODO
    if(userPresent?.email){
        res.send("Try loggin in, already exist")
    }
    else{
        try{
            bcrypt.hash(password, 4, async function(err, hash) {
                const user = new registerModel({email,password:hash,name})
                await user.save()
                res.send("Sign up successfull")
            });
           
        }
       catch(err){
            console.log(err)
            res.send("Something went wrong, pls try again later")
       }
    }
});

//log in
userRout.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await registerModel.find({email})
         console.log(user)
      if(user.length > 0){
        const hashed_password = user[0].password;
        bcrypt.compare(password, hashed_password, function(err, result) {
            if(result){
                const token = jwt.sign({"userID":user[0]._id}, 'abcdefghi');
                res.send({"msg":"Login successfull","token" : token})
            }
            else{
                res.send("Login failed")
            }
      })} 
      else{
        res.send("Login failed")
      }
    }
    catch{
        res.send("Something went wrong, please try again later")
    }
})

//get user here
userRout.get("/", async (req, res) => {
    try {
        const data = await registerModel.find();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = { userRout};