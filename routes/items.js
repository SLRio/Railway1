const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// @route   POST /items
// @desc    Create an item
router.post('/', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// @route   GET /items
// @desc    Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// @route   GET /items/:id
// @desc    Get an item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ msg: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// @route   PUT /items/:id
// @desc    Update an item by ID
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!item) return res.status(404).json({ msg: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// @route   DELETE /items/:id
// @desc    Delete an item by ID
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ msg: 'Item not found' });
        res.json({ msg: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
