const express = require("express");
const router = express.Router();
// const { listingSchema, reviewSchema } = require("../schema.js");
const wrapAsync = require("../utilis/wrapAsync.js");
// const mongoose = require("mongoose");
// const ExpressError = require("../utilis/ExpressError.js");
// const Listing = require("../models/listing.js");
const { isLoggedIn, isOwned, validateListing } = require("../middleware.js");
const { populate } = require("../models/review.js");
const listingController= require("../controllers/listings.js");
const multer  = require("multer");
const {storage}= require("../cloudconfig.js");
const upload = multer({ storage });
// const upload = multer({ dest: 'uploads/' })





// app.get("/", (req,res)=>{
//     console.log("working");
// });

// combine "/"get route and create route 
router
.route("/")
.get( wrapAsync(listingController.index))
.post( isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
     wrapAsync(listingController.postlisting)
);
// .post( upload.single("listing[image]"),(req,res)=>{
//     res.send(req.file);
// })

// new route
router.get("/new", isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get( wrapAsync(listingController.ShowListing))
.put(validateListing, isOwned,upload.single("listing[image]"), wrapAsync(listingController.updatelisting))
.delete( isLoggedIn,isOwned,  wrapAsync(listingController.deletelisting));

// //index route 
// router.get("/", wrapAsync(listingController.index)
// );




// Create Route (second method to get data from form )

// router.post("/", validateListing, isLoggedIn, wrapAsync(listingController.postlisting)
// );

// create route (first method)
// app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {
//     if (!req.body.listing) {
//         throw new ExpressError(400, "Send valid data for listing");
//     }
//     try {
//         let listing = req.body.listing;
//         const newListing = new Listing(listing);
//         await newListing.save();
//         res.redirect("/listings");
//     } catch (error) {
//         next(error);
//     }
// }));


// edit form route
router.get("/:id/edit", isLoggedIn, isOwned, wrapAsync(listingController.editform));

//  update route
// router.put("/:id", validateListing, isOwned, wrapAsync(listingController.updatelisting));

// delete route
// router.delete("/:id", isLoggedIn, isOwned, wrapAsync(listingController.deletelisting));

// show data
// router.get("/:id", wrapAsync(listingController.ShowListing));


module.exports = router;