const jwt = require('jsonwebtoken');

/**
 * this middleware for check if the user authentcated or not
*/

module.exports = (req ,res ,next)=>{

  // console.log(req.headers);

  try {

    // console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token,"this_code_must_be_long_to_be_unguessable");

    // console.log("done");
    next();

  } catch (error) {

    // console.log(error);
    res.status(401).json({"msg": "Unauthorized"})

  }
}

