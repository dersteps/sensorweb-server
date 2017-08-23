var authenticationMiddleware = require("../middlewares/authenticationMiddleware");
var controller = require("../controllers/userController");
var express = require('express');
var config = require('../../config');
var router = express.Router();

var path = "/users";

// All user routes require authentication as admin
router.use(path, authenticationMiddleware.checkAuthentication);
router.use(path, authenticationMiddleware.checkAdmin);

router.route(path)
    .get(controller.listUsers)
    .post(controller.createUser);

router.route(path + "/:userID")
    .get(controller.getUser)
    .put(controller.updateUser)
    .delete(controller.deleteUser)

module.exports = router;
