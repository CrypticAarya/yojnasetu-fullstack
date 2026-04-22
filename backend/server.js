require('dotenv').config(); // Load environment variables first
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mainRoutes = require('./routes/mainRoutes');

// Initialize Express app
const app = express();

/**
 * 1. PORT CONFIGURATION (CRITICAL for Render)
 */
const PORT = process.env.PORT || 5000;

/**
 * 2. ENVIRONMENT VARIABLE CHECK & DEBUG LOGS
 */
console.log("🚀 STARTING SERVER...");
console.log("ENV CHECK:", {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongo_uri_exists: !!process.env.MONGO_URI,
    jwt_secret_exists: !!process.env.JWT_SECRET,
    frontend_url: process.env.FRONTEND_URL
});

/**
 * 3. MIDDLEWARE & CORS
 */
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        
        // In production, you might want to be stricter, but this allows local and configured frontend
        if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost') || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            console.warn(`CORS Blocked: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

/**
 * 4. ROUTES
 */
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', uptime: process.uptime() }));
app.use('/', mainRoutes);

/**
 * 5. SERVER STARTUP PATTERN (Production Ready)
 */
async function startServer() {
    try {
        // Attempt DB connection
        const dbConnected = await connectDB();
        
        if (!dbConnected) {
            console.warn("⚠️ Continuing startup without MongoDB connection. Some features may fail.");
        }

        // Start listening
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`✅ Server is running on port ${PORT}`);
            console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
        });
    } catch (err) {
        console.error("❌ CRITICAL: Failed to start server:", err);
        process.exit(1);
    }
}

startServer();

// Export for testing or serverless environments
module.exports = app;
