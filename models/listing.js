const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const review= require("./review.js");

const listingSchema= new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
 
        image: {
            url: String,
            filename: String,
        },
        price: Number,
        location: String,
        country: String,

        // display review(save review in mongo, and mongo auto create obj id then with the help of id we can display review)
reviews:[{
    type: Schema.Types.ObjectId,
    ref: "review",
}],

owner:{
    type: Schema.Types.ObjectId,
    ref:"User",
},
geoMetry : {
    type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    
},

category:{
    type: String,
    enum:[""]
}
   
});

// mongoose middleware 
listingSchema.post("findOneAndDelete",async(req,res)=>{
    if(Listing){

        await review.deleteMany({_id: {$in: Listing.reviews}});
    }
});

const Listing= mongoose.model("Listing", listingSchema);
module.exports= Listing;
