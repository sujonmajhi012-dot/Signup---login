const jwt=require('jsonwebtoken');

const ensureAuthentication=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(403).json({
            messege:"UNthorized JWT token is required"
        })
    }
    try{
        const check=jwt.verify(auth,process.env.JWT_SECRET);
    req.user=check;
    next()

    }catch(e){
        return res.status(403).json({
            messege:"UNthorized JWT token is required",
            error:e
        })
    }
    
}

module.exports=ensureAuthentication;