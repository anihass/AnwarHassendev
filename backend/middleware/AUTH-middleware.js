require('dotenv').config({ path: "./backend/.env" });
const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

const authMiddleware = (req,res,next)=>{
    

    
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){

        return res.status(401).json({
            success : false,
            message : "Access denied. No token provided"
        })
    }
    //decode the token 
    try{
        const decodeToken = jwt.verify(token,SECRET_KEY);        
        req.userInfo = decodeToken; 
        next();
    }catch(e){
        res.status(401).json({
            success : false,
            message : "Unauthorized: Invalid or expired token"
        });
    };
};

module.exports = authMiddleware;