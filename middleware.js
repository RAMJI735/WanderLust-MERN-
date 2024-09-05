const Listing = require("./models/listing");
const ExpressError= require("./utilis/ExpressError.js");
const {listingSchema,reviewSchema}= require("./schema.js");
const review = require("./models/review.js");

// validate listing with joi
module.exports.validateListing=(req,res,next)=>{
    let {error} =listingSchema.validate(req.body);
// console.log(result);

if(error){
    let errMsg= error.details.map((el)=> el.message).join(",");
    // throw new ExpressError(404, result.error);
    throw new ExpressError(404, errMsg);
} else{
    next();
}
};

// validate review by joi
module.exports.validateReview=(req,res,next)=>{
    let {error} =reviewSchema.validate(req.body);
// console.log(result);

if(error){
    let errMsg= error.details.map((el)=> el.message).join(",");
    // throw new ExpressError(404, result.error);
    throw new ExpressError(404, errMsg);
} else{
    next();
}
};



// user login hai ya nhi
module.exports.isLoggedIn= (req,res,next)=>{
    if(!req.isAuthenticated()){
        // agr user login nhi h
        req.session.redirectUrl= req.originalUrl;
        req.flash("error","you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
}
module.exports.saveRedirect= (req,res,next)=>{
if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
}
next();
};

// check owner 
module.exports.isOwned= async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);

    if(!listing.owner._id.equals(res.locals.CurrUser._id)){
req.flash("error","you don,t have permission because you are not the Owner of the listing");
return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor= async(req,res,next)=>{
    let {id, reviewId}= req.params;
    let reviews=await review.findById(reviewId);
    if(!reviews.author._id.equals(res.locals.CurrUser._id))
    {
        req.flash("error","You can not Delete this review");
        return res.redirect(`/listings/${id}`);
    }
    next();

}

