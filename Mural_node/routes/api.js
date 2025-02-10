const express = require('express');
const router = express.Router()
const cors = require('cors');
const bodyParser = require('body-parser');
const posts = require('../module/post');

const option = {
    origin : "http://localhost:3000"
}

router.use(cors(option))

router.get('/all', (req, res) => {
    res.json(posts.getAll());
});

router.post('/new', bodyParser.json(), (req, res) => {
    // Set timeout for the request
    req.setTimeout(5000, () => {
        return res.status(408).json({ error: "Tempo limite da requisição excedido" });
    });

    let title = req.body.title;
    let description = req.body.description;

    // Input validation
    if (!title || !description) {
        return res.status(400).json({ error: "Título e descrição são obrigatórios" });
    }

    if (typeof title !== 'string' || typeof description !== 'string') {
        return res.status(400).json({ error: "Título e descrição devem ser texto" });
    }

    if (title.trim().length < 3 || description.trim().length < 10) {
        return res.status(400).json({ error: "Título deve ter no mínimo 3 caracteres e descrição 10 caracteres" });
    }

    const id = posts.newPost(title, description);
    res.status(201).json({ message: "Post criado com sucesso", id });
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    
    const deleted = posts.deletePost(id);
    
    if (deleted) {
        res.json({ message: "Post excluído com sucesso" });
    } else {
        res.status(404).json({ error: "Post não encontrado" });
    }
});

module.exports = router;