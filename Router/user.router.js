const express = require('express');
const router = express.Router();
const userController = require('../Controller/user.controller');

router.post('/signup', userController.signup);

router.post('/signin', userController.SignIn);

router.post('/logout', userController.logout);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);


module.exports = router;
