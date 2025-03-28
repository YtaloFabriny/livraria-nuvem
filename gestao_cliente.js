const API_URL = "URL_DO_BACK4APP/clientes";
const headers = {
    "Content-Type": "application/json",
    "X-Parse-Application-Id": "SEU_APP_ID", // Adicione o ID do app do Back4App
    "X-Parse-REST-API-Key": "SUA_API_KEY"  // Adicione a chave API do Back4App
};

// Função para adicionar cliente
async function adicionarCliente() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ nome, email, telefone })
    });
    if (response.ok) {
        limparFormulario();
        carregarClientes();
    } else {
        alert("Erro ao adicionar cliente!");
    }
}

// Função para carregar e listar clientes
async function carregarClientes() {
    const response = await fetch(API_URL, { headers: headers });
    const clientes = await response.json();
    const lista = document.getElementById("lista-clientes");
    lista.innerHTML = ""; // Limpa a lista antes de recarregar
    clientes.results.forEach(cliente => {
        lista.innerHTML += `
            <li class="cliente-item" data-id="${cliente.objectId}">
                ${cliente.nome} - ${cliente.email} - ${cliente.telefone}
                <button onclick="editarCliente('${cliente.objectId}', '${cliente.nome}', '${cliente.email}', '${cliente.telefone}')">Editar</button>
                <button onclick="excluirCliente('${cliente.objectId}')">Excluir</button>
            </li>`;
    });
}

// Função para editar cliente
function editarCliente(id, nomeAtual, emailAtual, telefoneAtual) {
    const nome = prompt("Novo nome:", nomeAtual) || nomeAtual;
    const email = prompt("Novo e-mail:", emailAtual) || emailAtual;
    const telefone = prompt("Novo telefone:", telefoneAtual) || telefoneAtual;

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ nome, email, telefone })
    }).then(response => {
        if (response.ok) {
            carregarClientes();
        } else {
            alert("Erro ao atualizar cliente!");
        }
    });
}

// Função para excluir cliente
async function excluirCliente(id) {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: headers
        });
        if (response.ok) {
            carregarClientes();
        } else {
            alert("Erro ao excluir cliente!");
        }
    }
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
}

// Carrega os clientes ao iniciar a página
carregarClientes();
