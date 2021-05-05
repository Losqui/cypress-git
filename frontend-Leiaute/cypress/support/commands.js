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

import loc from '../support/locators'

Cypress.Commands.add('SortClassificacoes', (SortTypeClas) => {
    cy.get(':nth-child(' + SortTypeClas + ') > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > :nth-child(1)').click({ timeout: 5000 })
    //cy.get('.ant-table-cell-ellipsis > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > :nth-child(' + SortTypeClas + ')').click({ timeout: 5000 })

    cy.wait(1000)
 
    cy.get('[data-row-key] > :nth-child(' + SortTypeClas + ')').then(items => {
 
        let SortC = items.map((index, html) => Cypress.$(html).text()).get()
        console.log(SortC)

        //cy.get('.ant-table-cell-ellipsis > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > :nth-child(' + SortTypeClas + ')').click({ timeout: 5000 })
        cy.get(':nth-child(' + SortTypeClas + ') > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > :nth-child(1)').click({ timeout: 5000 })
        cy.wait(500)
 
        cy.get('[data-row-key] > :nth-child(' + SortTypeClas + ')').then(items => {
            let SortD = items.map((index, html) => Cypress.$(html).text()).get()
            console.log(SortD)
 
            let compare = JSON.stringify(SortD) >= JSON.stringify(SortC)
            console.log(compare)
 
            if (compare) {
                cy.get('[data-row-key] > :nth-child(1)').should('contain', '')
            }
 
            else {
                cy.get('[data-row-key] > :nth-child(1)').should('contain', 'Erro na ordenação')
            }
 
            //cy.get('.ant-table-cell-ellipsis > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > :nth-child(' + SortTypeClas + ')').click({ timeout: 5000 })
            cy.get(':nth-child(' + SortTypeClas + ') > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > :nth-child(1)').click({ timeout: 5000 })
        })
 
    })
})

Cypress.Commands.add('criarModelo', (nome, descricao, confArq) => {
    cy.visit('/novo')
    cy.wait(2000)
    cy.get('.ant-select-clear > .anticon > svg').click()
        cy.get(loc.MODELO.NOME).type(nome)
        cy.get(loc.MODELO.DESCRICAO).type(descricao)
        cy.get(loc.MODELO.TIPOARQUIVOA).click()
        cy.get(loc.MODELO.TIPOARQUIVOSEPARADOR).click()
        cy.get(loc.MODELO.CONFIGARQUIVO).type(confArq)
        
        cy.wait(2000)
        cy.get(loc.MODELO.BTN_SALVARPROSSEGUIR).click()
        
        //cy.get('.ant-form-item-control-input-content > :nth-child(1) > :nth-child(2) > .ant-btn').click()



})


Cypress.Commands.add('excluirModelo', (nomeModelo) => {
    cy.visit('/')
    cy.reload()
    cy.wait(2000)
    cy.get(loc.MODELO.BUSCAR).type(nomeModelo)
                             .type('{enter}')

    // cy.get('.ant-select-selection-item').click()
    // cy.get('[title="100 / página"] > .ant-select-item-option-content').click()
   
    cy.xpath(`//tbody//tr[contains(., '${nomeModelo}')]`).click()
                                                        .rightclick()
    cy.get(loc.MODELO.BTN_EXCLUIR).click()
    cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type(nomeModelo)
    cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
    cy.wait(2000)
    cy.reload()
    cy.xpath(`//tbody//tr[contains(., '${nomeModelo}')]`).should('not.exist')
    

})