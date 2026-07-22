const isadmin = (req,res,next)=>{
    if(req.userInfo.role !== 'admin'){
        return res.status(401).json({
            success : false,
            message : "can not enter admin page via user role"
        })
    }
    next();
}

module.exports = isadmin;