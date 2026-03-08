require('dotenv').config(); // Must be at the very top
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Database Connection
// Use the variable from your .env file!
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Database connection error:', err));

// Define Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// The SINGLE, CORRECTED route
app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // 1. Basic Validation
        if (!name || !email || !message) {
            return res.status(400).send({ status: "Error", message: "Please fill out all fields." });
        }

        // 2. Save to Database
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // 3. Success Response
        console.log(`New Message Received from ${name}`);
        res.status(200).send({ status: "Success", message: "Thank you, Boyo Solution has received your message!" });
        
    } catch (error) {
        console.error("Database save error:", error);
        res.status(500).send({ status: "Error", message: "Failed to save to database." });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Boyo Solution Backend is running at http://localhost:${PORT}`);
});
