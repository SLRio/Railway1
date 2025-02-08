const mongoose = require('mongoose');

// Define the schema for an item
const itemSchema = new mongoose.Schema({
    date: { type: Date, required: true },  // Corrected 'date' to 'Date'
    value: { type: Number, required: true },  // Corrected 'int' to 'Number' and made 'value' lowercase to match JS naming conventions
});

// Create the Item model from the schema
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
