const { generatePlan } = require('../services/ragChain');



const workoutController = {
  WorkoutPlan: async (req, res) => {
    try {
      const user = req.user;
      if (user.workoutPlan) {
        return res.status(200).json({
          success: true,
          workout: user.workoutPlan,
          cached: true,
        });
      }

      const Workout = await generatePlan(user, "workout");
      let Plan;
      try {
        const cleaned = Workout
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        Plan = JSON.parse(cleaned);

      } catch (error) {
        return res.status(500).json({
          error: "Model returned invalid JSON",
        });
      }
      user.workoutPlan = Plan;
      await user.save();

      return res.status(200).json({
        success: true,
        workout: Plan,
      });

    } catch (error) {
      console.error('Error generating workout plan:', error);
      res.status(500).json({
        error: 'Failed to generate workout plan',
        message: error.message
      });
    }
  }
  ,
  getNewWorkoutPlan: async (req, res) => {
    try {
      const user = req.user;
      if (user.workoutPlan) {
        user.workoutPlan = null
        await user.save()
      }
      res.send("done")
    } catch (error) {
      console.error('Error generating workout plan:', error);
      res.status(500).json({
        error: 'Failed to generate workout plan',
        message: error.message
      });
    }
  }
};

module.exports = workoutController;

