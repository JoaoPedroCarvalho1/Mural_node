const PORT = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let posts = [
    {
        id: 1,
        titulo: "Primeiro dia de programação",
        descricao: "Hoje comecei minha jornada em programação com JavaScript"
    },
    {
        id: 2,
        titulo: "Aprendendo Express",
        descricao: "Criando minha primeira API REST com Express.js"
    },
    {
        id: 3,
        titulo: "Desenvolvimento Web",
        descricao: "Explorando as possibilidades do desenvolvimento web moderno"
    },
    {
        id: 4,
        titulo: "Backend vs Frontend",
        descricao: "Entendendo as diferenças entre desenvolvimento backend e frontend"
    },
    {
        id: 5,
        titulo: "Node.js na prática",
        descricao: "Implementando servidores com Node.js e suas funcionalidades"
    }
];

app.get('/all', (req, res) => {
    res.json(JSON.stringify(posts));
});

app.post('/new', bodyParser.json(), (req, res) => {
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

    let id = generateId();
    posts.push({id, title: title.trim(), description: description.trim()});
    res.status(201).json({ message: "Post criado com sucesso", id });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function generateId() {
    return Math.random().toString(36).substring(2, 9);
}
