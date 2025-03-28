const API_URL = "URL_DO_BACK4APP/vendas";
const headers = {
    "Content-Type": "application/json",
    "X-Parse-Application-Id": "SEU_APP_ID", // Adicione o ID do app do Back4App
    "X-Parse-REST-API-Key": "SUA_API_KEY"  // Adicione a chave API do Back4App
};

// Função para adicionar venda
async function adicionarVenda() {
    const livro = document.getElementById("livro").value;
    const cliente = document.getElementById("cliente").value;
    const data = document.getElementById("data").value;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ livro, cliente, data })
    });
    if (response.ok) {
        limparFormulario();
        carregarVendas();
    } else {
        alert("Erro ao registrar venda!");
    }
}

// Função para carregar e listar vendas
async function carregarVendas() {
    const response = await fetch(API_URL, { headers: headers });
    const vendas = await response.json();
    const lista = document.getElementById("lista-vendas");
    lista.innerHTML = ""; // Limpa a lista antes de recarregar
    vendas.results.forEach(venda => {
        const dataFormatada = new Date(venda.data.iso).toLocaleDateString("pt-BR");
        lista.innerHTML += `
            <li class="venda-item" data-id="${venda.objectId}">
                ${venda.livro} - ${venda.cliente} - ${dataFormatada}
                <button onclick="editarVenda('${venda.objectId}', '${venda.livro}', '${venda.cliente}', '${venda.data.iso}')">Editar</button>
                <button onclick="excluirVenda('${venda.objectId}')">Excluir</button>
            </li>`;
    });
}

// Função para editar venda
function editarVenda(id, livroAtual, clienteAtual, dataAtual) {
    const livro = prompt("Novo título do livro:", livroAtual) || livroAtual;
    const cliente = prompt("Novo cliente:", clienteAtual) || clienteAtual;
    const data = prompt("Nova data (YYYY-MM-DD):", dataAtual.split("T")[0]) || dataAtual;

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ livro, cliente, data })
    }).then(response => {
        if (response.ok) {
            carregarVendas();
        } else {
            alert("Erro ao atualizar venda!");
        }
    });
}

// Função para excluir venda
async function excluirVenda(id) {
    if (confirm("Tem certeza que deseja excluir esta venda?")) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: headers
        });
        if (response.ok) {
            carregarVendas();
        } else {
            alert("Erro ao excluir venda!");
        }
    }
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById("livro").value = "";
    document.getElementById("cliente").value = "";
    document.getElementById("data").value = "";
}

// Carrega as vendas ao iniciar a página
carregarVendas();
