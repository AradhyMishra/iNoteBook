const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/createUser',[
    // Name should not be empty
    body('name', 'Name is required').notEmpty(),

    // Email should not be empty and must be a valid email
    body('email', 'Please include a valid email').isEmail(),

    // Password should not be empty and must be at least 6 characters long
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],async (req,res)=>{
     const errors = validationResult(req);

     if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
     }
     try{
        let user = await User.findOne({email: req.body.email}); //if previous user with the same email existed
        if(user){
            return res.status(400).json({error: "Sorry an user with the same email already exists"});
        }
        //create user
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
         })
         res.json({user,message: 'User created successfully' });
         console.log("User Registered:)")
     }catch(error){ //if any additional error occurs
        console.error(error.message);
        res.status(500).send("Some error occured");
     }
     
     
});

module.exports = router