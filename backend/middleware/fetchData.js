var jwt = require('jsonwebtoken');
const JWT_SECRET = 'AradhySecretKey$';

const fetchData = (req,res,next) =>{
    const authToken = req.header('authToken');
    if(!authToken){ //if token is not present
        res.status(401).send("Access Denied");
    }
    try{
        const data = jwt.verify(authToken,JWT_SECRET); //if data exits of a valid token, then get user data,else show error
        req.user = data.user; //add the user to the existing request
        next();
    }
    catch(error){
        res.status(500).send("Invalid Token");
    }
}

module.exports = fetchData