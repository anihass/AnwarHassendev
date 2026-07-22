const mongoose = require('mongoose');
require('dotenv').config({ path: "./backend/.env" });

const connectToDb = async()=>{
    try{
        mongoose.connect(process.env.MONGO_DB_URL);
        console.log('mongoo db connected succesfully');
    }catch(e){
        console.log('failed to connect',e);

    }
};
module.exports =  connectToDb;