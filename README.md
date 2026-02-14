# AI-Based Diet Planner

A complete full-stack application that uses Google Gemini AI to generate personalized diet plans based on user inputs (age, gender, weight, goal, and food preferences).

## 🚀 Features

- **AI-Powered Diet Planning**: Uses Google Gemini API to generate personalized 7-day diet plans
- **User-Friendly Interface**: Beautiful React frontend with intuitive form
- **Secure Backend**: Node.js/Express backend with proper error handling
- **Real-time Generation**: Fast diet plan generation with loading states

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (running locally or connection string)
- Google Gemini API Key

## 🔑 Step 1: Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key (you'll need this in Step 2)

## ⚙️ Step 2: Set Up Backend

1. **Navigate to the project root directory:**
   ```bash
   cd "Pokemon be"
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Set the Gemini API Key as an environment variable:**
   
   **Windows (PowerShell):**
   ```powershell
   $env:GEMINI_API_KEY="your_actual_api_key_here"
   ```
   
   **Windows (Command Prompt):**
   ```cmd
   set GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   **Linux/Mac:**
   ```bash
   export GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   **Or set it when running the server:**
   ```bash
   # Windows PowerShell
   $env:GEMINI_API_KEY="your_key"; npm run server
   
   # Windows CMD
   set GEMINI_API_KEY=your_key && npm run server
   
   # Linux/Mac
   GEMINI_API_KEY=your_key npm run server
   ```

4. **Replace `your_actual_api_key_here` with your Gemini API key from Step 1**

5. **Make sure MongoDB is running:**
   - If using local MongoDB: Ensure MongoDB service is running
   - Default connection: `mongodb://127.0.0.1:27017/testbase`

6. **Start the backend server:**
   ```bash
   npm run server
   ```
   
   The server will start on `http://localhost:8080`

## 🎨 Step 3: Set Up Frontend

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   
   The frontend will start on `http://localhost:3000` and automatically open in your browser.

## 🏃 Step 4: Run the Project Locally

### Terminal 1 - Backend:
```bash
cd "Pokemon be"
# Set API key first (Windows PowerShell):
$env:GEMINI_API_KEY="your_api_key_here"
npm run server

# Or set it inline (Windows PowerShell):
$env:GEMINI_API_KEY="your_api_key_here"; npm run server

# Linux/Mac:
GEMINI_API_KEY=your_api_key_here npm run server
```

### Terminal 2 - Frontend:
```bash
cd "Pokemon be/frontend"
npm start
```

### Access the Application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

## 📝 How to Use

1. Open http://localhost:3000 in your browser
2. Fill in the form with your details:
   - **Age**: Your current age
   - **Gender**: Select from dropdown (Male/Female/Other)
   - **Weight**: Your weight in kilograms
   - **Fitness Goal**: Choose your goal (Weight Loss, Weight Gain, Muscle Building, etc.)
   - **Food Preference**: Select your dietary preference (Vegetarian, Vegan, Non-Vegetarian, etc.)
3. Click "Generate Diet Plan"
4. Wait for the AI to generate your personalized 7-day diet plan
5. View your customized diet plan below the form

## 🎯 API Endpoint

### POST `/api/diet`

Generate a personalized diet plan using Gemini AI.

**Request Body:**
```json
{
  "age": 30,
  "gender": "male",
  "weight": 75,
  "goal": "weight loss",
  "foodPreference": "vegetarian"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "dietPlan": "Your personalized 7-day diet plan...",
  "userInput": {
    "age": 30,
    "gender": "male",
    "weight": 75,
    "goal": "weight loss",
    "foodPreference": "vegetarian"
  }
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message here"
}
```

## 📊 Sample Output

Here's what a generated diet plan looks like:

```
**Diet Plan Overview:**
This 7-day diet plan is designed for a 30-year-old male weighing 75kg, focusing on weight loss through a vegetarian diet. The plan provides approximately 1800-2000 calories per day, emphasizing whole foods, lean proteins, and nutrient-dense vegetables.

**Day 1:**
- Breakfast: Oatmeal with berries and almond milk (350 calories)
- Snack: Apple with almond butter (150 calories)
- Lunch: Quinoa salad with chickpeas and vegetables (450 calories)
- Snack: Greek yogurt with honey (120 calories)
- Dinner: Grilled tofu with roasted vegetables (480 calories)

**Day 2:**
- Breakfast: Whole grain toast with avocado and eggs (380 calories)
...
```

## 🛠️ Project Structure

```
Pokemon be/
├── config/
│   └── db.js                 # MongoDB connection
├── Controller/
│   ├── Diet.controller.js    # Diet plan generation logic
│   └── user.controller.js    # User authentication
├── models/
│   └── user.model.js         # User schema
├── Router/
│   ├── diet.router.js        # Diet API routes
│   └── user.router.js        # User API routes
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Styling
│   │   ├── index.js          # React entry point
│   │   └── index.css         # Global styles
│   └── package.json
├── index.js                   # Express server
├── package.json               # Backend dependencies
└── README.md                  # This file
```

## 🔒 Security Notes

- Keep your Gemini API key secure
- Never commit API keys to version control
- Set environment variables in your system or use them inline when running commands

## 🐛 Troubleshooting

### Backend Issues:
- **"GEMINI_API_KEY is not defined"**: Make sure you set the GEMINI_API_KEY environment variable before running the server
- **MongoDB connection error**: Ensure MongoDB is running locally
- **Port 8080 already in use**: Change the port in `index.js` or stop the process using port 8080

### Frontend Issues:
- **Cannot connect to backend**: Ensure backend is running on port 8080
- **CORS errors**: Backend already has CORS enabled, but check if both servers are running
- **npm install fails**: Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

## 📦 Dependencies

### Backend:
- `express`: Web framework
- `@google/generative-ai`: Google Gemini AI SDK
- `mongoose`: MongoDB ODM
- `cors`: Cross-origin resource sharing

### Frontend:
- `react`: UI library
- `react-dom`: React DOM rendering
- `react-scripts`: Create React App scripts

## 📄 License

ISC

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Happy Diet Planning! 🥗💪**

"vegetarian"
"vegan"
"non-vegetarian"
"pescatarian"
"no restrictions"