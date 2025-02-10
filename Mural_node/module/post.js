module.exports = {
    posts : [
        {
            id: "erfref",
            title: "Primeiro dia de programação",
            description: "Hoje comecei minha jornada em programação com JavaScript"
        },
        {
            id: 2,
            title: "Aprendendo Express",
            description: "Criando minha primeira API REST com Express.js"
        },
        {
            id: 3,
            title: "Desenvolvimento Web",
            description: "Explorando as possibilidades do desenvolvimento web moderno"
        },
        {
            id: 4,
            title: "Backend vs Frontend",
            description: "Entendendo as diferenças entre desenvolvimento backend e frontend"
        },
        {
            id: 5,
            title: "Node.js na prática",
            description: "Implementando servidores com Node.js e suas funcionalidades"
        }
    ],

    getAll(){
        return Array.isArray(this.posts) ? this.posts : [];
    },

    deletePost(id){
        const index = this.posts.findIndex(post => post.id == id);
        if (index !== -1) {
            this.posts.splice(index, 1);
            return true;
        }
        return false;
    },

    newPost(title, description){
        this.posts.push({id: generateId(), title: title.trim(), description: description.trim()});
    }
}

function generateId() {
    return Math.random().toString(36).substring(2, 9);
}