var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Create and export model
module.exports = mongoose.model("User", new Schema({

    name: String,
    password: String,
    //admin: Boolean
    permissions: {
        admin: Boolean,
        sensor_admin: Boolean
    }

}));
