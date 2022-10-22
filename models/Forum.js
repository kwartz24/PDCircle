const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ForumSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    date_created:{
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String
    },
    title: {
        type: String
    },
    user_id: {
        type: Int32Array
    },
    description: {
        type: String
    },
    update_time: {
        type: Date,
        default: Date.now
    },
    members: {
        type: [Schema.Types.ObjectId],
    }
    //groups size, acitve users 

});

module.exports = forum = mongoose.model('forum', ForumSchema);