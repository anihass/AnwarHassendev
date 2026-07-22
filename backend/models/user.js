const mongoose = require('mongoose');

const userScama = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    email:{
        type : String,
        required:true,
        unique : true,
        trim : true,
        lowercasev: true
    },
    password : {
        type : String,
        required : true
    },
    role:{
        type:String,
        enum : ['user','admin'],
        default : 'user'
    }
});

module.exports = mongoose.model('Users',userScama);