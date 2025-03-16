async function adicionarVenda() {
    const livro = document.getElementById("livro").value;
    const cliente = document.getElementById("cliente").value;
    const data = document.getElementById("data").value;
    const response = await fetch("URL_DO_BACK4APP/vendas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ livro, cliente, data })
    });
    const venda = await response.json();
    const lista = document.getElementById("lista-vendas");
    lista.innerHTML += `<li>${venda.livro} - ${venda.cliente} - ${venda.data}</li>`;
}

async function carregarVendas() {
    const response = await fetch("URL_DO_BACK4APP/vendas");
    const vendas = await response.json();
    const lista = document.getElementById("lista-vendas");
    vendas.results.forEach(venda => {
        lista.innerHTML += `<li>${venda.livro} - ${venda.cliente} - ${venda.data}</li>`;
    });
}
carregarVendas();
