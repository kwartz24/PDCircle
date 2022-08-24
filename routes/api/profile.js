const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation

const validateProfileInput = require('../../validation/profile');

//Load Profile Model
const Profile = require('../../models/Profile');
//Load User Profile
const User = require('../../models/User');
const profile = require('../../validation/profile');

// @route GET api/profile/test
// @desc Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Profile Works"}));

// @route GET api/profile
// @desc Get current users profiles
// @access Private

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors ={};

  Profile.findOne({ user: req.user.id})
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile ='There is no profile for this user';
      return res.status(404).json(errors);
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json(err));
}
);
// @route GET api/profile/all
// @desc GET profile by handle
// @access Public

router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if(!profiles) {
      error.noprofile ='There are no profiles';
      return res.status(404).json(errors);
    }
    res.json(profiles);
})
.catch(err => res.status(404).json({ profile: 'There are no profile'}));
});




// @route GET api/profile/handle/:handle
// @desc GET profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  Profile.findOne({handle: req.params.handle })
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile ='There is no profile for this user';
      return res.status(404).json(errors);
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json(err)); 
});

// @route GET api/profile/user/:user_id
// @desc GET profile by user ID
// @access Public

router.get('/user/:user_id', (req, res) => {
  const error = {};

  Profile.findOne({ user: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => 
      res.status(404).json({profile: 'There is no profile for this user'}));
});


// @route POST api/profile
// @desc Create current users profiles
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  const {errors, isValid } = validateProfileInput(req.body);

  //Check validation
  if(!isValid) {
    //Return any errors with 400 status
    return res.status(400).json(errors);
  }

 // Get fields
 const profileFields ={};
 profileFields.user = req.user.id;
 if(req.body.handle) profileFields.handle = req.body.handle;
 if(req.body.affliation) profileFields.affliation = req.body.affliation;
 if(req.body.website) profileFields.website = req.body.website;
 if(req.body.location) profileFields.location = req.body.location;
 if(req.body.status) profileFields.status = req.body.status;
 if(req.body.specialty) profileFields.specialty = req.body.specialty;
 if(req.body.bio) profileFields.bio = req.body.bio;
 if(req.body.interests) profileFields.interests = req.body.interests;
 if(req.body.date) profileFields.date = req.body.date;


 Profile.findOne({ user: req.user.id})
 .then(profile => {
   if (profile) {
     //Update
     Profile.findOneAndUpdate(
       {user: req.user.id},
       { $set: profileFields},
       {new: true}
     )
     .then(profile => res.json(profile));
   } else {
     //Create

     //Check if handle exists
     Profile.findOne ({ handle: profileFields.handle}).then(profile => {
       if(profile) {
         errors.handle = 'This handle already exists';
         res.status(400).json(errors);
       }

       // Save Profile
       new Profile(profileFields).save().then(profile => res.json(profile));
     });
   }
 });
 
}
);

//@route   POST api/profile/experience
//@Des     Add experience to profile
//@ access Private

router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) =>{
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    const newExp = {
      title: req.body.title,
      affiliation: req.body.affiliation,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    }

    //Add to exp array
    profile.experience.unshift(newExp);

    profile.save().then(profile => res.json(profile));
  })
});
             
module.exports = router;