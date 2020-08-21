var mongoose = require('mongoose');

// Define our product schema
var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: String,
    quantity: Number,
    userId: String
});

// Export the Mongoose model
module.exports = mongoose.model('product', productSchema);