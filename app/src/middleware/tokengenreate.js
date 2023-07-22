const jwt = require("jsonwebtoken")

function TokenGenerator(privatekey,publickey,option){

    this.privatekey = privatekey
    this.publickey = publickey
    this.option = option
}

TokenGenerator.prototype.sign = function(payload,signOption){

    const jwtSignOption = Object.assign({},signOption,this.option)
    return jwt.sign(payload,this.privatekey, jwtSignOption)
}

// refreshOptions.verify = options you would use with verify function
// refreshOptions.jwtid = contains the id for the new token

TokenGenerator.prototype.refresh = function(token,refreshOptions){

    const payload = jwt.verify(token,this.publickey,refreshOptions.verify)
    delete payload.iat
    delete payload.exp
    delete payload.nbf
    delete payload.jti 

    const jwtSignOption = Object.assign({},this.option,{jwtid : refreshOptions.jwtid})
    return jwt.sign(payload,this.privatekey,jwtSignOption)

}

module.exports =  TokenGenerator