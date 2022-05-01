require('dotenv').config({path:'./config.env'});
const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');


connectDB();

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api/posts',postRoutes);

app.get("/", function(req,res){
    res.send("DEAD-END")
});

app.listen(process.env.PORT || 5000, function(){
    console.log(`Express server listening on ${process.env.PORT} !`);
  });
