const express = require("express")
const mongoose = require("mongoose")
const app = express()

app.listen(3001, () => {
    console.log("server is running")
})