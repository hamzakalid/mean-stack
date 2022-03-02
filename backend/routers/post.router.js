const express = require('express');
const path = require('path');
var upload_image = require("../image_upload.js");

const Post = require('../models/post.model')
var app= express();
const router = express.Router();



//Middleware : get all post

router.get("",(req,res,next)=>{

  //pagtions
  const pageSize  = req.query.pagesize;
  const currentPage  = req.query.page;

  const postQuery = Post.find();
  //store the count of the posts
  let postlength =0 ;
    Post.count({}, function( err, count){
      postlength =  count;
    })


  if(pageSize && currentPage){
    postQuery.skip(pageSize * (currentPage-1)).limit(pageSize)
  }

  postQuery.then((docs) => {

    return res.status(200).json({
      msg: "post feached successfuly",
      count: ""+postlength,
      posts: docs,
    })

  })

})


//Middleware : create new post

router.post('',(req,res,next)=>{



  // console.log(req.body.title)

  const post = new Post({
    title : req.body.title,
    content : req.body.content,
    description : req.body.description,
    user : req.body.user,
    date : req.body.date
  })

  post.save().then((result) => {
    // console.log(result)
    res.status(200).json({
      message : "the post created successfuly",
      post : result
    });

  }).catch((error)=>{
    console.log(error);
    res.status(400).json({
      message : "error happends",
    });
  })

});


router.post("/image_upload", function (req, res,next) {
  console.log("Image upload module .");

  upload_image(req, function(err, data) {

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }

    let link = req.protocol + "://"+req.get('host')+"/images/"+data.link;
    res.send({link:link});
  });
});



module.exports = router;
