const ensureAuthentication = require('../middlewares/auth');

const router=require('express').Router();

router.get("/",ensureAuthentication,(req,res)=>{
    console.log('---- logged in user detail ---', req.user);
    res.status(200).json([{
        name:"mobile",
        price:10000

    },{
        name:"tv",
        price:5000
    },{
        name:"car",
        price:"10L"

    }])
    
    
})

module.exports=router