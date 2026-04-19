const mongoose = require('mongoose');

const SchemeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    eligibility: {
        type: String,
        required: true
    },
    benefits: {
        type: String,
        required: true
    },
    documents: {
        type: [String],
        default: []
    },
    apply_link: {
        type: String,
        required: false
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Scheme', SchemeSchema);
