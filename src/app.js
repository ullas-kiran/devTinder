require("dotenv").config();
const express=require('express');
const app=express();
const connectDb=require('./config/database');
const { User } = require("./models/user");



app.use(express.json());

app.post('/signup',async(req,res)=>{
    const {firstName,lastName,emailId,password,age,gender}=req.body;
    const user=await User.create({
        firstName,
        lastName,
        emailId,
        password,
        age,
        gender
    })
    res.status(201).json({
        success:true,
        user
    })
})

app.get('/user', async (req, res) => {
  try {
    const { emailId } = req.query;

    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
     if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Email already exists'
    });
  }

  res.status(500).json({
    success: false,
    message: 'Server error'
  });
  }
});

app.get('/feed', async (req, res) => {
  try {
    const { emailId } = req.query;

    const user = await User.find({});

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
  res.status(500).json({
    success: false,
    message: 'Server error'
  });
  }
});

app.delete('/user', async (req, res) => {
  try{
    const {userId } = req.query;

    const user = await User.findOneAndDelete({userId});

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  }catch(error){
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

connectDb().then(()=>{
console.log("db connected success")
app.listen(3000,()=>(console.log("app running port 3000")))    
}).catch((err)=>{
console.log(err)    
console.log("something went wrong")
})
             