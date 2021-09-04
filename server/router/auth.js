const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
require('../db/connection')
const User = require('../model/userSchema');

router.get("/", (req, res) => {
    res.cookie("newcookie","ratnesh")
    res.send("hello from the server router js");
})

 
// router.post("/register",(req,res)=>{

//     const {name,email,phone,work,passward,cpassward}=req.body;

//    if(!name || !email || !phone || !work || !passward || !cpassward){
//      return  res.status(422).json({error:"plz fill the all boxes"});
//    }

//     User.findOne({email:email}).then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"Email already Exist"})
//         }

//         const user = new User({name,email,phone, work ,passward,cpassward});

//         user.save().then(()=>{
//             res.status(201).json({message:"user registered successfuly"})
//         }).catch((err)=>res.status(500).json({error:"failed to registered"}));
//     }).catch(err=>{console.log(err)});

// })

//   async/await method

router.post("/register", async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "plz fill the all boxes" });
    }
    try {

        const userExist = await User.findOne({ email: email })
        // console.log(userExist)
        if (userExist) {
            return res.status(422).json({ error: "Email already Exist" });
        } else if (password != cpassword) {
            return res.status(400).json({ message: "password not matched" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            await user.save();
            res.status(201).json({ message: "user register successfuly" });

        }
    } catch (err) {
        console.log(err)
    }
})

 router.post("/signin", async (req,res)=>{
    //  console.log(req.body)
    //  res.json({message:"successful"})
     try {
         let token;
         const {email , password} = req.body;
         if(!email || !password){
             return res.status(400).json({error:"plz fill the data"})
         }

         const userLogin = await User.findOne({email:email});
        //  console.log(userLogin)

         if(userLogin){
             const isMatch = await bcrypt.compare(password , userLogin.password)

             token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
                
            });
             
             //   console.log(userLogin.password)
             if(!isMatch){
                 res.status(400).json({error:"password not match"})
                }else{
                    res.json({message:"user login succefuuly"})
                }         
            }else{
                res.status(400).json({error:"login failes , please check your email"})
            }
     } catch (error) {
          console.log(error)
     }
 })
module.exports = router;