async function carregarPosts() {
    try {
        const response = await fetch('/api/all');
        let posts = await response.json();
        const mural = document.getElementById('mural');
        mural.innerHTML = '';

        if (!Array.isArray(posts)) {
            console.error('Dados recebidos não são um array:', posts);
            posts = [posts]; 
        }

        renderPosts(posts);
    } catch (error) {
        console.error('Erro ao carregar posts:', error);
    }
}

// Função para deletar um post
async function deletePost(id) {
    try {
        // Ensure the ID is treated as a string
        const response = await fetch(`/api/delete/${encodeURIComponent(id)}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Post deletado com sucesso!');
            carregarPosts(); // Refresh the posts after deletion
        } else {
            console.error('Erro ao deletar post:', response.statusText);
            alert('Erro ao deletar post. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao deletar post:', error);
        alert('Erro ao deletar post. Verifique sua conexão e tente novamente.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const tituloInput = document.getElementById('titulo');
    const descricaoInput = document.getElementById('descricao');

    if (!postForm || !tituloInput || !descricaoInput) {
        console.error('Form or input elements not found. Please check the IDs.');
        return;
    }

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const titulo = tituloInput.value.trim();
        const descricao = descricaoInput.value.trim();

        // Front-end validation
        if (titulo.length < 3) {
            alert('O título deve ter no mínimo 3 caracteres.');
            return;
        }

        if (descricao.length < 10) {
            alert('A descrição deve ter no mínimo 10 caracteres.');
            return;
        }

        try {
            const response = await fetch('/api/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: titulo, description: descricao })
            });

            if (response.ok) {
                tituloInput.value = ''; // Reset the input value
                descricaoInput.value = ''; // Reset the input value
                carregarPosts();
                alert('Post criado com sucesso!');
            } else {
                console.error('Erro ao adicionar post:', response.statusText);
                alert('Erro ao adicionar post. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao adicionar post:', error);
        }
    });
});

function createPostElement(post) {

    // Clone o template e substitua os placeholders
    const template = `
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">${post.title || 'Título não disponível'}</h3>
                    <p class="text-gray-600 mb-4">${post.description || 'Descrição não disponível'}</p>
                </div>
                <button class="text-red-500 hover:text-red-700 transition-colors" onclick="deletePost('${String(post.id)}')">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            <div class="flex justify-between items-center text-sm text-gray-500">
                <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                    ${post.autor || 'Anônimo'}
                </span>
                <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                    ${formatDate(post.data)}
                </span>
                <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">${post.categoria || 'Geral'}</span>
            </div>
        </div>
    `;

    // Criar um elemento temporário para converter a string em elemento DOM
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template.trim();
    
    return tempDiv.firstElementChild;
}

// Função auxiliar para formatar a data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Função para renderizar os posts no mural
function renderPosts(posts) {
    const mural = document.getElementById('mural');
    mural.innerHTML = ''; 
    posts.forEach(post => {
        const postElement = createPostElement(post);
        mural.appendChild(postElement);
    });
}
carregarPosts();