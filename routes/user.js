const express= require("express");
const router= express.Router();
const User= require("../models/user.js");
const wrapAsync = require("../utilis/wrapAsync");
const passport = require("passport");
const { saveRedirect } = require("../middleware.js");
const { signupform, Signup, renderLogin, Login, Logout } = require("../controllers/user.js");


// router.get("/signup",signupform);

router.route("/signup")
.get(signupform)
.post(wrapAsync(Signup));

// router.post("/signup",wrapAsync(Signup));

router.route("/login")
.get(renderLogin)
.post(
saveRedirect,
    passport.authenticate("local",{
        failureRedirect: "/login",
        failureFlash:"true",
    }),
   Login
);





// logout route
router.get("/logout",Logout);
module.exports= router;