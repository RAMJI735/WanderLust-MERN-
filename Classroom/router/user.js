const express= require("express");
const router= express.Router();


// user route
router.get("/",(req,res)=>{
    res.send("this is root");
});

router.get("/new",(req,res)=>{
    res.send("this is new route");
});

module.exports= router;
