const jwt = require("jsonwebtoken")

const  authenticateToken =  (req, res, next) => { // "next" here is jab const  authenticateToken ka poora kaam ho jayega tab aaage kiya hone hai yeh yeh batata hai
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split (" ")[1]// split the bearer and the token
    if (token == null){
        return res.status(401).json ({message : "Authentication token required"})

    }
    jwt.verify(token, "bookstore123" , (err,user) =>{
        //bookstore123 is the key
        if (err){
            return res.status(403).json({message : "Token Expired, Please SignIn Again"})

        }
        req.user = user
        next();
    });
};
module.exports = { authenticateToken}