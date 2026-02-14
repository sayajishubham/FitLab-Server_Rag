const express = require('express');
const router = express.Router();
const workoutController = require('../Controller/Workout.controller');
const getCurrentUser = require('../middleware/auth.middleware');


router.get('/', getCurrentUser, workoutController.WorkoutPlan);
router.get('/new', getCurrentUser, workoutController.getNewWorkoutPlan);

module.exports = router;

