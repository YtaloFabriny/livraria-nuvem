var API_URL = "https://parseapi.back4app.com/functions/";
const headers = {
    "Content-Type": "application/json",
    "X-Parse-Application-Id": "HaE8eV2hF1wziKuFInPlKTb3SKVaS4Jw34gWUsLA",
    "X-Parse-REST-API-Key": "gCay5OTvHL1XZxszWn2XBY28IujKMpRKgbAobnmn"  // Adicione a chave API do Back4App
};

// Função para adicionar funcionário
async function adicionarFuncionario() {
    const nome = document.getElementById("nome").value;
    const cargo = document.getElementById("cargo").value;
    const turno = document.getElementById("turno").value;

    var API_URL_CADASTRAR = API_URL + "cadastrarFuncionario";

    const response = await fetch(API_URL_CADASTRAR, {
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

    var API_URL_CARREGAR = API_URL + "listagemFuncionarios";

    const response = await fetch(API_URL_CARREGAR, {
        method: "POST",
        headers: headers
    });
    const funcionarios = await response.json();
    console.log(funcionarios)
    const lista = document.getElementById("lista-funcionarios");
    lista.innerHTML = ""; // Limpa a lista antes de recarregar
    funcionarios.result.forEach(funcionario => {
        lista.innerHTML += `
            <li class="funcionario-item" data-id="${funcionario.objectId}">
                ${funcionario.nome} - ${funcionario.cargo} - ${funcionario.turno}
                <button onclick="editarFuncionario('${funcionario.objectId}', '${funcionario.nome}', '${funcionario.cargo}', '${funcionario.turno}')">Editar</button>
                <button onclick="excluirFuncionario('${funcionario.objectId}')">Excluir</button>
            </li>`;
    });
}

// Função para editar funcionário
function editarFuncionario(idFuncionario, nomeAtual, cargoAtual, turnoAtual) {
    const nome = prompt("Novo nome:", nomeAtual) || nomeAtual;
    const cargo = prompt("Novo cargo:", cargoAtual) || cargoAtual;
    const turno = prompt("Novo turno:", turnoAtual) || turnoAtual;

    var API_URL_EDITAR = API_URL + "editarFuncionario";

    fetch(API_URL_EDITAR, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ idFuncionario, nome, cargo, turno })
    }).then(response => {
        if (response.ok) {
            carregarFuncionarios();
        } else {
            alert("Erro ao atualizar funcionário!");
        }
    });
}

// Função para excluir funcionário
async function excluirFuncionario(idFuncionario) {
    if (confirm("Tem certeza que deseja excluir este funcionário?")) {

        var API_URL_EXCLUIR = API_URL + "excluirFuncionario";

        const response = await fetch(API_URL_EXCLUIR, {
            method: "POST",
            headers: headers, 
            body: JSON.stringify({ idFuncionario })

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
