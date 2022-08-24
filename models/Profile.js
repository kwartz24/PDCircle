const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema
const ProfileSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  affliation: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills:{
    type: [String],
    required: true
  },
  speciality: {
    type: [String]
  },
  bio: {
    type: String
  },
 
  interests: {
    type: [String]
  },
  date : {
    type: Date,
    default: Date.now
  }

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);