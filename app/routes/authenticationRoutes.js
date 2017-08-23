var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var controller = require('../controllers/authenticationController');

var path = "/authenticate";

/*router.route(path)
    .post(function(req, res) {
        User.findOne({ name: req.body.name }, function(err, user) {

            if(err) { res.send(err); }

            if(!user || user.password != req.body.password) {
                res.json({ success: false, message: "Authentication failed "});
            } else {
                // Sign token for user
                var token = jwt.sign(user, config.secret, { expiresIn: config.token_ttl });

                res.json({
                    success: true,
                    message: "Authenticated",
                    token: token
                });
            }
        });
    });
*/

router.route(path)
    .post(controller.authenticate);

module.exports = router;
