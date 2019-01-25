const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/test', { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);
    closure(client.db());
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};


var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/test");

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber1: String,
    phoneNumber2: String,
    phoneNumber3: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    comments: String
   });

var User = mongoose.model("customerInfo", userSchema);

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('customerinfos')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/insertuser', (req, res) => {
    connection((db) => {
        var data = new User(req.body);
        console.log("inside api req.body: " + data)
        data.save()
        .then(item => {
            console.log("item saved to database");
            response.data = item;
            res.json(response)
            })
            .catch(err => {
                console.log("not saved")
                sendError(err, res);
            //res.status(400).send("unable to save to database");
            });
    });
});

router.put("/updatecustomer/:id", (req, res) => {
    connection((db) => {
        console.log(req.body);
        //console.log(req)
        // User.findByIdAndUpdate(req.params.id, req.body)
        // .then(item => {
        //     response.data = item;
        //     res.json(response);
        // })
        // .catch(err => {
        //     console.log("not saved")
        //     sendError(err, res);
        // //res.status(400).send("unable to save to database");
        // });
        User.update({_id: req.params.id}, req.body,{upsert: true})
            .then(item => {
                response.data = item;
                res.json(response);
            })
            .catch(err => {
                console.log("not saved")
                sendError(err, res);
            //res.status(400).send("unable to save to database");
            });
        res.data = "in update";
    });
         
    
});

module.exports = router;