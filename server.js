const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const mongoose = require('mongoose');
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Sample data
const data = [
    { id: 1, name: 'Item 1', description: 'This is item 1' },
    { id: 2, name: 'Item 2', description: 'This is item 2' },
    { id: 3, name: 'Item 3', description: 'This is item 3' },
];

mongoose.connect('mongodb+srv://erkamyaman35:Tatil.18@backenddb.hs5fa8a.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB')
    .then(() => {
        console.log('success')
    }).catch(() => {
        console.log('fail')
    })


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/data', (req, res) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
