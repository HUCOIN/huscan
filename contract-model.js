var mongoose = require('mongoose');
var Schema = mongoose.Schema

var Contract = new Schema({
    address: String,
    abi: JSON,
});

module.exports = mongoose.model('Contract', Contract);