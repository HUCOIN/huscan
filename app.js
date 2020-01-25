const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Contract = require("./contract-model.js");
const bodyParser = require('body-parser');
require('dotenv/config');

app.get("/", (req, res) => {
    res.send("working lol");
});

app.use(bodyParser.urlencoded())

app.post("/contracts/new", (req ,res) => {
    console.log(req.body);
    const contract = new Contract({
        address: req.body.address,
        abi: req.body.abi
    });
    contract.save().then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({messaage: err});
    });
});

app.get("/contracts/:contractAddress", async (req, res) => {
    console.log("arriving get request with address " + req.params.contractAddress);
    Contract.findOne({address: req.params.contractAddress}, (err, contract) => {
        if (err) {
            console.log(err);
            res.json(err);
        }
        else {
            console.log("succesful get");
            res.send(contract.abi);
            
        }
            
    });
});

mongoose.connect(process.env.DB_CONNECTION,
 (err) => console.log(err));


app.listen(3001);
