//crypt 
const bcrypt = require('bcryptjs');
// JSONToken
const jwt = require('jsonwebtoken');
//config
const config = require('config');

let jsonWebTokenVerify = function(req, res, next){
    //console.log(req.headers);
    const bearerHeader = req.headers.authorization;    
    if(typeof bearerHeader!=='undefined') {
        const bearer = bearerHeader.split(' ');    
        var token = bearer[1];
        //console.log(token);
        if(token === 'null'){
            return res.status(401).send('Unauthorized Request');
        }
        else { 
            try {
                let payload = jwt.verify(token, config.get('constants.jsonwebtoken.screat'));
            }  
            catch(e){
                //console.log(e);
                if(e.name == 'JsonWebTokenError') {
                    return res.status(401).send('Unauthorized Request'); 
                }  
            }
            //req.userId = payload.subject;
            next();
        }
    } 
    else {
        return res.status(401).send('Unauthorized Request');
    }
}

module.exports = {
    verifyToken: jsonWebTokenVerify
}
