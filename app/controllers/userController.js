var mongoose = require('mongoose');
var User = mongoose.model('User');

var listUsers = function(req, res) {
    User.find({}, function(err, users) {
        if(err) { res.send(err); }
        res.json(users);
    });
};

var createUser = function(req, res) {
    //var newUser = new User(req.body);
    var newUser = new User();
    newUser.name = req.body.name;
    newUser.password = req.body.password;
    newUser.permissions = {
        admin: req.body.admin,
        sensor_admin: req.body.sensor_admin
    };

    newUser.save(function(err, user) {
        if(err) { res.send(err); }
        console.log("Created user " + user);
        res.json(user);
    });
};

var getUser = function(req, res) {
    User.findById(req.params.userID, function(err, user) {
        if(err) {res.send(err); }
        res.json(user);
    });
};

var updateUser = function(req, res) {
    var newData = {
            name: req.body.name,
            permissions: {
                admin: req.body.admin,
                sensor_admin: req.body.sensor_admin
            }
    };
    User.findOneAndUpdate({_id: req.params.userID}, newData, {new: true}, function(err, user) {
        if (err) { res.send(err); }
        res.json(user);
    });
};

var deleteUser = function(req, res) {
    User.remove({ _id: req.params.userID }, function(err, user) {
        console.log("Removing user " + user);
        if (err) { res.send(err); }
        res.json({ message: "User deleted" });
  });
};

module.exports = {
    listUsers, createUser, getUser, updateUser, deleteUser
};
