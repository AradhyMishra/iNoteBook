const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String, 
        required: true,
    },
    password: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    date: {
        type: Date, 
        default: Date.now
    }
})

// This line creates a Mongoose model for the 'user' collection(create a collection named 'users'(name is pluraized) in the database which will store data according to schema specified)
const User = mongoose.model('user',userSchema);
/* User.createIndexes(); */
module.exports = User;