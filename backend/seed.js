require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Scheme = require('./models/Scheme');

const seedData = [
  {
    name: "PM Kisan Samman Nidhi",
    eligibility: "Small and marginal farmers with cultivable landholding up to 2 hectares.",
    benefits: "Rs. 6000 per year transferred in three equal installments.",
    documents: ["Aadhaar Card", "Bank Account Details", "Land Holding Documents"],
    apply_link: "https://pmkisan.gov.in/"
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    eligibility: "Farmers growing notified crops in notified areas.",
    benefits: "Insurance cover against crop failure due to natural calamities, pests or diseases.",
    documents: ["Aadhaar Card", "Bank Passbook", "Land Records (7/12 & 8A)", "Sowing Certificate"],
    apply_link: "https://pmfby.gov.in/"
  },
  {
    name: "Mahatma Jotirao Phule Shetkari Karjmukti Yojna",
    eligibility: "Farmers in Maharashtra with pending crop loans up to Rs. 2 Lakhs.",
    benefits: "Full debt waiver for outstanding crop loans.",
    documents: ["Aadhaar Card", "Bank Passbook", "Loan Account Details"],
    apply_link: "https://mjpsky.maharashtra.gov.in/"
  },
  {
    name: "Kisan Credit Card (KCC) Scheme",
    eligibility: "All farmers, individuals, or joint borrowers who are owner cultivators.",
    benefits: "Timely credit support from banking system for cultivation and other needs.",
    documents: ["Aadhaar Card", "Voter ID", "Land documents", "Passport Size Photos"],
    apply_link: "https://www.myscheme.gov.in/schemes/kcc"
  },
  {
    name: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
    eligibility: "All farmers are eligible, specifically those with agricultural land.",
    benefits: "Subsidies for micro-irrigation solutions (drip and sprinkler systems).",
    documents: ["Aadhaar Card", "Bank Details", "Land Ownership Proof"],
    apply_link: "https://pmksy.gov.in/"
  }
];

const seedDB = async () => {
    try {
        await connectDB();
        
        // Clear existing data
        await Scheme.deleteMany();
        console.log('Existing schemes removed.');

        // Insert seed data
        await Scheme.insertMany(seedData);
        console.log('Sample schemes inserted successfully.');

        process.exit();
    } catch (error) {
        console.error(`Seeding failed: ${error}`);
        process.exit(1);
    }
};

seedDB();
