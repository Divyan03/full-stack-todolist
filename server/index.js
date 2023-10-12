const express = require("express"); //import express
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const Obj = require("./models/objectives");
require('dotenv').config();
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors());
//middleware to parse JSON data from incoming requests
app.use(express.json());

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//req gets info from frontend, res sends info from backend to frontend
app.get("/getObj", async (req, res) => {
    const obj = await Obj.find();
    res.json(obj);
})

app.post("/obj/new", (req, res) => {
    const newObj = new Obj({
        text: req.body.text
    });
    newObj.save();
    res.json(newObj);
});

app.delete("/obj/delete/:id", async (req, res) => {
    const delObj = await Obj.findByIdAndDelete(req.params.id);
    res.json(delObj);
})

app.listen(3001, () => {
    console.log("server is running")
})