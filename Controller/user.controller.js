const User = require('../models/user.model');

const userController = {
    signup: async (req, res) => {
        const { email, username, password, gender, age, weight, fitnessGoal, foodPreference, fitnessLevel, workoutLocation, height, activityLevel, injuries, budgetLevel, mealsPerDay, trainingDays, workoutType } = req.body;
        if (!email || !username || !password || !gender || !age || !weight || !fitnessGoal || !foodPreference || !fitnessLevel || !workoutLocation || !height || !activityLevel || !budgetLevel || !mealsPerDay || !trainingDays || !workoutType) {
            return res.status(400).json({ message: "Please fill all the fields " });
        }
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({ email, username, password, gender, age, weight, fitnessGoal, foodPreference, fitnessLevel, workoutLocation, height, activityLevel, injuries, budgetLevel, mealsPerDay, trainingDays, workoutType });

        res.status(201).json({ message: "User created successfully", user });
    },
    SignIn: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email " });
        }

        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid  password" });
        }

        // Set cookie with user ID
        console.log(1)
        res.cookie('userId', user._id.toString(), {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        console.log(2)
        res.status(200).json({ message: "User logged in successfully", user });
    },
    logout: async (req, res) => {
        // Clear the cookie
        res.clearCookie('userId');
        res.status(200).json({ message: "User logged out successfully" });
    },
    getProfile: async (req, res) => {
        try {
            // Get user from cookie
            const userId = req.cookies && req.cookies.userId;

            if (!userId) {
                return res.status(401).json({ message: "Please sign in first" });
            }

            const user = await User.findById(userId).select('-password'); // Exclude password

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error('Error getting profile:', error);
            res.status(500).json({
                error: 'Failed to get profile',
                message: error.message
            });
        }
    },
    updateProfile: async (req, res) => {
        try {
            // Get user from cookie
            const userId = req.cookies && req.cookies.userId;

            if (!userId) {
                return res.status(401).json({ message: "Please sign in first" });
            }

            const { weight, foodPreference, age, gender, fitnessGoal, fitnessLevel, workoutLocation } = req.body;

            // Build update object with only provided fields
            const updateData = {};
            if (weight !== undefined) updateData.weight = weight;
            if (foodPreference !== undefined) updateData.foodPreference = foodPreference;
            if (age !== undefined) updateData.age = age;
            if (gender !== undefined) updateData.gender = gender;
            if (fitnessGoal !== undefined) updateData.fitnessGoal = fitnessGoal;
            if (fitnessLevel !== undefined) updateData.fitnessLevel = fitnessLevel;
            if (workoutLocation !== undefined) updateData.workoutLocation = workoutLocation;

            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({ message: "No fields to update" });
            }

            const user = await User.findByIdAndUpdate(
                userId,
                { $set: updateData },
                { new: true, runValidators: true }
            );

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({
                message: "Profile updated successfully",
                user: {
                    _id: user._id,
                    email: user.email,
                    username: user.username,
                    age: user.age,
                    gender: user.gender,
                    weight: user.weight,
                    fitnessGoal: user.fitnessGoal,
                    foodPreference: user.foodPreference,
                    fitnessLevel: user.fitnessLevel,
                    workoutLocation: user.workoutLocation
                }
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({
                error: 'Failed to update profile',
                message: error.message
            });
        }
    },
};

module.exports = userController;
