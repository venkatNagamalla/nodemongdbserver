const dotenv = require("dotenv")
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/users");

const app = express();

mongoose.connect(process.env.MONGODB_CONNECT_URL)

app.use(express.json());


app.get("/users", (req,res) => {
   
    userModel.find({}).then((users) => {
        res.json(users);
    }).catch((err) => {
        res.json(err)
    })
    
})

app.post("/create-user", async (req,res) => {
     const user = req.body;
     const newUser = new userModel(user);
     await newUser.save();
     res.json(user);
})



app.listen(process.env.PORT,() => {
    console.log("App started at 3000")
});