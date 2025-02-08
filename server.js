const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Item = require('./models/Item'); // The Item model for the collection

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb+srv://Rio:RioAstal1234@rio.kh2t4sq.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// CRUD Routes

// Create Item
app.post('/items0', async (req, res) => {
    const { name, description } = req.body;
    const newItem = new Item({ name, description });

    try {
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error saving item', error });
    }
});

// Create Item
app.post('/items', async (req, res) => {
    const { date, value } = req.body; // Extract 'date' and 'value' from the request body

    const newItem = new Item({ date, value }); // Create new item with 'date' and 'value'

    try {
        await newItem.save();  // Save the item to MongoDB
        res.status(201).json(newItem);  // Send the created item as response
    } catch (error) {
        res.status(500).json({ message: 'Error saving item', error });  // Handle error if saving fails
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

// Get Single Item by ID
app.get('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching item', error });
    }
});

// Update Item
app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const updatedItem = await Item.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error });
    }
});

// Delete Item
app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
});

// Serve index.html by default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
