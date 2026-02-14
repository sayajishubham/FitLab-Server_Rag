// services/calorieEngine.js

function calculateBMR({ age, gender, weight, height }) {
    if (!height) height = 170; // fallback default

    const bmr =
        10 * weight +
        6.25 * height -
        5 * age +
        (gender === "Male" ? 5 : -161);

    return Math.round(bmr);
}

function calculateTDEE(bmr, activityLevel = "moderate") {
    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9,
    };

    const multiplier = activityMultipliers[activityLevel] || 1.55;

    return Math.round(bmr * multiplier);
}

function adjustCaloriesByGoal(tdee, goal) {
    let adjustedCalories = tdee;

    if (goal === "Fat Loss") adjustedCalories -= 400;
    if (goal === "Muscle Gain") adjustedCalories += 300;
    if (goal === "Maintenance") adjustedCalories = tdee;

    return Math.round(adjustedCalories);
}

function calculateProtein(weight, goal) {
    // higher protein for fat loss
    if (goal === "Fat Loss") {
        return Math.round(weight * 2.2);
    }

    if (goal === "Muscle Gain") {
        return Math.round(weight * 2);
    }

    return Math.round(weight * 1.8);
}

function calculateMacros({ calories, protein }) {
    const proteinCalories = protein * 4;

    // 25% fats by default
    const fatCalories = calories * 0.25;
    const fat = Math.round(fatCalories / 9);

    const remainingCalories = calories - proteinCalories - fatCalories;
    const carbs = Math.round(remainingCalories / 4);

    return {
        protein,
        carbs,
        fat,
    };
}

function generateMacroPlan(user) {
    const bmr = calculateBMR(user);
    const tdee = calculateTDEE(bmr, user.activityLevel || "moderate");
    const calories = adjustCaloriesByGoal(tdee, user.fitnessGoal);
    const protein = calculateProtein(user.weight, user.fitnessGoal);
    const macros = calculateMacros({ calories, protein });

    return {
        bmr,
        tdee,
        calories,
        protein: macros.protein,
        carbs: macros.carbs,
        fat: macros.fat,
    };
}

module.exports = {
    generateMacroPlan,
};
