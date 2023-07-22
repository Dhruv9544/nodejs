const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const { SEC_KEY } = process.env 
const {REF_SEC_KEY} = process.env

module.exports = function(req,res,next){
    console.log("in the AuthMidd");
    token = req.headers.token
    console.log(token);
    
  
    //token -> db 

      jwt.verify(req.headers.token,SEC_KEY,function(err,decoded){//verify given token

  
        if(err){
          if(err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError')
            {
                // console.log("hiiii")
                // const refreshToken = jwt.sign({"email":user.email,"userId":user._id,"role":"user"},REF_SEC_KEY,{expiresIn:'1d'})
                // token=refreshToken
                
                jwt.verify(req.headers.refreshtoken,SEC_KEY,function(err,decoded){
                   if(err){
                    console.log(err);
                    res.json({msg:"Please Login before acccess the service 2",rcode:-9,data:""})
        
                   }else{
                    console.log("decoded from referesh => ",decoded);
                    next();
                   }
                })
            }

          
            
            
        }
        else{

          console.log("decoded => ",decoded);
          next();
        }
         
            
        
      })
}