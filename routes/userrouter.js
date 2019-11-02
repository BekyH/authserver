const express = require('express');
const User = require('../models/user');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
userRouter.route('/')
.post((req,res,next)=>{
    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,10)
        
    })
    newUser.save((err)=>{
        if(err){
        return res.status(500).json({
            title:"error",
            error:"email already taken"
        })
    }
    res.status(200).json({
        title:"signup successfully done!"
    })
    })
    // User.create(req.body)
    // .then((user)=>{
    //     res.statusCode = 200;
    //     res.setHeader('Content-type','application/json');
    //     res.json(user);
    // },((err)=>next(err)))
    // .catch((err)=>next(err))
})
.get((req,res,next)=>{
    User.find({}).exec()
    .then((user)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(user);
    })
})
.delete((req,res,next)=>{
    User.remove({})
    .then((user)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(user);
    },(err)=>next(err))
    .catch((err)=>next(err))
});
userRouter.route('/login')
.post((req,res,next)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(err) return res.status(500).json({
            title:"server error",
            error:err
            
        })
        if(!user){
            return res.status(401).json({
                title:"user not find",
                error:'invalid credentials'
            })
        }
        if(!bcrypt.compareSync(req.body.password,user.password)){
            return res.status(401).json({
                title:"user not find",
                error:'invalid credentials'
            })
        }
        let token = jwt.sign({userId:user._id},'secretkey');
        return res.status(200).json({
            title:"login success",
            token:token
        })
    })
})
module.exports = userRouter;