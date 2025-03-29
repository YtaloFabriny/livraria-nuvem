var API_URL = "https://parseapi.back4app.com/functions/";
const headers = {
    "Content-Type": "application/json",
    "X-Parse-Application-Id": "HaE8eV2hF1wziKuFInPlKTb3SKVaS4Jw34gWUsLA",
    "X-Parse-REST-API-Key": "gCay5OTvHL1XZxszWn2XBY28IujKMpRKgbAobnmn"  // Adicione a chave API do Back4App
};

// Função para adicionar cliente
async function adicionarCliente() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;

    var API_URL_CADASTRAR = API_URL + "cadastrarCliente";

    console.log(JSON.stringify({ nome, email, telefone }))
    const response = await fetch(API_URL_CADASTRAR, {
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

    var API_URL_CARREGAR = API_URL + "listagemClientes";

    const response = await fetch(API_URL_CARREGAR, {
        method: "POST",
        headers: headers
    });
    const clientes = await response.json();
    const lista = document.getElementById("lista-clientes");
    lista.innerHTML = ""; // Limpa a lista antes de recarregar
    clientes.result.forEach(cliente => {
        lista.innerHTML += `
            <li class="cliente-item" data-id="${cliente.objectId}">
                ${cliente.nome} - ${cliente.email} - ${cliente.telefone}
                <button onclick="editarCliente('${cliente.objectId}', '${cliente.nome}', '${cliente.email}', '${cliente.telefone}')">Editar</button>
                <button onclick="excluirCliente('${cliente.objectId}')">Excluir</button>
            </li>`;
    });
}

// Função para editar cliente
function editarCliente(idCliente, nomeAtual, emailAtual, telefoneAtual) {
    const nome = prompt("Novo nome:", nomeAtual) || nomeAtual;
    const email = prompt("Novo e-mail:", emailAtual) || emailAtual;
    const telefone = prompt("Novo telefone:", telefoneAtual) || telefoneAtual;

    var API_URL_EDITAR = API_URL + "editarCliente";

    fetch(API_URL_EDITAR, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ idCliente, nome, email, telefone })
    }).then(response => {
        if (response.ok) {
            carregarClientes();
        } else {
            alert("Erro ao atualizar cliente!");
        }
    });
}

// Função para excluir cliente
async function excluirCliente(idCliente) {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {

        var API_URL_EXCLUIR = API_URL + "excluirCliente";

        const response = await fetch(API_URL_EXCLUIR, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ idCliente })
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
