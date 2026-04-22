const mongoose = require('mongoose');

/**
 * Connect to MongoDB without crashing the app on initial failure.
 * Render requires the server to bind to a port quickly, even if DB is still connecting.
 */
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        
        if (!uri) {
            console.error("CRITICAL: MONGO_URI is not defined in environment variables.");
            return false;
        }

        const conn = await mongoose.connect(uri);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        // We don't exit here so the server can still start and serve a 500 or health check
        return false;
    }
};

module.exports = connectDB;
