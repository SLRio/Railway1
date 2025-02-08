// server.js (Backend)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI || "mongodb+srv://Rio:RioAstal1234@rio.kh2t4sq.mongodb.net/?retryWrites=true&w=majority"; // Use environment variable for security
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const DataSchema = new mongoose.Schema({
    value: Number,
    date: Date
});
const DataModel = mongoose.model('Data', DataSchema);

// CRUD Endpoints
app.get('/data', async (req, res) => {
    const data = await DataModel.find();
    res.json(data);
});

app.post('/data', async (req, res) => {
    const newData = new DataModel(req.body);
    await newData.save();
    res.json(newData);
});

app.put('/data/:id', async (req, res) => {
    await DataModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Data updated' });
});

app.delete('/data/:id', async (req, res) => {
    await DataModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Data deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// React Frontend (App.js)
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const API_URL = "https://your-backend.up.railway.app"; // Replace with your actual Railway backend URL

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/data`).then(response => setData(response.data));
    }, []);

    return (
        <div>
            <h2>Graph View</h2>
            <LineChart width={600} height={300} data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};

const ManageData = () => {
    const [data, setData] = useState([]);
    const [newValue, setNewValue] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/data`).then(response => setData(response.data));
    }, []);

    const addData = () => {
        axios.post(`${API_URL}/data`, { value: newValue, date: new Date() })
            .then(response => setData([...data, response.data]));
    };

    return (
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/data`).then(response => setData(response.data));
    }, []);

    return (
        <div>
            <h2>Graph View</h2>
            <LineChart width={600} height={300} data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#88
        <div>
            <h2>Manage Data</h2>
            <input type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
            <button onClick={addData}>Add Data</button>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/manage">Manage Data</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/manage" element={<ManageData />} />
            </Routes>
        </Router>
    );
};

export default App;
