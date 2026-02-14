const User = require('../models/user.model');


const getCurrentUser = async (req, res, next) => {
    try {
        // Get userId from cookie first (automatic authentication)

        const cookieUserId = req.cookies && req.cookies.userId;
        const headerUserId = req.headers.userid || req.headers.userId || req.headers['user-id'] || req.headers['x-user-id'];
        const queryUserId = req.query.userId || req.query.userid;
        const bodyUserId = req.body && (req.body.userId || req.body.userid);

        const userId = cookieUserId || headerUserId || queryUserId || bodyUserId;

        if (!userId) {
            return res.status(401).json({
                error: 'Authentication required. Please sign in first.',
                hint: 'The userId cookie was not found. Make sure you are signed in.'
            });
        }

        // Fetch user from MongoDB
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in getCurrentUser middleware:', error);
        res.status(500).json({
            error: 'Failed to fetch user',
            message: error.message
        });
    }
};

module.exports = getCurrentUser;

