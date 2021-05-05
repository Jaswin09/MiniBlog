const express = require ('express')
const router = express.Router()
const mongoose = require('mongoose')
const User=mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {Jwt_sec} = require('../config/keys')
const requirelogin = require('../middleware/requirelogin')

router.get('/protected',requirelogin,(req,res)=>{
    res.send('hello world')
})

router.post('/signup',(req,res)=>{
    const {name,email,password,pic} =req.body
    if(!email || !password|| !name){
        res.status(422).json({error:'please add all the fields'})
    }
User.findOne({email:email})
.then((savedUser)=>{
    if(savedUser){
        return res.status(422).json({error:"user already exists with that email"})
    }
    bcrypt.hash(password,8)
    .then(hashedpassword =>{
        const user = new User({
            email,
            password:hashedpassword,
            name,
            pic
        })
        user.save()
        .then(user=>{
            res.json({message:"Thank you for being a part of our Mini family"})
        })
        .catch(err=>{
            console.log(err)
        })
    })
   
})
.catch(err=>{
    console.log(err)
})

})

router.post('/signin',(req,res)=>{
    const {email,password} =req.body
    if(!email || !password){
        return res.status(422).json({error:"Please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},Jwt_sec)
                const {_id,name,email,followers,following,pic}=savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


module.exports = router