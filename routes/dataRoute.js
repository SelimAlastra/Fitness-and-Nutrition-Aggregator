const express = require("express");
const router = express.Router();
const Data = require("../models/dataModel");

router.route("").post((req, res) => {
    const email = req.body.email;
    const username = req.body.username; 
    const password =  req.body.password; 
    const retypePassword =  req.body.retypePassword;
    const phoneNumber = req.body.phoneNumber;

    const newData = new Data({
        email,
        username,
        password,
        retypePassword, 
        phoneNumber
    })

    newData.save();
})

    router.route("/api").get((req, res) => {
        Data.find()
        .then(foundData => res.json(foundData))
    })

module.exports = router;