var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Create and export model
module.exports = mongoose.model("Data", new Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateCreated: Date,
    humidity: Number,
    temperature: Number
}));
