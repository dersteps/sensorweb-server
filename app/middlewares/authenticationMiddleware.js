var jwt = require('jsonwebtoken');
var config = require('../../config');

function checkAuthentication(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token) {
        jwt.verify(token, config.secret, function(err, decodedToken) {
            if(err) {
                console.log(err);
                return res.json({ success: false, message: "Invalid token provided"});
            }
            req.token = decodedToken;
            next();
        });
    } else {
        return res.status(403).send({ success: false, message: 'Authentication required.' });
    }
};

function __isAdmin(decodedToken) {
    if(decodedToken) {
        if(decodedToken.permissions) {
            return decodedToken.permissions.admin;
        }
    }
    return false;
}

function __isSensorAdmin(decodedToken) {
    if(decodedToken) {
        if(decodedToken.permissions) {
            return decodedToken.permissions.sensor_admin;
        }
    }
    return false;
}

function checkAdmin(req, res, next) {
    var token = req.token;
    if(token) {
        if(__isAdmin(token)) {
            next();
        } else {
            return res.status(403).send({ success: false, message: 'Insufficient permissions' });
        }
    } else {
        return res.status(403).send({ success: false, message: 'Authentication required (no token).' });
    }
}

function checkSensorAdmin(req, res, next) {
    var token = req.token;
    if(token) {
        if(__isSensorAdmin(token)) {
            next();
        } else {
            return res.status(403).send({ success: false, message: 'Insufficient permissions' });
        }
    } else {
        return res.status(403).send({ success: false, message: 'Authentication required (no token).' });
    }
}

module.exports = {
    checkAuthentication : checkAuthentication,
    checkAdmin: checkAdmin,
    checkSensorAdmin: checkSensorAdmin
};
