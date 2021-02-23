const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://biancaopariuc:biancaopariuc2021@cluster0.dokic.mongodb.net/ClientSignup")

app.use("", require("./routes/dataRoute"));

app.listen(3001, function() {
    console.log("express server is running on port 3001");
})