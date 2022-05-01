const mongoose = require('mongoose')

const connectDB = async()=>{
try{
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('MongoDB Connection Established!');
} catch(error){
        console.log('MongoDB Connection Failed!' + error);
        process.exit(1);
    }
}

module.exports = connectDB;