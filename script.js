const form = document.getElementById("cadastroForm");
const lista = document.getElementById("listaCadastros");
const mensagem = document.getElementById("mensagem");
const btnLimpar = document.getElementById("btnLimpar");

let cadastros = [];

function mostrarMensagem(texto, cor = "red") {
    mensagem.style.display = "block";
    mensagem.style.color = cor;
    mensagem.textContent = texto;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmaSenha = document.getElementById("confirmaSenha").value.trim();

    // validação dos campos obrigatórios
    if (!nome || !email || !usuario || !senha || !confirmaSenha) {
        mostrarMensagem("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // senha igual
    if (senha !== confirmaSenha) {
        mostrarMensagem("As senhas não coincidem.");
        return;
    }

    // duplicados
    const existe = cadastros.find((c) => c.nome === nome && c.email === email);
    if (existe) {
        mostrarMensagem("Este cadastro já existe!");
        return;
    }

    // adicionar cadastro
    cadastros.push({ nome, email });

    const item = document.createElement("li");
    item.textContent = `${nome} - ${email}`;
    lista.appendChild(item);

    mostrarMensagem("Cadastro realizado com sucesso!", "green");

    form.reset();
});

// limpar lista
btnLimpar.addEventListener("click", () => {
    cadastros = [];
    lista.innerHTML = "";
    mostrarMensagem("Lista limpa com sucesso!", "green");
});
