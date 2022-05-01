const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,'Please provide a title!']
    },
    author:{
        type: String,
        required: [true,'Please provide an author!']
    },
    body:{
        type: String,
        required: [true,'Please provide a body!']
    },
    link:{
        type: String,
        required: [true,'Please provide a link!']
    },
    id:{
        type: String,
        required: [true,'Please provide an ID!']
    }
});

const Model = mongoose.model('Model', postSchema);
module.exports = Model;
