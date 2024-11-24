const express = require('express');
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchData = require('../middleware/fetchData');


//ROUTE 1: FETCH ALL THE NOTES OF AN USER/ LOGIN REQUIRED
router.post('/getNotes',fetchData,async (req,res)=>{
    try{
        //now we need to search notes collection using user id which is the foriegn key present in each document
        const note = await Note.find({user: req.user.id});
        res.send({note,message: 'User Notes fetched'}); // send the response back
    }
    catch(error){
        console.error(error.message);
        res.status(401).send("Some error occured");
    }
})

//ROUTE 2: CREATE NOTES, LOGIN REQUIRED
router.post(
    "/createNote", // when we access this endpoint, we send some data(email,pswd etc) then we validate it and store it in our database and show response message
    [
      // Email should not be empty and must be a valid email
      body("title", "Title should be atleast of length 3").isLength({min: 3}),
  
      // Password should not be empty and must be at least 6 characters long
      body("description", "Description must be at least 6 characters").isLength({
        min: 6,
      }),
    ],fetchData,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); //if we find any errors caught by our express handler, then we throw error right away
        }
        try{
            const {title, description, tag} = req.body;
            //create the user's note in teh database
            newNote = await Note.create({
                title: title,
                description: description,
                tag: tag,
                user: req.user.id  //creating a document/note in the collection with the user id 
            });
            res.send(newNote);
        }catch(error){
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    }
);

//ROUTE 3 : UPDATE NOTE
router.put(
    "/updateNote/:id", // when we access this endpoint, we send some data(email,pswd etc) then we validate it and store it in our database and show response message
    fetchData,async (req,res) =>{
        try{
            const {title, description, tag} = req.body;
            const newNote = {};
            if(title) newNote.title = title; //if title exists then update title
            if(description) newNote.description = description;
            if(tag) newNote.tag = tag;
            //first we have to find that note of the user, and update the newly update content of that note
            //find the note with the specific object id
            let note = await Note.findById(req.params.id);  //req.params.id is the id of the note that we want to update

            //check if a note exisits or not
            if(!note){
                return res.status(404).send("Note not found");
            }

            //check if the creater of the note is same as the person trying to update it
            if(req.user.id !== note.user.toString()){
                return res.status(403).send("Not Allowed"); 
            }
            note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true}); //update the note
            res.send(note);
        }
       catch(error){
            console.log(error);
            res.status(500).send("Some error occured");
        }
    }
)

//ROUTE 4: DELETE A NOTE
router.delete(
    "/deleteNote/:id", // when we access this endpoint, we send some data(email,pswd etc) then we validate it and store it in our database and show response message
    fetchData,async (req,res) =>{
        try{
            //find the note with the given note id in URL
            let note = await Note.findById(req.params.id);
            if(!note){
                return res.status(404).send("Note not found");
            }
            //check if the person deleting the note has access to delete it or not
            if(req.user.id !== note.user.toString()){
                return res.status(403).send("Not Allowed");
            }
            await Note.findByIdAndDelete(req.params.id);
            res.send({message: "Note Deleted"});
        }catch(error){
            console.error(error);
            res.status(500).send("Some error occured");
        }
    }
);
module.exports = router