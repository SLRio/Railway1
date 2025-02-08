require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db'); // Import DB connection
const Item = require('./models/Item'); // Import Mongoose model

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Create Item (Save ESP data)
app.post('/items', async (req, res) => {
    const { date, value } = req.body;
    const newItem = new Item({ date, value });

    try {
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error saving item', error });
    }
});

// Get All Items
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
});

// Serve index.html by default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
