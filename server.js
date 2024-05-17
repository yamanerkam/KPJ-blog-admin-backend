const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const mongoose = require('mongoose');
const port = 3000;

app.use(cors());
app.use(express.json())



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

app.get('/api/blogs/:id', async (req, res) => {
    try {
        const blogs = await Blog.findById(req.params.id)
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/blogs/:id', async (req, res) => {
    const { title, content } = req.body;
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, { title, content }, { new: true, runValidators: true })
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.delete('/api/blogs/:id', async (req, res) => {

    try {
        const blog = await Blog.findByIdAndDelete(req.params.id)
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/data', (req, res) => {
    res.json(data);
});


