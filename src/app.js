require("dotenv").config();
const express=require('express');
const app=express();
const connectDb=require('./config/database')

connectDb().then(()=>{
console.log("db connected success")
app.listen(3000,()=>(console.log("app running port 3000")))    
}).catch((err)=>{
console.log("something went wrong")
})
             