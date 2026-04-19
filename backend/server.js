const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const connectDB = require('./config/db'); // Import DB connection logic

// Import routes
const mainRoutes = require('./routes/mainRoutes');

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const frontendUrl = process.env.FRONTEND_URL;
if (frontendUrl) {
    allowedOrigins.push(frontendUrl);
}

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Parse incoming JSON requests

// Mount Routes
// All main API endpoints will be handled by mainRoutes
app.use('/', mainRoutes);

// Define PORT
const PORT = process.env.PORT || 5000;

// Start Server locally if not in Vercel production
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export for Vercel Serverless Function
module.exports = app;
