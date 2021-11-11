const express = require('express');
const router = express.Router();
const UserController = require('../app/api/controllers/user');

router.post('/register', UserController.create);
router.post('/login', UserController.login);
router.post('/check', UserController.checkToken);
router.post("/changePassword", UserController.changePassword);
router.post("/confirmInvite", UserController.confirmInvite);
router.post("/verifyEmail", UserController.verifyEmail);
module.exports = router;