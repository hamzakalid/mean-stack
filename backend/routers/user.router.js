const express = require('express');

const bcrypt = require('bcrypt');

const path = require('path');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth.middleware');

const User = require('../models/user.model');

const multer  = require('multer')
// const upload = multer({ dest: 'public/uploads/' })

const DIR = 'public/uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, file.fieldname + '-' + Date.now() + '' + path.extname(file.originalname));
    }
});

let upload = multer({storage: storage});



const router = express.Router();


//Controlling & Logic /Code  ================


//login middeleware
// ---------------------------------------------------------
router.post('/login',(req,res,next)=>{
  //login .......
  let theUser;
  //find the selected user using {email}
  User.findOne({email:req.body.email}).then((user)=>{


    if(!user){

      return res.status(401).json({
        msg:"your email or password is not correct!"
      })

    }

    theUser = user;

    return bcrypt.compare(req.body.password,user.password);

  }).then(result=>{

    if(!result){

      return res.status(401).json({
        msg:"your email or password is not correct!"
      })

    }

    //Login ... now
    // console.log(theUser);

    const token = jwt.sign({email:theUser.email,id:theUser._id},
      "this_code_must_be_long_to_be_unguessable",
      {expiresIn: '1h'});

      // console.log(theUser)

    res.status(200).json({
      user : theUser,
      token: token,
      expiresIn : 3600,
    })

  }).catch(err=>{

    console.log(err);

    return res.status(401).json({
      msg:"Somthing happend :("
    })

  })
});


//SinUp middeleware [ create new user]
// -----------------------------------------------
router.post('/sinup',(req,res,next)=>{

  //encrypt the password
  bcrypt.hash(req.body.password,10).then((hash)=>{

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    //define an object of the model user


  //Save the data and return the resulta
  user.save().then((result)=>{

    res.status(201).json({
      msg : "user created!",
      result : result
    })

  }).catch((error)=>{

    res.status(500).json(
      {error : error}
    )

  })

  })



});

//change the profile
router.post('/profile',auth,upload.single('profile'),(req,res,next)=>{



      // check if there is a file
      if (!req.file) {

        console.log("No file received");

        return res.status(404).json({

          msg : "the profile did not update!",
          success: false,

        });

      } else {

        //extract the informations from the token
        var token = req.headers.authorization.split(' ')[1],
            user = jwt.verify(token, "this_code_must_be_long_to_be_unguessable");

        //find
        User.findOne({_id:user.id}).then((user)=>{
          //change the profile
          profile = "/images/"+req.file.filename;

          userData = {
            _id:user._id,
            usename: user.username,
            email: user.email,
            profile: profile
          }

          User.updateOne({_id:user._id},userData).then((result)=>{

            return res.status(200).json({
              success: true,
              msg : "profile updated!",
              profile : profile

            })

          });
        }).catch((err)=>{console.log('no user ');});

        }

      });








module.exports = router;
