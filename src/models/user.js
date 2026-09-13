const mongoose=require('mongoose');


const userSchema=mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },

})

exports.User=mongoose.model('User',userSchema)