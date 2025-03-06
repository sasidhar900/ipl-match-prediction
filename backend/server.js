const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint to fetch teams and cities
app.get('/api/teams', async (req, res) => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Flask API' });
    }
});

// Endpoint to forward predictions to Flask API
app.post('/api/predict', async (req, res) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/predict', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error making prediction request to Flask API' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
