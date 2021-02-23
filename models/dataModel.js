const mongoose = require("mongoose");

const dataSchema = {
    email: String,
    username: String, 
    password: String, 
    retypePassword: String, 
    phoneNumber: String
}

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;