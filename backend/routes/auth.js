const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchData = require('../middleware/fetchData');

const JWT_SECRET = 'AradhySecretKey$';

//ROUTE1: CREATE USER/SIGNUP
router.post(
  "/createUser", // when we access this endpoint, we send some data(email,pswd etc) then we validate it and store it in our database and show response message
  [
    // Name should not be empty
    body("name", "Name is required").notEmpty(),

    // Email should not be empty and must be a valid email
    body("email", "Please include a valid email").isEmail(),

    // Password should not be empty and must be at least 6 characters long
    body("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email }); //if previous user with the same email existed
      if (user) {
        return res
          .status(400)
          .json({ success:false,error: "Sorry an user with the same email already exists" });
      }
      //hashing the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);
      //create user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      //providing web token for a session
      const data = {
        user: {
            id: user.id,
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      console.log(authToken);
      
      res.json({ success:true,authToken, message: "User created successfully" }); //THis is an object containing multiple objects, sending response to our api endpoint.
      console.log("User Registered:)");

    } catch (error) {
      //if any additional error occurs
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);


//ROUTE 2: LOGIN
router.post(
    "/login", // when we access this endpoint, we send some data(email,pswd etc) then we validate it and store it in our database and show response message
    [
  
      // Email should not be empty and must be a valid email
      body("email", "Please include a valid email").isEmail(),
  
      // Password should not be empty and must be at least 6 characters long
      body("password", "Password must be at least 6 characters").isLength({
        min: 6,
      }).exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); //if we find any errors caught by our express handler, then we throw error right away
        }
        try{
            let success = false;
            //desconstruct the user entered data
            const {email, password} = req.body;
            let user = await User.findOne({ email: email }); //if previous user with the same email existed
            if (!user) {
              return res
                .status(400)
                .json({ success,error: "Invalid login credentials" });
            }
            //if user exists, then verify it with the hashed password
            //hashing the user given password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password,salt);
            //if the passwords dont match
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if(!isPasswordMatch){
                return res
                .status(400)
                .json({success, error: "Invalid login credentials" });
            } 
            //if password is correct, create an authorization token
            const data = {
                user: {
                    id: user.id,
                }
              }
            const authToken = jwt.sign(data,JWT_SECRET);
            console.log(authToken);
            success = true;
            //Send the response back to the client
            res.json({ success,authToken, message: "User logged in." });

        }catch(error){
            //if any additional error occurs
            console.error(error.message);
            res.status(500).send("Some error occured while logging in.");
        }

    }
);

//ROUTE 3: GET USER DETAILS

router.post('/getUser',fetchData,
    async (req, res) => {
        try{
            const userId = req.user.id; //we have added the user fetched from the JWT token verification function into our request, so fetch the userId from that request
            let user = await User.findOne({_id: userId}).select("-password"); 
            res.json(user);
        }catch(error){
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    }
);


module.exports = router;
