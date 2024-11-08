const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

main().then(()=>{
    console.log("connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
}

const chat1 = Chat({
    from:"abc",
    to:"def",
    msg:"hi there",
    created_at: new Date()
})

chat1.save().then(res=>{
    console.log(res
        
    );
}).catch((err)=>{
    console.log(err);
})

app.get("/",(req,res)=>{
    res.send("root page");
})

app.listen(8080,()=>{
    console.log("listening");
})
