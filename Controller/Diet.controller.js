const { generatePlan } = require("../services/ragChain");

const dietController = {
  dietPlan: async (req, res) => {
    try {
      const user = req.user;
      console.log(user)
      if (user.dietPlan) {
        return res.status(200).json({
          success: true,
          dietPlan: user.dietPlan,
          cached: true,
        });
      }

      const rawdietPlan = await generatePlan(user, "diet");
      let dietPlan;
      try {
        const cleaned = rawdietPlan
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        dietPlan = JSON.parse(cleaned);
        console.log(dietPlan)

      } catch (error) {
        return res.status(500).json({
          error: "Model returned invalid JSON",
        });
      }
      user.dietPlan = dietPlan;
      await user.save();

      return res.status(200).json({
        success: true,
        dietPlan,
      });

    } catch (error) {
      res.status(500).json({
        error: 'Failed to generate diet plan',
        message: error.message
      });
    }
  }
};

module.exports = dietController;
