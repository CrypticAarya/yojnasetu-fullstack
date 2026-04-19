const Scheme = require('../models/Scheme');
const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Controller to handle API root endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getIndex = (req, res) => {
    res.status(200).send("API is running");
};

/**
 * Controller to fetch schemes from MongoDB
 */
const getSchemes = async (req, res) => {
    try {
        const schemes = await Scheme.find({});
        res.status(200).json(schemes);
    } catch (error) {
        console.error('Error fetching schemes:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// --- Helper Functions ---

/**
 * Transforms frontend message history into Gemini's expected array format.
 * Ignores the hardcoded initial greeting to avoid role confusion.
 */
const formatChatHistory = (history) => {
    return history
        .filter(msg => msg.id !== 1)
        .map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));
};

/**
 * Generates the system prompt instructing the AI how to behave.
 */
const buildPrompt = (userMessage, schemes) => {
    return `You are a very warm, empathetic, and human-like guide who helps Indian citizens find government schemes. 
You speak in extremely simple, easy-to-understand language without any complex jargon or robotic tone.

User's Latest Message: "${userMessage}"

Available schemes:
${JSON.stringify(schemes)}

Task:
1. Reply naturally and warmly to the user, like a caring human assistant. Use very simple words.
2. If they match any schemes, tell them about it in a friendly, conversational way. Do not list things robotically.
3. Keep your reply concise and encouraging. Ask them if they have questions.
4. Extract user info (age, income, state, occupation) from the conversation.
5. In simple words, explain why they are eligible for the schemes you suggest.
6. Even if no schemes match yet, reply warmly and helpfully.

IMPORTANT: Your output MUST be ONLY a valid raw JSON object matching the exact structure below. Do NOT wrap it in Markdown like \`\`\`json.
{
  "reply": "natural conversational response like ChatGPT",
  "extracted_data": {
     "age": 30,
     "income": null,
     "state": null,
     "occupation": null
  },
  "schemes": [
    {
      "_id": "scheme_database_id",
      "name": "Scheme Name",
      "benefits": "Scheme Benefits",
      "reason_for_eligibility": "Why they match...",
      "apply_link": "link"
    }
  ]
}`;
};

/**
 * Safely extracts a JSON object embedded inside an AI text response.
 */
const extractJsonSafely = (rawText) => {
    const startIdx = rawText.indexOf('{');
    const endIdx = rawText.lastIndexOf('}');
    
    if (startIdx === -1 || endIdx === -1) {
        throw new Error("No JSON found in AI response");
    }
    
    return JSON.parse(rawText.substring(startIdx, endIdx + 1));
};

/**
 * Controller to handle chat interactions using Gemini
 */
const postChat = async (req, res) => {
    try {
        const { message: userMessage, history = [] } = req.body;
        
        if (!userMessage) {
            return res.status(400).json({ error: "Message is required" });
        }

        // 1. Fetch available schemes from Database
        const schemes = await Scheme.find({});

        // 2. Handle missing API Key gracefully
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
            const mockScheme = schemes.length > 0 ? schemes[0] : null;
            return res.status(200).json({
                reply: "This is a mocked response since your GEMINI_API_KEY is not set.",
                extracted_data: { age: 30, income: 50000, state: "Testing", occupation: "Farmer" },
                schemes: mockScheme ? [{...mockScheme.toObject(), reason_for_eligibility: "Because you are a test user"}] : []
            });
        }
        
        // 3. Initialize Gemini Session
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const chat = model.startChat({
            history: formatChatHistory(history)
        });

        // 4. Send Message to AI
        const prompt = buildPrompt(userMessage, schemes);
        const result = await chat.sendMessage(prompt);
        
        // 5. Parse output and return response
        let llmPayload;
        try {
            llmPayload = extractJsonSafely(result.response.text());
        } catch (parseError) {
            console.error('JSON Extraction Error:', result.response.text());
            llmPayload = {
                reply: "I was able to analyze your request but encountered an internal formatting error. Please try again!",
                extracted_data: {},
                schemes: []
            };
        }

        res.status(200).json({
            reply: llmPayload.reply || "I looked into it, but couldn't process completely.",
            extracted_data: llmPayload.extracted_data || {},
            schemes: llmPayload.schemes || []
        });

    } catch (error) {
        console.error('Error in postChat:', error);
        res.status(500).json({ error: "Failed to process chat response via AI" });
    }
};

module.exports = {
    getIndex,
    getSchemes,
    postChat
};
