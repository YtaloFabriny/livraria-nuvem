async function adicionarLivro() {
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const response = await fetch("URL_DO_BACK4APP/livros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, autor })
    });
    const livro = await response.json();
    const lista = document.getElementById("lista-livros");
    lista.innerHTML += `<li>${livro.titulo} - ${livro.autor}</li>`;
}
