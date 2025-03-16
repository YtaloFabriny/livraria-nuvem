async function adicionarFuncionario() {
    const nome = document.getElementById("nome").value;
    const cargo = document.getElementById("cargo").value;
    const turno = document.getElementById("turno").value;
    const response = await fetch("URL_DO_BACK4APP/funcionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cargo, turno })
    });
    const funcionario = await response.json();
    const lista = document.getElementById("lista-funcionarios");
    lista.innerHTML += `<li>${funcionario.nome} - ${funcionario.cargo} - ${funcionario.turno}</li>`;
}

async function carregarFuncionarios() {
    const response = await fetch("URL_DO_BACK4APP/funcionarios");
    const funcionarios = await response.json();
    const lista = document.getElementById("lista-funcionarios");
    funcionarios.results.forEach(funcionario => {
        lista.innerHTML += `<li>${funcionario.nome} - ${funcionario.cargo} - ${funcionario.turno}</li>`;
    });
}
carregarFuncionarios();
