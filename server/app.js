const dotenv=require('dotenv')
const mongoose = require('mongoose')
const express=require('express')
const app=express();
dotenv.config({path:'./config.env'})
require('./db/connection.js')

 
const PORT = process.env.PORT;
app.use(express.json());

// we link the router file
app.use(require('./router/auth'));

// const User=require('./model/userSchema');
 
// middleware
const middleware=(req,res,next)=>{
  console.log("this is my middleware")
//   alert('thiss is middleware')
  next();
}

// middleware();

app.get("/",(req,res)=>{
    res.send("hello world from the server app js");
})
app.get("/about",middleware,(req,res)=>{
    res.send("about_us");
})
app.get("/contact",(req,res)=>{
    res.send("contact page");
})
app.get("/login",(req,res)=>{
    res.send("login page");
})
// app.get("/register",(req,res)=>{
//     res.send("register page");
// })


 
app.listen(PORT,()=>{
    console.log(`server connected on ${PORT}`)
})