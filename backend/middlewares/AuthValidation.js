const { z }=require('zod')

const signupValidation=async (req,res,next)=>{
    const requireBody=z.object({
        email:z.string().min(3).max(50).email(),
        name:z.string().min(3).max(50),
        password:z.string().min(8).refine((password)=>/[A-Z]/.test(password),{
            message:"Request at least one Uppercase Character",
        }).refine((password)=>/[a-z]/.test(password),{
            message:"Request at least one lowercase Character",

        }).refine((password)=>/[!@#$%^&*]/.test(password),{
            message:"Request at least one special character"
        })
    })
    const parseData=requireBody.safeParse(req.body);
    if(!parseData.success){
        return res.json({
            message:"Incorrect Format",
            error:parseData.error.issues.map((issues)=>issues.message)
        });
        
    }
    next();
}

const loginValidation=async (req,res,next)=>{
    const requireBody=z.object({
        email:z.string().min(3).max(50).email(),
        password:z.string().min(8).refine((password)=>/[A-Z]/.test(password),{
            message:"Request at least one Uppercase Character",
        }).refine((password)=>/[a-z]/.test(password),{
            message:"Request at least one lowercase Character",

        }).refine((password)=>/[!@#$%^&*]/.test(password),{
            message:"Request at least one special character"
        })
    })
    const parseData=requireBody.safeParse(req.body);
    if(!parseData.success){
        return res.json({
            message:"Incorrect Format",
            error:parseData.error.issues.map((issues)=>issues.message)
        });
        
    }
    next();
}

module.exports={
    signupValidation,
    loginValidation
}