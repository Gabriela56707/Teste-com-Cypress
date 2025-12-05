describe("Testes do Formulário de Cadastro", () => {

  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080"); // ajuste o caminho se necessário
  });

  // Teste 1 — Carregamento
  it("Carrega a página corretamente", () => {
    cy.get("#cadastroForm").should("exist");
    cy.contains("Cadastro de Usuário").should("be.visible");
  });

  // Teste 2 — Campos obrigatórios
  it("Exibe erro ao tentar enviar sem preencher os campos", () => {
    cy.get("#btnCadastrar").click();
    cy.contains("Por favor, preencha todos os campos obrigatórios.");
  });

  // Teste 3 — Cadastro bem-sucedido
  it("Realiza um cadastro válido", () => {
    cy.get("#nome").type("Maria");
    cy.get("#email").type("maria@email.com");
    cy.get("#usuario").type("maria123");
    cy.get("#senha").type("12345678");
    cy.get("#confirmaSenha").type("12345678");

    cy.get("#btnCadastrar").click();

    cy.get("#mensagem").should("contain", "Cadastro realizado com sucesso!");
    cy.get("#listaCadastros li").should("have.length", 1);
  });

  // Teste 4 — Evitar duplicados
  it("Impede cadastrar nome e email duplicados", () => {
    // primeiro cadastro
    cy.get("#nome").type("João");
    cy.get("#email").type("joao@email.com");
    cy.get("#usuario").type("joao123");
    cy.get("#senha").type("12345678");
    cy.get("#confirmaSenha").type("12345678");
    cy.get("#btnCadastrar").click();

    // tentativa duplicada
    cy.get("#nome").type("João");
    cy.get("#email").type("joao@email.com");
    cy.get("#usuario").type("joao123");
    cy.get("#senha").type("12345678");
    cy.get("#confirmaSenha").type("12345678");
    cy.get("#btnCadastrar").click();

    cy.get("#mensagem").should("contain", "Este cadastro já existe!");
    cy.get("#listaCadastros li").should("have.length", 1);
  });

  // Teste 5 — Limpar lista
  it("Limpa a lista de cadastros", () => {
    cy.get("#nome").type("Ana");
    cy.get("#email").type("ana@email.com");
    cy.get("#usuario").type("ana123");
    cy.get("#senha").type("12345678");
    cy.get("#confirmaSenha").type("12345678");
    cy.get("#btnCadastrar").click();

    cy.get("#listaCadastros li").should("have.length", 1);

    cy.get("#btnLimpar").click();

    cy.get("#listaCadastros li").should("have.length", 0);
    cy.get("#mensagem").should("contain", "Lista limpa com sucesso!");
  });

});
