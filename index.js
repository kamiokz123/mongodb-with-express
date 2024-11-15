const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
var methodOverride = require('method-override')

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(methodOverride('_method'));

// Middleware to parse URL-encoded data in the request body
app.use(express.urlencoded({ extended: true }));

main().then(()=>{
    console.log("connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
}

app.get("/chats",async(req,res)=>{
   const chats = await Chat.find();
   res.render("chats.ejs",{chats});
})

app.get("/chats/new",(req,res)=>{
    res.render("newChat.ejs");
});

app.post("/chats/new",(req,res)=>{
    const {from,msg,to} = req.body;
    const chat1 = Chat({
        from,
        msg,
        to,
        created_at:new Date()
    });
    chat1.save().then(result=>{
        console.log(result);
    }).catch(err=>{
        console.log(err);
    })
   res.redirect("/chats")
});

app.get("/chats/:id/edit",async (req,res)=>{
    const {id} = req.params;
    const chat = await Chat.findById(id);
    res.render("edit.ejs",{chat})
});

app.put("/chats/:id/edit",async(req,res)=>{
    const {id} = req.params;
    const {msg: newMsg} = req.body;
    console.log(newMsg);
    const updatedChat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{
        runValidators:true,
        new:true
    })
    console.log(updatedChat);
    res.redirect("/chats");
});

app.delete("/chats/:id/delete",async(req,res)=>{
    const {id} = req.params;
    const deletedChat = await Chat.findByIdAndDelete(id);
    console.log(id);
    res.redirect("/chats")
})

app.get("/",(req,res)=>{
    res.send("root page");
})

app.listen(8080,()=>{
    console.log("listening");
})
