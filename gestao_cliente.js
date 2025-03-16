async function adicionarCliente() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const response = await fetch("URL_DO_BACK4APP/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone })
    });
    const cliente = await response.json();
    const lista = document.getElementById("lista-clientes");
    lista.innerHTML += `<li>${cliente.nome} - ${cliente.email} - ${cliente.telefone}</li>`;
}

async function carregarClientes() {
    const response = await fetch("URL_DO_BACK4APP/clientes");
    const clientes = await response.json();
    const lista = document.getElementById("lista-clientes");
    clientes.results.forEach(cliente => {
        lista.innerHTML += `<li>${cliente.nome} - ${cliente.email} - ${cliente.telefone}</li>`;
    });
}
carregarClientes(); // Carrega a lista ao abrir a página
