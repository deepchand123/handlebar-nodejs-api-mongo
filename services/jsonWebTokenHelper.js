// JSONToken
const jwt = require('jsonwebtoken');

let jsonWebTokenVerify = function(req, res, next){
    //console.log(req.headers);
    const bearerHeader = req.headers.authorization;    
    if(typeof bearerHeader!=='undefined'){
        const bearer = bearerHeader.split(' ');        
        var token = bearer[1];
        //console.log(token);
        if(token === 'null'){            
            return res.status(401).send('Unauthorized Request');
        } else {            
            let payload = jwt.verify(token, 'scretkey');
            //console.log(payload);
            if(!payload){
                return res.status(401).send('Unauthorized Request');
            }
            req.userId = payload.subject;
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
