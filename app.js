
const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/users");

const app = express();

mongoose.connect("mongodb://localhost:27017/sampleDb")

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



app.listen(3000,() => {
    console.log("App started at 3000")
});