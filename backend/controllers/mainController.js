const OpenAI = require('openai');
const Scheme = require('../models/Scheme');

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
 * Transforms frontend message history into OpenAI's expected array format.
 */
const formatChatHistory = (history) => {
    return history
        .filter(msg => msg.id !== 1)
        .map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content
        }));
};

/**
 * Generates the system prompt instructing the AI how to behave.
 */
const buildSystemPrompt = (schemes) => {
    return `You are a very warm, empathetic, and human-like guide who helps Indian citizens find government schemes. 
You speak in extremely simple, easy-to-understand language without any complex jargon or robotic tone.

Available schemes in database (categorized for better matching):
${JSON.stringify(schemes)}

Task:
1. Reply naturally and warmly to the user, like a caring human assistant. Use very simple words.
2. If they match any schemes, tell them about it in a friendly, conversational way, mentioning the category (e.g., "In the Health sector..."). Do not list things robotically.
3. Keep your reply concise and encouraging. Ask them if they have questions.
4. Extract user info (age, income, state, occupation) from the conversation.
5. In simple words, explain why they are eligible for the schemes you suggest based on their profile.
6. Even if no schemes match yet, reply warmly and helpfully.

IMPORTANT: Your output MUST be ONLY a valid raw JSON object. Do NOT wrap it in Markdown like \`\`\`json.
{
  "reply": "natural conversational response",
  "extracted_data": {
     "age": number or null,
     "income": number or null,
     "state": string or null,
     "occupation": string or null
  },
  "schemes": [
    {
      "_id": "id",
      "name": "Name",
      "benefits": "Benefits",
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
 * Controller to handle chat interactions using OpenAI
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
        if (!process.env.OPENAI_API_KEY) {
            return res.status(200).json({
                reply: "Please set your OPENAI_API_KEY in the .env file.",
                extracted_data: {},
                schemes: []
            });
        }
        
        // 3. Initialize OpenAI
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        // 4. Send Message to AI
        const systemPrompt = buildSystemPrompt(schemes);
        const messages = [
            { role: 'system', content: systemPrompt },
            ...formatChatHistory(history),
            { role: 'user', content: userMessage }
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            response_format: { type: "json_object" }
        });
        
        const rawResponse = completion.choices[0].message.content;

        // 5. Parse output and return response
        let llmPayload;
        try {
            llmPayload = JSON.parse(rawResponse);
        } catch (parseError) {
            console.error('JSON Parse Error:', rawResponse);
            llmPayload = {
                reply: "I encountered an internal formatting error. Please try again!",
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
