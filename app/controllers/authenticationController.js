var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var config = require('../../config');

var authenticate = function(req, res) {
    User.findOne({ name: req.body.name }, function(err, user) {

        if(err) { res.send(err); }

        if(!user || user.password != req.body.password) {
            res.json({ success: false, message: "Authentication failed "});
        } else {
            // Sign token for user
            var data = { permissions: user.permissions, name: user.name };
            var token = jwt.sign(data, config.secret, { expiresIn: config.token_ttl });

            res.json({
                success: true,
                message: "Authenticated",
                token: token
            });
        }
    });
};

module.exports = { authenticate : authenticate };
