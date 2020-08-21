var mongoose = require('mongoose');

// Define authorization codes schema
var CodeSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    redirectUri: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    }
});

// Export the Mongoose model
module.exports = Code = mongoose.model('Code', CodeSchema);