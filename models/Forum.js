const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ForumSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String
    }
    //groups size, acitve users 

});

module.exports = forum = mongoose.model('forum', ForumSchema);