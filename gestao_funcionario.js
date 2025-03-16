// Substitua pela URL real da sua API do Back4App
const API_URL = "URL_DO_BACK4APP/funcionarios";
const headers = {
    "Content-Type": "application/json",
    "X-Parse-Application-Id": "SEU_APP_ID", // Adicione o ID do app do Back4App
    "X-Parse-REST-API-Key": "SUA_API_KEY"  // Adicione a chave API do Back4App
};

// Função para adicionar funcionário
async function adicionarFuncionario() {
    const nome = document.getElementById("nome").value;
    const cargo = document.getElementById("cargo").value;
    const turno = document.getElementById("turno").value;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ nome, cargo, turno })
    });
    if (response.ok) {
        limparFormulario();
        carregarFuncionarios();
    } else {
        alert("Erro ao adicionar funcionário!");
    }
}

// Função para carregar e listar funcionários
async function carregarFuncionarios() {
    const response = await fetch(API_URL, { headers: headers });
    const funcionarios = await response.json();
    const lista = document.getElementById("lista-funcionarios");
    lista.innerHTML = ""; // Limpa a lista antes de recarregar
    funcionarios.results.forEach(funcionario => {
        lista.innerHTML += `
            <li class="funcionario-item" data-id="${funcionario.objectId}">
                ${funcionario.nome} - ${funcionario.cargo} - ${funcionario.turno}
                <button onclick="editarFuncionario('${funcionario.objectId}', '${funcionario.nome}', '${funcionario.cargo}', '${funcionario.turno}')">Editar</button>
                <button onclick="excluirFuncionario('${funcionario.objectId}')">Excluir</button>
            </li>`;
    });
}

// Função para editar funcionário
function editarFuncionario(id, nomeAtual, cargoAtual, turnoAtual) {
    const nome = prompt("Novo nome:", nomeAtual) || nomeAtual;
    const cargo = prompt("Novo cargo:", cargoAtual) || cargoAtual;
    const turno = prompt("Novo turno:", turnoAtual) || turnoAtual;

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ nome, cargo, turno })
    }).then(response => {
        if (response.ok) {
            carregarFuncionarios();
        } else {
            alert("Erro ao atualizar funcionário!");
        }
    });
}

// Função para excluir funcionário
async function excluirFuncionario(id) {
    if (confirm("Tem certeza que deseja excluir este funcionário?")) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: headers
        });
        if (response.ok) {
            carregarFuncionarios();
        } else {
            alert("Erro ao excluir funcionário!");
        }
    }
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("cargo").value = "";
    document.getElementById("turno").value = "";
}

// Carrega os funcionários ao iniciar a página
carregarFuncionarios();