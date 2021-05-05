import loc from '../support/locators'



describe('1 - Cadastro de modelo', () => {
    it('Primeira execução', () => {
        cy.visit('/novo')
        cy.get('.ant-select-clear > .anticon > svg').click()
        cy.get(loc.MODELO.NOME).type('Cadastro modelo cy separador 1')
        cy.get(loc.MODELO.DESCRICAO).type('Descrição cadastro modelo cy 1')
        cy.reload()
    })

    it('A - Cadastrar Versão', () => {
        cy.criarModelo('Modeloum', 'descrição do Modeloum', '//')

        cy.wait(3000)
        
        cy.get(loc.LEIAUTE.CODIGO).type('11111')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

        cy.get(loc.VERSAO.CODIGO).type('Versão um cy')
        cy.get(loc.VERSAO.DESCRICAO).type('Descrição da versão um')
        cy.get(loc.VERSAO.PUBLICACAO).click()
                                    .type('01/01/2025')
                                    .type('{enter}')
        cy.get(loc.VERSAO.STATUS).click()
                                .click()
        cy.get(loc.VERSAO.BTN_SALVARPROSSEGUIR).click() // , { timeout: 10000 }

        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Versão salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA, { timeout: 10000 }).should('contain', 'Cadastrar Bloco')

    })

    it('A - Excluindo a Versão (1 - A)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modeloum')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modeloum')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)

        cy.get(loc.LEIAUTE.BUSCAR).type('11111')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'11111')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.VERSAO.BUSCAR).type('Versão um cy')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Versão um cy')]`).click()
                                                   .rightclick()
        cy.get(loc.VERSAO.BTN_EXCLUIR).click()
        cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.wait(2000)
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()
        cy.wait(2000)

        cy.get(loc.LEIAUTE.BUSCAR).type('11111')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'11111')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        cy.wait(2000)

        cy.get(loc.MODELO.BTN_VOLTAR).click()

        cy.excluirModelo('Modeloum')
        
    })

    describe('2 - Validação de campos - Cadastro de Versão', () => {

        it('A - Cadastrar Versão utilizando Código já utilizado (Tela de Cadastro)', () => {

            cy.criarModelo('MModelotres', 'descrição do MModelotres', '//')
    
            cy.wait(3000)
            
            cy.get(loc.LEIAUTE.CODIGO).type('33333')
            cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
            cy.get(loc.LEIAUTE.STATUS).click()
            cy.get('#cadastro-leiaute-form_vigencia').click()
                                                        .type('01/01/2025')
                                                        .type('{enter}02/02/2025')
                                                        .type('{enter}')
            cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
            cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
            cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')
    
            cy.get(loc.VERSAO.CODIGO).type('44444')
            cy.get(loc.VERSAO.DESCRICAO).type('Teste 4')
            cy.get(loc.VERSAO.PUBLICACAO).click()
                                        .type('01/01/2025')
                                        .type('{enter}')
            cy.get(loc.VERSAO.STATUS).click()
            cy.get(loc.VERSAO.BTN_SALVARPROSSEGUIR).click()

            cy.get(loc.BLOCO.BTN_VOLTAR).click()
            cy.get(loc.VERSAO.BTN_VOLTAR).click()
            cy.get(loc.LEIAUTE.BTN_NOVOVERSAO).click()
            cy.get(loc.VERSAO.CODIGO).type('44444')
            cy.get(loc.VERSAO.DESCRICAO).type('Teste 5')
            cy.get(loc.VERSAO.PUBLICACAO).click()
                                        .type('01/03/2025')
                                        .type('{enter}')
            cy.get(loc.VERSAO.STATUS).click()
                                    .click()
            cy.get(loc.VERSAO.BTN_SALVARPROSSEGUIR).click()

            cy.get(loc.MODELO.MENSAGEMALERTA).should('contain', 'Existem erros que precisam ser tratados, verifique os erros abaixo:')
            cy.get(loc.MODELO.VALIDACAONOME).should('contain', 'Já existe uma Versão com este código')
    
        })

        it('A - Excluindo a Versão (2 - A)', () => {
            cy.visit('/')
            cy.reload()
    
            cy.get(loc.MODELO.BUSCAR).type('MModelotres')
            .type('{enter}')
            cy.xpath(`//tbody//tr[contains(.,'MModelotres')]`).click()
                                                                .rightclick()
            cy.get(loc.MODELO.BTN_EDITAR).click()
    
            cy.wait(2000)
    
            cy.get(loc.LEIAUTE.BUSCAR).type('33333')
            .type('{enter}')
            cy.xpath(`//tbody//tr[contains(.,'33333')]`).click()
                                                       .rightclick()
            cy.get(loc.LEIAUTE.BTN_EDITAR).click()
    
            cy.wait(2000)
            cy.get(loc.VERSAO.BUSCAR).type('44444')
            .type('{enter}')
            cy.xpath(`//tbody//tr[contains(.,'44444')]`).click()
                                                       .rightclick()
            cy.get(loc.VERSAO.BTN_EXCLUIR).click()
            cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
            
            cy.wait(2000)
            cy.get(loc.LEIAUTE.BTN_VOLTAR).click()
            cy.wait(2000)
    
            cy.get(loc.LEIAUTE.BUSCAR).type('33333')
            .type('{enter}')
            cy.wait(2000)
            cy.xpath(`//tbody//tr[contains(.,'33333')]`).click()
                                                       .rightclick()
            cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
            cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
            cy.wait(2000)
    
            cy.get(loc.MODELO.BTN_VOLTAR).click()
    
            cy.excluirModelo('MModelotres')
            
        })

        it('B - Validar - Todos os campos sem preenchimento (Tela de Cadastro)', () => {
            cy.criarModelo('Modelo quatro', 'descrição do modelo quatro', '//')
    

            cy.get(loc.LEIAUTE.CODIGO).type('44444')
            cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
            cy.get(loc.LEIAUTE.STATUS).click()
            cy.get('#cadastro-leiaute-form_vigencia').click()
                                                        .type('01/01/2025')
                                                        .type('{enter}02/02/2025')
                                                        .type('{enter}')
            cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
            cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
            cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

            cy.wait(1000)
            cy.get(loc.VERSAO.BTN_SALVARPROSSEGUIR).click()
            cy.get(loc.VERSAO.VALIDACAOCODIGO).should('contain', 'Por favor, informe o Código da Versão')
            cy.get(loc.VERSAO.VALIDACAODESCRICAO).should('contain', 'Por favor, informe a Descrição')
            cy.get(loc.VERSAO.VALIDACAOPUBLICACAO).should('contain', 'Por favor, informe Data de Publicação')
            cy.get(loc.VERSAO.VALIDACAOSTATUS).should('contain', 'Por favor, informe o Status')
    
        })

        it.only('E - Excluindo o Leiaute (2 - B)', () => {
            cy.visit('/')
            cy.reload()
    
            cy.get(loc.MODELO.BUSCAR).type('Modelo quatro')
            .type('{enter}')
            cy.xpath(`//tbody//tr[contains(.,'Modelo quatro')]`).click()
                                                                .rightclick()
            cy.get(loc.MODELO.BTN_EDITAR).click()
    
            cy.wait(2000)
    
            cy.get(loc.LEIAUTE.BUSCAR).type('44444')
            .type('{enter}')
            cy.xpath(`//tbody//tr[contains(.,'44444')]`).click()
                                                       .rightclick()
            cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
            cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
            cy.wait(2000)

            //cy.get(loc.MODELO.BTN_VOLTAR).click()

            cy.excluirModelo('Modelo quatro')
                
        })

    })




})