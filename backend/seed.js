require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Scheme = require('./models/Scheme');

const seedData = [
  {
    name: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    eligibility: "Small and marginal farmers with cultivable landholding up to 2 hectares.",
    benefits: "Rs. 6000 per year transferred in three equal installments.",
    documents: ["Aadhaar Card", "Bank Account Details", "Land Holding Documents"],
    apply_link: "https://pmkisan.gov.in/"
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    category: "Insurance",
    eligibility: "Farmers growing notified crops in notified areas.",
    benefits: "Insurance cover against crop failure due to natural calamities, pests or diseases.",
    documents: ["Aadhaar Card", "Bank Passbook", "Land Records (7/12 & 8A)", "Sowing Certificate"],
    apply_link: "https://pmfby.gov.in/"
  },
  {
    name: "Mahatma Jotirao Phule Shetkari Karjmukti Yojna",
    category: "Finance",
    eligibility: "Farmers in Maharashtra with pending crop loans up to Rs. 2 Lakhs.",
    benefits: "Full debt waiver for outstanding crop loans.",
    documents: ["Aadhaar Card", "Bank Passbook", "Loan Account Details"],
    apply_link: "https://mjpsky.maharashtra.gov.in/"
  },
  {
    name: "Kisan Credit Card (KCC) Scheme",
    category: "Finance",
    eligibility: "All farmers, individuals, or joint borrowers who are owner cultivators.",
    benefits: "Timely credit support from banking system for cultivation and other needs.",
    documents: ["Aadhaar Card", "Voter ID", "Land documents", "Passport Size Photos"],
    apply_link: "https://www.myscheme.gov.in/schemes/kcc"
  },
  {
    name: "PM SVANidhi",
    category: "Entrepreneurship",
    eligibility: "Street vendors working in urban areas including those from surrounding peri-urban/rural areas.",
    benefits: "Working capital loan up to ₹10,000, interest subsidy, and cashback on digital transactions.",
    documents: ["Aadhaar Card", "Voter ID", "Proof of Vending"],
    apply_link: "https://pmsvanidhi.mohua.gov.in/"
  },
  {
    name: "Sukanya Samriddhi Yojana",
    category: "Social Welfare",
    eligibility: "Parents of a girl child below 10 years of age.",
    benefits: "High-interest savings account for girl child's education and marriage with tax benefits.",
    documents: ["Girl Child's Birth Certificate", "Aadhaar Card of Parent", "Address Proof"],
    apply_link: "https://www.myscheme.gov.in/schemes/ssy"
  },
  {
    name: "Ayushman Bharat (PM-JAY)",
    category: "Health",
    eligibility: "Poor and vulnerable families as per SECC 2011 data.",
    benefits: "Health cover of up to ₹5 Lakh per family per year for secondary and tertiary care hospitalization.",
    documents: ["Aadhaar Card", "Ration Card", "PM-JAY ID/Family ID"],
    apply_link: "https://nha.gov.in/PM-JAY"
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
