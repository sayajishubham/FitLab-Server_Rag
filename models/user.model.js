const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    gender: { type: String },
    age: { type: Number },
    weight: { type: Number },
    fitnessGoal: { type: String },
    foodPreference: { type: String },
    fitnessLevel: { type: String },
    workoutLocation: { type: String },
    dietPlan: {
        type: Object,
        default: null
    },
    workoutPlan: {
        type: Object,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
