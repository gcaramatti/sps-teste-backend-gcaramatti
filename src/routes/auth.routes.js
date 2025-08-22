const express = require('express');
const router = express.Router();
const authController = require('../modules/auth/auth.controller');


router.post('/login', authController.login);
router.get('/user', authController.getAuthUser);


module.exports = router;