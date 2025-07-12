const express=require('express');
const app=express();



app.get("/user",(req,res)=>{
    res.send({firstName:'ullas',lastName:'kiran'})
})

app.post("/user",async(req,res)=>{
    res.send("successfully post")
})

app.delete("/user",(req,res)=>{
    res.send("successfully deleted")
})

app.listen(3000,()=>(console.log("app running port 3000")))