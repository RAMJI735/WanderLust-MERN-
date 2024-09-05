if(process.env.NODE_ENV!= "production"){

    require('dotenv').config();

}

const express= require("express");
const app= express();
const mongoose = require("mongoose");
const path= require("path");
const methodOverride= require("method-override");
const ejsmate= require("ejs-mate");
const ExpressError= require("./utilis/ExpressError.js");
const listings= require("./routes/listing.js");
const reviews= require("./routes/review.js");
const session = require("express-session");
const flash= require("connect-flash");
const passport= require("passport");
const Signup= require("./routes/user.js");
const LocalStrategy= require("passport-local");
const User =require("./models/user.js");
const { error } = require("console");


// console.log(process.env.secret); 

// for ejs
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
// for getting data from url
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"/public")));

app.use(session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now()+ 7* 24 * 60 * 60 * 1000,
        maxAge: 7* 24 * 60 * 60 * 1000,
    },
}));
app.use(flash());
// login code middleware from passport
app.use(passport.initialize());
app.use(passport.session());
// middleware from passport local
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// const dburl= process.env.ATLASDB_URL;
const mongoUrl="mongodb://127.0.0.1:27017/wanderlust";
main().then((res)=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongoUrl);
}


app.use((req,res,next)=>{
    res.locals.msg= req.flash("success");
    res.locals.err= req.flash("error");
    res.locals.CurrUser =req.user;

    next();
});

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/",Signup);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not Found"));
});

// error handling middleware
app.use((err,req,res, next)=>{
    // let status= 500;
    let {status=500,message="Something went Wrong"}= err;
    // res.status(status).send(message);
    res.status(status).render("error.ejs",{message});
    // res.send("something wents wrong");
});

app.listen(8080,()=>{
    console.log("running on port 8080");
});