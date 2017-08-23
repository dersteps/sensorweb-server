var express = require('express');
var router = express.Router();
var authenticationMiddleware = require('../middlewares/authenticationMiddleware');
var controller = require('../controllers/dataController');

var dataPath = "/data";

router.route(dataPath)
    .get(controller.listData)
    .post(authenticationMiddleware.checkAuthentication, function(req, res, next) { res.send("POST request succeeded"); });

router.route(dataPath + "/:sensorID")
    .get(function(req, res, next) { res.send("Getting sensor data for sensor " + req.params.sensorID); })
    .post(authenticationMiddleware.checkAuthentication, function(req, res, next) {
        console.log(req.body);
        res.send("POSTING sensor data for sensor " + req.params.sensorID);
    });

module.exports = router;
