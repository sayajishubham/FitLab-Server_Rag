const express = require('express');
const router = express.Router();
const dietController = require('../Controller/Diet.controller');
const getCurrentUser = require('../middleware/auth.middleware');

router.get('/', getCurrentUser, dietController.dietPlan);

module.exports = router;

