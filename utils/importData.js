require('dotenv').config({path:'./config.env'});
const fs = require('fs');
const Model = require('../models/Model');//post db schema
const connectDB = require('../config/db');

connectDB();

//tells what data to load from json
//as long as data and schema are the same == no issues
const posts = JSON.parse(fs.readFileSync(`${__dirname}/models.json`,'utf-8'));
//const posts = {
 //   "body": "Amendment I Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the pe",
 //   "author": "machine",
//  "title": "Silver"
 // };

const importData = async() =>{
    try{
        await Model.create(posts);
        console.log('Data Successfully Imported!');
        process.exit();
    }catch(error){
        console.log(`ERROR! with importing: ${error}`);
        process.exit(1);
    }
}

const deleteData = async() =>{
    try{
        await Post.deleteMany({})
        console.log('Data Successfully Deleted')
        process.exit();
    } catch(error){
        console.log(`ERROR! with deletion: ${error}`);
        process.exit(1);
    }
}
//run node utils/importData.js --import
if(process.argv[2] === "--import"){
    importData()
}else if(process.argv[2] === "--delete"){
    deleteData()
}