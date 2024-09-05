const Listing= require("../models/listing");
const review= require("../models/review");

module.exports.postReview=async(req,res)=>{
    // console.log(req.params.id);
    let listing =await Listing.findById(req.params.id);
 //    find post in which u wanna post review
 let newReview= new review(req.body.review);
 newReview.author= req.user._id;
 listing.reviews.push(newReview);
 await newReview.save();
 await listing.save();
 req.flash("success","Review added");
//  res.send("review saved");
 res.redirect(`/listings/${listing._id}`);
 };

 module.exports.destroyReview= async(req,res)=>{
    let {id, reviewId}= req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId }});
    await review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
};
