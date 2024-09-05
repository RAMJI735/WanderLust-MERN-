const session = require("express-session");
const express = require("express");
const app = express();
const ejs= require("ejs");
const path= require("path");
const flash= require("connect-flash");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true,
}));

app.use(flash());

app.use((req,res,next)=>{
    res.locals.msg= req.flash("success");
    res.locals.name= req.session.name;
    res.locals.err= req.flash("error");
    next();
});
// app.get("/reqcount", (req, res) => {
//     if (req.session.count) {
//         req.session.count++;
//     }
//     else {
//         req.session.count = 1;
//     };
//     res.send(`you sent a request ${req.session.count}`);
// });
app.get("/register", (req, res) => {
let {name="Guest"}= req.query;
req.session.name= name;
// res.send(name);
if(name=="Guest"){
    req.flash("error","user not registered successful!");
}
else{
    req.flash("success","user registered successful!");

}
res.redirect("/hi");

});



app.get("/hi",(req,res)=>{
    res.render("req.ejs"); 
});

app.listen(3000, () => {
    console.log(`server stated on port 3000`);
});

