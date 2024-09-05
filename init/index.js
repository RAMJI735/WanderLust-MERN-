// this index.js file save data to mongoose for save data we want to require schema without blueprint we can not save our data
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing= require("../models/listing.js");
const { object } = require("joi");

main().then((res)=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async() => {
   await Listing.deleteMany({});
   initData.data =initData.data.map((obj)=>({...obj,owner:"660eda78d25a1a07ae8a7cf1"}));
   await Listing.insertMany(initData.data);
   console.log("data was initialized");
};

initDB();
