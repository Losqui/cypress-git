// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('excluirModelo', (nm) => {
           cy.request({
            method: 'GET',
            url: '/ModeloLeiaute',
            qs:
            {
                nome: nm
            }
        }).then(resposta => {
            cy.request({
                method: 'DELETE',
                url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`
            }).its('status').should('be.equal', 200)
        })

})

Cypress.Commands.add('excluirLeiaute', (codi) => {
    cy.request({
     method: 'GET',
     url: '/Leiaute',
     qs:
     {
        codigo: codi
     }
 }).then(resposta => {
     cy.request({
         method: 'DELETE',
         url: `/Leiaute/${resposta.body.retorno[0].id}`
     }).its('status').should('be.equal', 200)
 })

})

Cypress.Commands.add('excluirVersao', (codV) => {
    cy.request({
     method: 'GET',
     url: '/Versao',
     qs:
     {
        codigo: codV
     }
 }).then(resposta => {
     cy.request({
         method: 'DELETE',
         url: `/Versao/${resposta.body.retorno[0].id}`
     }).its('status').should('be.equal', 200)
 })

})

Cypress.Commands.add('excluirBloco', (bloc) => {
    cy.request({
     method: 'GET',
     url: '/Bloco',
     qs:
     {
        bloco: bloc
     }
 }).then(resposta => {
     cy.request({
         method: 'DELETE',
         url: `/Bloco/${resposta.body.retorno[0].id}`
     }).its('status').should('be.equal', 200)
 })

})

Cypress.Commands.add('cadastrarModelo', (nome) => {
    cy.request({
        method: 'POST',
        url: '/ModeloLeiaute',
        body: {
            idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
            nome: nome,
            descricao: 'Escrituração Contábil limite cy',
            tipoArquivo: 'Separador',
            configArquivo: '|'
        }
    }).its('status').should('be.equal', 200)

})

Cypress.Commands.add('cadastrarLeiaute', (nome) => {
cy.request({
    method: 'POST',
    url: '/Leiaute',
    body:
    {
        idModeloLeiaute: (nomeModelo),
        codigo: '6789',
        descricao: 'Leiaute 6789 do modelo EFD Contribuições cy',
        status: 'Ativo',
        vigencia: {
            inicio: '2025-02-03T02:00:00',
            fim: '2025-04-03T02:00:00'
        }
    }
}).its('status').should('be.equal', 200)
})