const jwt = require("jsonwebtoken");
function newTokenCreator(payload,key,options){
    return jwt.sign(payload,key,options)
}

module.exports=newTokenCreator