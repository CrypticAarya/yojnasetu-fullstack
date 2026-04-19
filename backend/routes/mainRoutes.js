const express = require('express');
const router = express.Router();

// Import controller functions
const { getIndex, getSchemes, postChat } = require('../controllers/mainController');

// Define Routes and map to controller functions

// GET / -> return "API is running"
router.get('/', getIndex);

// GET /schemes -> return an array of 2-3 mock schemes
router.get('/schemes', getSchemes);

// POST /chat -> return a dummy response { message: "Chat endpoint working" }
router.post('/chat', postChat);

// Export router instance
module.exports = router;
