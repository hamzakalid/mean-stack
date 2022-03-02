const mongoose = require("mongoose")


//Create and schema [the Structure]
const postSchema = mongoose.Schema({

  content : {
    type :String,
    required : true,
  },
  likes:{
    type : Number,
    default : 0,
  },
  replay_on:{
    type : string,
  },
  post:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Post",
  },

  user : {
    type :String,
  },

  date : {
    type :Date,
  }

})

//Make this schema valid for other files
module.exports = mongoose.model('Post ',postSchema);
