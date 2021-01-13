const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const req = require('request');

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/test', { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);
    closure(client.db());
    });
};

console.log(req);

const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://dev-4zf9twtm.us.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    //audience: 'https://deanparrish.net/',
    //issuer: `https://deanparrish.net/`,
    audience: 'V6A3GkWiQ22fSPH4vRWxMn8Z4wHBOMbW',
    issuer: 'https://dev-4zf9twtm.us.auth0.com/',
    algorithms: ['RS256']
  });

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
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true});

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
router.get('/users', checkJwt, (req, res) => {
    connection((db) => {
        User.find({}).sort("firstName")
            .then(users => {
                response.data = users;
                res.json(response);
            })
            .catch(err => sendError(err, res));
    });
});

router.post('/insertuser', checkJwt, (req, res) => {
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
            });
    });
});

router.put("/updatecustomer/:id", checkJwt, (req, res) => {
    connection((db) => {
        User.updateOne({_id: req.params.id}, req.body,{upsert: true})
            .then(item => {
                response.data = item;
                res.json(response);
            })
            .catch(err => {
                console.log("not saved")
                sendError(err, res);
            });
        res.data = "in update";
    });
         
    
});

router.post("/deletecustomer/:id", checkJwt, (req, res) => {
    connection((db) => {
        console.log(req.body);
        User.deleteOne({_id: req.params.id})
            .then(item => {
                response.data = item;
                res.json(response);
            })
            .catch(err => {
                console.log("not deleted")
                sendError(err, res);
            });
        res.data = "in delete";
    });
         
    
});
//BEGIN RECIPE


var recipeSchema = new mongoose.Schema({
    name: String,
    category: String,
    ingredients: Array,
    steps: Array,
    link: String,
    userID: String
});

var Recipe = mongoose.model("recipes", recipeSchema);

// Get recipes
router.get('/recipes', (req, res) => {
    connection((db) => {
        db.collection('recipes')
            .find()
            .toArray()
            .then((recipes) => {
                response.data = recipes;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/insertrecipe', checkJwt, (req, res) => {
    connection((db) => {
        var data = new Recipe(req.body);
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
            });
    });
});

router.put("/updaterecipe/:id", checkJwt, (req, res) => {
    connection((db) => {
        Recipe.updateOne({_id: req.params.id}, req.body,{upsert: true})
            .then(item => {
                response.data = item;
                res.json(response);
            })
            .catch(err => {
                console.log("not saved")
                sendError(err, res);
            });
        res.data = "in update";
    });
         
    
});

//begin users

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    steps: Array,
    link: String,
    user: String
});

var Recipe = mongoose.model("recipes", recipeSchema);


module.exports = router;