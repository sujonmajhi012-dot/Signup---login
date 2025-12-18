const { success } = require("zod");
const jwt=require('jsonwebtoken')
const { UserModel } = require("../models/User");
const bcrypt=require('bcryptjs')




const signup=async(req,res)=>{
    try{
        const {name ,email,password}=req.body;
        const user= await UserModel.findOne({email});
        if(user){
            return res.status(409).json({
                messege:"User is already exists you can login",
                success:false
            });
        }
        const userModel= new UserModel({name,email,password});
        userModel.password=await bcrypt.hash(password,10)
        await userModel.save()
        res.status(201).json({messege:"signup sucessfull",success:true})

    }catch(e){
        res.status(500).json({messege:"internal server error",success:false})

    }
}

const login=async(req,res)=>{
    try{
        const { email,password}=req.body;
        const user= await UserModel.findOne({email});
        const errorMsg="Email or Password is wrong"
        if(!user){
            return res.status(409).json({
                messege:errorMsg,
                success:false
            });
        }
        const isPassEqual=await bcrypt.compare(password,user.password)
        if(!isPassEqual){
            return res.status(403).json({
            messege:errorMsg,success:false
            })
        }
        const jwtToken=jwt.sign({email:user.email, _id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'});
        res.status(200).json({
            messege:"login sucessfull",
            success:true,
            jwtToken,
            email,
            name:user.name
        })

    }catch(e){
        res.status(500).json({messege:"internal server error",success:false})

    }
}


module.exports={
    signup,
    login
}