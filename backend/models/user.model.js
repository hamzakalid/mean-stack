const mongoose = require("mongoose")

const uniqueValidateor = require("mongoose-unique-validator");

//Create and schema [the Structure]
const userSchema = mongoose.Schema({
  username : {
    type : String,
    required: true,
  },
  email : {
    type :String,
    required : true,
    unique : true
  },
  password : {
    type :String,
    required : true,
  }
})

userSchema.plugin(uniqueValidateor)

//Make this schema valid for other files
module.exports = mongoose.model('User',userSchema);
