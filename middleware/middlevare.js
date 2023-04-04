const jwt = require("jsonwebtoken");
require("dotenv").config();


const Auth = (req, res, next) => {
    const token = req.headers?.authorization;
  
    if (!token) {
      return res.status(401).send("please signup first");
    }
  
    try {
      const decode = jwt.verify(token, process.env.KEY);
  
      req.body.userID = decode.userID;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).send("please login first");
    }
  };
  
  module.exports = {

    Auth,
  };