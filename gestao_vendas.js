var API_URL = "https://parseapi.back4app.com/functions/";
const headers = {
    "Content-Type": "application/json",
    "X-Parse-Application-Id": "HaE8eV2hF1wziKuFInPlKTb3SKVaS4Jw34gWUsLA",
    "X-Parse-REST-API-Key": "gCay5OTvHL1XZxszWn2XBY28IujKMpRKgbAobnmn"  // Adicione a chave API do Back4App
};

// Função para adicionar venda
async function adicionarVenda() {
    const livro = document.getElementById("livro").value;
    const cliente = document.getElementById("cliente").value;
    const data = document.getElementById("data").value;

    var API_URL_CADASTRAR = API_URL + "cadastrarVenda";

    const response = await fetch(API_URL_CADASTRAR, {
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

    var API_URL_CARREGAR = API_URL + "listagemVendas";

    const response = await fetch(API_URL_CARREGAR, {
        method: "POST",
        headers: headers
    });
    const vendas = await response.json();
    console.log(vendas)
    const lista = document.getElementById("lista-vendas");
    lista.innerHTML = ""; // Limpa a lista antes de recarregar
    vendas.result.forEach(venda => {
        const dataFormatada = new Date(venda.dataVenda.iso).toLocaleDateString("pt-BR");
        lista.innerHTML += `
            <li class="venda-item" data-id="${venda.objectId}">
                ${venda.livro} - ${venda.cliente} - ${dataFormatada}
                <button onclick="editarVenda('${venda.objectId}', '${venda.livro}', '${venda.cliente}', '${venda.dataVenda.iso}')">Editar</button>
                <button onclick="excluirVenda('${venda.objectId}')">Excluir</button>
            </li>`;
    });
}

// Função para editar venda
function editarVenda(idVenda, livroAtual, clienteAtual, dataAtual) {
    const livro = prompt("Novo título do livro:", livroAtual) || livroAtual;
    const cliente = prompt("Novo cliente:", clienteAtual) || clienteAtual;
    const data = prompt("Nova data (YYYY-MM-DD):", dataAtual.split("T")[0]) || dataAtual;

    var API_URL_EDITAR = API_URL + "editarVenda";

    fetch(API_URL_EDITAR, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ idVenda, livro, cliente, data })
    }).then(response => {
        if (response.ok) {
            carregarVendas();
        } else {
            alert("Erro ao atualizar venda!");
        }
    });
}

// Função para excluir venda
async function excluirVenda(idVenda) {

    var API_URL_EXCLUIR = API_URL + "excluirVenda";
    
    if (confirm("Tem certeza que deseja excluir esta venda?")) {
        const response = await fetch(API_URL_EXCLUIR, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ idVenda })
       
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
