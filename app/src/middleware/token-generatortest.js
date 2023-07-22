const  TokenGenerator = require('./tokengenreate')
const jwt = require('jsonwebtoken')

const tokenGenertator  = new TokenGenerator('a','a',{algorithm:'HS256' , keyid : '1' , noTimestamp : false , expiresIn :'2m',notBefore:'2s'})
token =  tokenGenertator.sign({ myclaim: 'something' }, { audience: 'myaud', issuer: 'myissuer', jwtid: '1', subject: 'user' })

setTimeout(() => {
    
    token2 = tokenGenertator.refresh(token,{verify : { audience: 'myaud', issuer: 'myissuer' }, jwtid:'2'})
    console.log(jwt.decode(token, {complete:true}));
    console.log("token2");
    console.log(jwt.decode( token2 , {complete:true}));

}, 3000);