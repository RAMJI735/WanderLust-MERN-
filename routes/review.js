const express= require("express");
const review = require("../models/review.js");
const wrapAsync= require("../utilis/wrapAsync.js");
const ExpressError= require("../utilis/ExpressError.js");
// const {reviewSchema}= require("../schema.js");
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js");
const Listing= require("../models/listing.js");
const { postReview, destroyReview } = require("../controllers/review.js");
const router= express.Router({mergeParams: true});
// const isLoggedIn=require("/middleware.js");



// review 
router.post("/",isLoggedIn,validateReview, wrapAsync(postReview));
 
 // delete review
router.delete("/:reviewId",isReviewAuthor,wrapAsync(destroyReview));

module.exports = router;