const express= require("express");
const app= express();
const user= require("./router/user.js");
const cookieParser= require("cookie-parser");


// cookie can not access directley for access or print we use cookie parser package
app.use(cookieParser("secretcode"));

app.use("/user",user);

// // sending cookie 
// app.get("/getcookies",(req,res)=>{
//     res.cookie("name","aakriti");
//     res.send("sent cookie");
// });

// app.get("/greet",(req,res)=>{
//     let {name="unknown"}= req.cookies;
// res.send(`hii,${name}`);
// });


// this cookie can change it is not secure more ,to secure this, 
// if we want no one change cookie or if anyone change the cookie then hme pta chl jaye for that we sent signed cookie

// signed cookie
app.get("/signedcookie",(req,res)=>{
    res.cookie("color","red",{signed: true});
res.send("done");
});

// req.cookie print only unsigned cookies 
app.get("/verify",(req,res)=>{
    console.log(req.cookies);
    res.send("verified");
});

//  print Signed cookie
app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("verified");
});

app.listen(3000,()=>{
    console.log(`server stated on port 3000`);
});