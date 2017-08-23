var mongoose = require('mongoose');
var User = mongoose.model('User');
var Data = mongoose.model('Data');

var listData = function(req, res) {
    Data.find({}, function(err, data) {
        if(err) { res.send(err); }
        res.json(data);
    });
};

var addDataSet = function(req, res) {

};

module.exports = { listData };

/*
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Data = mongoose.model('Data');

exports.listUsers = function(req, res) {
    User.find({}, function(err, users) {
        if(err) {
            res.send(err);
        }
        res.json(users);
    });
};

exports.createUser = function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, user) {
        if(err) {
            res.send(err);
        }
        console.log("Created user " + user);
        res.json(user);
    });
};

exports.getUser = function(req, res) {
    User.findById(req.params.userID, function(err, user) {
        if(err) {
            res.send(err);
        }
        res.json(user);
    });
};

exports.updateUser = function(req, res) {
    console.log("Updating user [id: " + req.params.userID + "]");
    User.findOneAndUpdate({_id: req.params.userID}, req.body, {new: true}, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
};

exports.deleteUser = function(req, res) {
    User.remove({ _id: req.params.userID }, function(err, user) {

        console.log("Removing user " + user);
        if (err) {
            res.send(err);
        }

        res.json({ message: "User deleted" });
  });
};
*/
