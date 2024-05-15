const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const mongoose = require('mongoose');
const port = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json())

// Sample data
const data = [
    { id: 1, name: 'Item 1', description: 'This is item 1' },
    { id: 2, name: 'Item 2', description: 'This is item 2' },
    { id: 3, name: 'Item 3', description: 'This is item 3' },
];

mongoose.connect('mongodb+srv://erkamyaman35:Tatil.18@backenddb.hs5fa8a.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB')
    .then(() => {
        console.log('success to db')
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }).catch(() => {
        console.log('fail')
    })

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Please enter title name"],
    },



    content: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,

    });

const Blog = mongoose.model('Blog', blogSchema);


app.post('/api/blogs', async (req, res) => {
    const newBlog = new Blog(req.body);
    try {
        const savedBlog = await newBlog.save();
        console.log(req)
        console.log(savedBlog)
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/data', (req, res) => {
    res.json(data);
});


