const mongoose=require('mongoose');


const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim: true,
        minlength:2,
        maxlength:30
    },
    lastName:{
        type:String,
        trim: true,
        maxlength:30
    },
    emailId:{
        type:String,
        lowercase:true,
        trim:true,
        required:true,
        unique:true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:100
    },
    age:{
        type:Number,
        min:18,
        max:100
    },
    gender:{
        type:String,
        enum: ["male", "female", "other"],
    },
    photoUrl:{
        type:String,
        default:"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
    },
    about:{
        type:String,
        trim:true,
        maxlength:500
    },
    skills:{
        type:[String],
        validate: {
        validator: function (skills) {
          return skills.length <= 20;
        },
        message: "Maximum 20 skills are allowed",
      },
    },
}, {
    timestamps: true,
  })

exports.User=mongoose.model('User',userSchema)