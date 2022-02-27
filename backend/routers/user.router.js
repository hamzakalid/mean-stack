const express = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/user.model');


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

      // console.log(token)

    res.status(200).json({
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


module.exports = router;
