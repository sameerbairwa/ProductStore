const express = require("express");
const router = express.Router();

const auth = require("../strategies/passportStrategies");
var Product = require("../models/product");
var Client = require('../models/client');
var User = require('../models/user');

const oauth2 = require("./oauth2");

router.get('/', (req, res) => {
    res.send("Hey there Big stack");
});

// Create endpoint handlers for /products
router.post('/api/products', auth.isAuthenticated, function (req, res) {
    // Create a new instance of the product model
    var product = new Product();

    // Set the product properties that came from the POST data
    product.name = req.body.name;
    product.type = req.body.type;
    product.quantity = req.body.quantity;
    product.userId = req.user._id;

    // Save the product and check for errors
    product.save(function (err) {
        if (err) return res.send(err);

        res.json({
            message: "product added to the locker!",
            data: product,
        });
    });
});
router.get('/api/products', auth.isAuthenticated, function (req, res) {
    // Use the product model to find all product
    Product.find({},
        function (err, products) {
            if (err) return res.send(err);

            res.json(products);
        }
    );
});

// Create endpoint handlers for /products/:product_id
router.get('/api/products/:product_id', function (req, res) {
    // Use the product model to find a specific product
    Product.findOne({
            _id: req.params.product_id
        },
        function (err, product) {
            if (err) return res.send(err);
            res.json(product);
        }
    );
});

router.put('/api/products/:product_id', auth.isAuthenticated, function (req, res) {
    // Use the product model to update a specific product
    Product.updateOne({
            _id: req.params.product_id
        }, {
            quantity: req.body.quantity,
        },
        function (err, product) {
            if (err) return res.send(err);
            res.json({
                message: "Updated",
                data: product
            });
        }
    );
})
router.delete('/api/products/:product_id', auth.isAuthenticated, function (req, res) {
    // Use the product model to find a specific product and remove it
    product.deleteOne({
            _id: req.params.product_id,
        },
        function (err) {
            if (err) return res.send(err);

            res.json({
                message: "product removed from the locker!",
            });
        }
    );
});

// Create endpoint handlers for /users
router.post("/api/users", function (req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err) {
        if (err)
            return res.send(err);

        res.json({
            message: 'New user added to the locker room!',
            data: user
        });
    });
});

router.get("/api/users", auth.isAuthenticated, function (req, res) {
    User.findOne(function (err, users) {
        if (err)
            return res.send(err);

        res.json(users);
    });
});


// Create endpoint handlers for /clients
router.post('/api/clients', auth.isAuthenticated, function (req, res) {
    // Create a new instance of the Client model
    var client = new Client();

    // Set the client properties that came from the POST data
    client.name = req.body.name;
    client.id = req.body.id;
    client.secret = req.body.secret;
    client.userId = req.user._id;

    // Save the client and check for errors
    client.save(function (err) {
        if (err)
            return res.send(err);
        res.json({
            message: 'Client added to the BigStack!',
            data: client
        });
    });
});
router.get('/api/clients', auth.isAuthenticated, function (req, res) {
    // Use the Client model to find all clients
    Client.find({
        userId: req.user._id
    }, function (err, clients) {
        if (err)
            return res.send(err);

        res.json(clients);
    });
});

module.exports = router;