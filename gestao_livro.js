var API_URL = "https://parseapi.back4app.com/functions/";
const headers = {
    "Content-Type": "application/json",
    "X-Parse-Application-Id": "HaE8eV2hF1wziKuFInPlKTb3SKVaS4Jw34gWUsLA",
    "X-Parse-REST-API-Key": "gCay5OTvHL1XZxszWn2XBY28IujKMpRKgbAobnmn"  // Adicione a chave API do Back4App
};

// Função para adicionar livro
async function adicionarLivro() {
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const estoque = parseInt(document.getElementById("estoque").value);

    API_URL = API_URL + "cadastrarLivro";

    const response = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ titulo, autor, preco, estoque })
    });

    if (response.ok) {
        limparFormulario();
        carregarLivros();
    } else {
        alert("Erro ao adicionar livro!");
    }
}

// Função para carregar e listar livros
async function carregarLivros() {

    API_URL = API_URL + "listagemLivros";

    const response = await fetch(API_URL, {
        method: "POST",
        headers: headers
    });
    const livros = await response.json();
    const lista = document.getElementById("lista-livros");
    lista.innerHTML = ""; // Limpa a lista antes de recarregar
    livros.results.forEach(livro => {
        lista.innerHTML += `
            <li class="livro-item" data-id="${livro.objectId}">
                ${livro.titulo} - ${livro.autor} - R$${livro.preco.toFixed(2)} - Estoque: ${livro.estoque}
                <button onclick="editarLivro('${livro.objectId}', '${livro.titulo}', '${livro.autor}', ${livro.preco}, ${livro.estoque})">Editar</button>
                <button onclick="excluirLivro('${livro.objectId}')">Excluir</button>
            </li>`;
    });
}

// Função para editar livro
function editarLivro(idLivro, tituloAtual, autorAtual, precoAtual, estoqueAtual) {
    const titulo = prompt("Novo título:", tituloAtual) || tituloAtual;
    const autor = prompt("Novo autor:", autorAtual) || autorAtual;
    const preco = parseFloat(prompt("Novo preço:", precoAtual)) || precoAtual;
    const estoque = parseInt(prompt("Novo estoque:", estoqueAtual)) || estoqueAtual;

    API_URL = API_URL + "editarLivro";

    fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ idLivro, titulo, autor, preco, estoque })
    }).then(response => {
        if (response.ok) {
            carregarLivros();
        } else {
            alert("Erro ao atualizar livro!");
        }
    });
}

// Função para excluir livro
async function excluirLivro(idLivro) {

    API_URL = API_URL + "excluirLivro";

    if (confirm("Tem certeza que deseja excluir este livro?")) {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ idLivro })
        });
        if (response.ok) {
            carregarLivros();
        } else {
            alert("Erro ao excluir livro!");
        }
    }
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("estoque").value = "";
}

// Carrega os livros ao iniciar a página
carregarLivros();
