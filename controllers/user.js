

module.exports.signupform= (req,res)=>{
    res.render("./user/user.ejs");
};

module.exports.Signup = async(req,res)=>{
    try{
        let {username, email, password}= req.body;
    const newUser= new User({email,username});
    const registeredUser= await User.register(newUser, password);
    // User is the model name
    console.log(registeredUser);
    // direct login via signup
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");
    });

    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};


module.exports.renderLogin= (req,res)=>{
    res.render("./user/login.ejs");
};

module.exports.Login= async (req,res)=>{
    req.flash("success","Welcome back to wanderlust");
    let redirect= req.session.redirectUrl || "/listings"; 
    res.redirect(redirect);
    };

    module.exports.Logout= (req,res)=>{
    req.logOut((err)=>{
        if(err){
        return next(err);
    }
req.flash("success","Logged you out!");
res.redirect("/listings");
});

}