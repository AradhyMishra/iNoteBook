const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
     user:{
        type: mongoose.Schema.Types.ObjectId, // a foregin key of the users collection to find the user notes
        ref: 'user'
    }, 
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    tag: {
        type: String, 
        default: 'General',
    },
    date: {
        type: Date, 
        default: Date.now
    }
})

//this will create a collection name 'notes' in the databse with the schema mentioned above
module.exports = mongoose.model('notes',NotesSchema);