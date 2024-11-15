const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


main().then(()=>{
    console.log("connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
}

const allChats = [
    {
        from:"neha",
        to:"amit",
        msg:"hi there",
        created_at: new Date()
    },
    {
        from:"amit",
        to:"neha",
        msg:"hello how do you do?",
        created_at: new Date()
    },
    {
        from:"ramesh",
        to:"bawani",
        msg:"jae hind!",
        created_at: new Date()
    },
    {
        from:"doshant",
        to:"ramesh",
        msg:"hello sir fyp ka kya scene hai",
        created_at: new Date()
    },
    {
        from:"bawani",
        to:"ramesh",
        msg:"ok sir i will be there!",
        created_at: new Date()
    }
]

Chat.insertMany(allChats);
