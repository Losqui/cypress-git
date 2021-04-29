    /// <reference types= "cypress" />

import loc from '../support/locators'

describe('1 - Cadastro de modelo', () => {
    it('Primeira execução', () => {
        cy.visit('/novo')
        cy.get('.ant-select-clear > .anticon > svg').click()
        cy.get(loc.MODELO.NOME).type('Cadastro modelo cy separador 1')
        cy.get(loc.MODELO.DESCRICAO).type('Descrição cadastro modelo cy 1')
        cy.reload()
    })
    //modelo 1
    it('A - Cadastrar Modelo tipo Separador', () => {
        cy.visit('/novo')
        cy.wait(3000)
        cy.reload()
        
        cy.get('.ant-select-clear > .anticon > svg').click()
        cy.get(loc.MODELO.NOME).type('Cadastro modelo cy separador 1')
        cy.get(loc.MODELO.DESCRICAO).type('Descrição cadastro modelo cy 1')
        cy.get(loc.MODELO.TAGA).click()
        cy.get(loc.MODELO.TAGS).click()
        cy.get(':nth-child(4) > .ant-form-item-label').click()//clicar em qualquer parte da tela
        cy.get(loc.MODELO.TIPOARQUIVOA).click()
        cy.get(loc.MODELO.TIPOARQUIVOSEPARADOR).click()
        cy.get(loc.MODELO.CONFIGARQUIVO).type('|||||')
        cy.get(loc.MODELO.BTN_SALVARPROSSEGUIR).click()
        // cy.get('.ant-form-item-control-input-content > :nth-child(1) > :nth-child(2) > .ant-btn').click()

         //cy.get('.styles__Title-sc-12b1chh-2').should('contain', 'Cadastrar Leiaute')
        cy.get('.ant-message-custom-content').should('contain','Dados de Modelo salvos com sucesso!')
        cy.get('.ant-layout-content > :nth-child(2)').should('contain', 'Cadastrar Leiaute')
        cy.get('.anticon > svg').should('not.equal','1')

    })
    //modelo 2
    it('B - Cadastrar Modelo tipo Posicionamento', () => {
        cy.visit('/novo')
        cy.get('.ant-select-clear > .anticon > svg').click()
        cy.get(loc.MODELO.NOME).type('Cadastro modelo posicionamento cy 2')
        cy.get(loc.MODELO.DESCRICAO).type('Descrição modelo posicionamento cy 2')
        cy.get(loc.MODELO.TAGA).click()
        cy.get(loc.MODELO.TAGS).click()
        cy.get(':nth-child(4) > .ant-form-item-label').click()//clicar em qualquer parte da tela
        cy.get(loc.MODELO.TIPOARQUIVOA).click()
        cy.wait(500)
        cy.get(loc.MODELO.TIPOARQUIVOPOSICIONAMENTO).click()

        cy.get('#cadastro-modelo-form_configArquivo').should('not.visible')
        
        // //cy.get(loc.MODELO.BTN_SALVARPROSSEGUIR).click()
        cy.get('.ant-form-item-control-input-content > :nth-child(1) > :nth-child(2) > .ant-btn').click()

        cy.get('.ant-message-custom-content').should('contain','Dados de Modelo salvos com sucesso!')
        cy.get('.ant-layout-content > :nth-child(2)').should('contain', 'Cadastrar Leiaute')

    })

    it('C - Validar o nome das telas', () => {
        cy.visit('/')
        cy.get(loc.MODELO.NOMETELA).should('contain', 'Modelos')
        cy.wait(1000)
        cy.visit('/novo')
        cy.get(loc.MODELO.NOMETELA).should('contain', 'Cadastrar Modelo')
        cy.wait(1000)
        cy.visit('/')

        cy.xpath(`//table//tr[contains(.,'Cadastro modelo cy separador 1')]`).rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()
        cy.get(loc.MODELO.NOMETELA).should('contain', 'Editar Modelo')
    })
 
    it('D - Clonar modelo', () => {
        cy.criarModelo('Clonar modelo', 'Descrição cadastro modelo clonar', '|||||')

        // cy.visit('/novo')
        
        // cy.get('.ant-select-clear > .anticon > svg').click()
        // cy.get(loc.MODELO.NOME).type('Clonar modelo')
        // cy.get(loc.MODELO.DESCRICAO).type('Descrição cadastro modelo clonar')
        // cy.get(loc.MODELO.TAGA).click()
        // cy.get(loc.MODELO.TAGS).click()
        // cy.get(':nth-child(4) > .ant-form-item-label').click()//clicar em qualquer parte da tela
        // cy.get(loc.MODELO.TIPOARQUIVOA).click()
        // cy.get(loc.MODELO.TIPOARQUIVOSEPARADOR).click()
        // cy.get(loc.MODELO.CONFIGARQUIVO).type('|||||')
        // cy.get(loc.MODELO.BTN_SALVARPROSSEGUIR).click()
        

        cy.get('.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-icon').click()
        cy.get('.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon').click()
        cy.wait(500)
        //cy.get('.ant-steps-icon > .anticon > svg').click()
        //cy.get(loc.MODELO.VOLTARMODELO).click()
        cy.xpath(`//tbody//tr[contains(.,'Clonar modelo')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_CLONAR).click()
        cy.get(loc.MODELO.BTN_CLONAR_SIM).click()
        cy.wait(500)
        cy.xpath(`//tbody//tr[contains(.,'Clonar modelo 1')]`).should('exist')
       
    })

    describe('2 - Validação de campos - Cadastro de modelo', () => {

        it('A - Cadastrar Modelo utilizando Nome já utilizado (Tela de Cadastro)', () => {
//             cy.visit('/')
//             cy.wait(3000)
            
// //            console.log(mod)
//             cy.xpath(`//table//tr[contains(.,'IPI Modelo')]`).then(nome => {
//                 var texto = nome
//                 console.log(texto)
//                     if (texto ==     'IPI Modelo'){
//                         cy.wait(1000)
//                         cy.criarModelo('IPI Modelo', 'Descrição Cadastro duplicado', '|||||')            
//                     }
//                     else{
//                         cy.criarModelo('IPI Modelo', 'Descrição IPI Modelo', '|||||')
//                         cy.wait(1000)
//                         cy.criarModelo('IPI Modelo', 'Descrição Cadastro duplicado', '|||||')
//                         cy.wait(1000)
//                     }
                
//             })

                        cy.criarModelo('IPI Modelo', 'Descrição IPI Modelo', '|||||')
                        cy.wait(1000)
                        cy.criarModelo('IPI Modelo', 'Descrição Cadastro duplicado', '|||||')
                        cy.wait(1000)




            //cy.criarModelo('Cadastro modelo cy separador 1', 'Teste descrição cy', '|||||')

            // cy.visit('/novo')
            // //cy.get('.ant-select-clear > .anticon > svg > path').click()

            // cy.get(loc.MODELO.NOME).type('Cadastro modelo cy separador 1')
            // cy.get(loc.MODELO.DESCRICAO).type('Teste descrição cy')
            // cy.get(loc.MODELO.TAGA).click()
            // cy.get(loc.MODELO.TAGS).click()
            // cy.get(':nth-child(4) > .ant-form-item-label').click()//clicar em qualquer parte da tela
            // cy.get(loc.MODELO.CONFIGARQUIVO).type('|||||')
            //cy.get(loc.MODELO.BTN_SALVARPROSSEGUIR).click()

            cy.get(loc.MODELO.MENSAGEMALERTA).should('contain', 'Existem erros que precisam ser tratados, verifique os erros abaixo:')
            cy.get(loc.MODELO.VALIDACAONOME).should('contain', 'Já existe um Modelo com o nome especificado')
    
        })

        it('B - Validar - Todos os campos sem preenchimento (Tela de Cadastro)', () => {
            cy.visit('/novo')
            cy.get(loc.MODELO.BTN_SALVARPROSSEGUIR).click()
            cy.get(loc.MODELO.VALIDACAONOME).should('contain', 'Por favor, informe o Nome')
            cy.get(loc.MODELO.VALIDACAODESCRICAO).should('contain', 'Por favor, informe a Descrição')
            cy.get(loc.MODELO.VALIDACAOCONFTIPOARQUIVO).should('contain', 'Por favor, informe o caractere separador')

        })

        it('C - Validar - campo Descrição não preenchido (Tela de Cadastro)', () => {
            cy.visit('/novo')
            cy.get('.ant-select-clear > .anticon > svg').click()
            cy.get(loc.MODELO.NOME).type('Teste Nome modelo posicionamento cy')
            cy.get(loc.MODELO.TAGA).click()
            cy.get(loc.MODELO.TAGS).click()
            cy.get(':nth-child(4) > .ant-form-item-label').click()//clicar em qualquer parte da tela
            cy.get(loc.MODELO.TIPOARQUIVOA).click()
            cy.get(loc.MODELO.TIPOARQUIVOPOSICIONAMENTO).click()

            cy.get(loc.MODELO.BTN_SALVARPROSSEGUIR).click()
            cy.get('#cadastro-modelo-form_configArquivo').should('not.visible')
            cy.get(loc.MODELO.VALIDACAODESCRICAO).should('contain', 'Por favor, informe a Descrição')
        })

        it('D - Validar - campo Nome não preenchido (Tela de Cadastro)', () => {
            cy.visit('/novo')
            
            cy.get(loc.MODELO.DESCRICAO).type('Teste descrição cadastro modelo cy')
            cy.get(loc.MODELO.TAGA).click()
            cy.get(loc.MODELO.TAGS).click()
            cy.get(':nth-child(4) > .ant-form-item-label').click()//clicar em qualquer parte da tela
            cy.get(loc.MODELO.CONFIGARQUIVO).type('|||||')

            cy.get(loc.MODELO.BTN_SALVARPROSSEGUIR).click()
            cy.get(loc.MODELO.VALIDACAONOME).should('contain', 'Por favor, informe o Nome')

        })

        it('E - Validar - campo tipoArquivo não preenchido (Tela de Cadastro)', () => {
            cy.visit('/novo')
            cy.get('.ant-select-clear > .anticon > svg').click()
            cy.get(loc.MODELO.NOME).type('Teste Nome modelo posicionamento cy')
            cy.get(loc.MODELO.DESCRICAO).type('Teste descrição cadastro modelo cy')
            cy.get(loc.MODELO.TAGA).click()
            cy.get(loc.MODELO.TAGS).click()
            cy.get(':nth-child(4) > .ant-form-item-label').click()//clicar em qualquer parte da tela

            cy.get(loc.MODELO.BTN_SALVARPROSSEGUIR).click()
            cy.get(loc.MODELO.VALIDACAOTIPOARQUIVO).should('contain', 'Por favor, selecione um Tipo de Arquivo')
            cy.get('#cadastro-modelo-form_configArquivo').should('not.visible')

        })

        it('F - Validar - campo configArquivo não preenchido (Tela de Cadastro)', () => {
            cy.visit('/novo')
            
            cy.get(loc.MODELO.NOME).type('Teste Nome modelo posicionamento cy')
            cy.get(loc.MODELO.DESCRICAO).type('Teste descrição cadastro modelo cy')
            cy.get(loc.MODELO.TAGA).click()
            cy.get(loc.MODELO.TAGS).click()       
            cy.get(':nth-child(4) > .ant-form-item-label').click()//clicar em qualquer parte da tela

            cy.get(loc.MODELO.BTN_SALVARPROSSEGUIR).click()
            cy.get(loc.MODELO.VALIDACAOCONFTIPOARQUIVO).should('contain', 'Por favor, informe o caractere separador')

        })
        //modelo 3
        it('G - Validar campo TAG não preenchido (Campo não obrigatório)', () => {
            cy.visit('/novo')
            cy.get(loc.MODELO.NOME).type('Cadastro sem escopo modelo cy 3')
            cy.get(loc.MODELO.DESCRICAO).type('Descrição cadastro sem escopo modelo cy 3')
            cy.get(loc.MODELO.CONFIGARQUIVO).type('/////')
            
            cy.get(loc.MODELO.BTN_SALVARPROSSEGUIR).click()
            cy.get('.ant-layout-content > :nth-child(2)').should('contain', 'Cadastrar Leiaute')
            cy.get('.ant-message-custom-content').should('contain','Dados de Modelo salvos com sucesso!')
        })

        it('H - Editar Modelo utilizando Nome já utilizado (Tela de Edição)', () => {
            cy.criarModelo('Modelo testando', 'Descrição testando edicao', '|||||')
            cy.wait(1000)
            cy.criarModelo('Modelo duplicado', 'Descrição cadastro duplicado edicao', '|||||')
            cy.wait(1000)

            cy.visit('/')
            //cy.get('.ant-select-clear > .anticon > svg > path').click()
            cy.xpath(`//tbody//tr[contains(.,'Modelo testando')]`).click()
                                                                            .rightclick()
            cy.get(loc.MODELO.BTN_EDITAR).click()
            cy.wait(1000)
            cy.get(loc.MODELO.NOME).clear()
                                    .type('Modelo duplicado')
            cy.get(loc.MODELO.BTN_SALVAR).click()
            cy.get(loc.MODELO.MENSAGEMALTERACAOSIM).click()
    
            cy.get(loc.MODELO.MENSAGEMALERTA).should('contain', 'Existem erros que precisam ser tratados, verifique os erros abaixo:')
            cy.get(loc.MODELO.VALIDACAONOME).should('contain', 'Já existe um Modelo com o nome especificado')
    
        })
    
        it('I - Validar - Todos os campos sem preenchimento (Tela de Edição)', () => {
            cy.visit('/')
            //cy.get('.ant-select-clear > .anticon > svg > path').click()
            cy.xpath(`//tbody//tr[contains(.,'Cadastro modelo cy separador 1')]`).click()
                                                                            .rightclick()
            cy.get(loc.MODELO.BTN_EDITAR).click()
            cy.wait(1000)
            //cy.get('.ant-select-clear > .anticon > svg').click()
            cy.get(loc.MODELO.NOME).clear()
            cy.get(loc.MODELO.DESCRICAO).clear()
            //Esse campos ainda não são registrados em base
            // cy.get(loc.MODELO.TAGA).click()
            // cy.get(loc.MODELO.TAGS).click()
            // cy.get(':nth-child(4) > .ant-form-item-label').click()//clicar em qualquer parte da tela
            cy.get(loc.MODELO.CONFIGARQUIVO).clear()
            cy.get(loc.MODELO.BTN_SALVAR).click()
            cy.get(loc.MODELO.VALIDACAONOME).should('contain', 'Por favor, informe o Nome')
            cy.get(loc.MODELO.VALIDACAODESCRICAO).should('contain', 'Por favor, informe a Descrição')
            cy.get(loc.MODELO.VALIDACAOCONFTIPOARQUIVO).should('contain', 'Por favor, informe o caractere separador')
    
        })
    
        it('J - Validar - campo Descrição não preenchido (Tela de Edição)', () => {
            cy.visit('/')
            //cy.get('.ant-select-clear > .anticon > svg > path').click()
            cy.xpath(`//tbody//tr[contains(.,'Cadastro modelo cy separador 1')]`).click()
                                                                            .rightclick()
            cy.get(loc.MODELO.BTN_EDITAR).click()
            cy.wait(1000)
            cy.get(loc.MODELO.DESCRICAO).clear()    
            cy.get(loc.MODELO.BTN_SALVAR).click()
            cy.get(loc.MODELO.VALIDACAODESCRICAO).should('contain', 'Por favor, informe a Descrição')
        })
    
        it('K - Validar - campo Nome não preenchido (Tela de Edição)', () => {
            cy.visit('/')
             //cy.get('.ant-select-clear > .anticon > svg > path').click()
            cy.xpath(`//tbody//tr[contains(.,'Cadastro modelo cy separador 1')]`).click()
                                                                                 .rightclick()
            cy.get(loc.MODELO.BTN_EDITAR).click()
            cy.wait(1000)
            cy.get(loc.MODELO.NOME).clear()    
            cy.get(loc.MODELO.BTN_SALVAR).click()
            cy.get(loc.MODELO.VALIDACAONOME).should('contain', 'Por favor, informe o Nome')
    
        })
    
        it('L - Validar - campo tipoArquivo não preenchido (Tela de Edição)', () => {
            cy.visit('/')
             //cy.get('.ant-select-clear > .anticon > svg > path').click()
            cy.xpath(`//tbody//tr[contains(.,'Cadastro modelo cy separador 1')]`).click()
                                                                                 .rightclick()
            cy.get(loc.MODELO.BTN_EDITAR).click()
            cy.wait(1000)
            cy.get('.ant-select-clear > .anticon > svg').click()
            cy.get(loc.MODELO.BTN_SALVAR).click()
            cy.get(loc.MODELO.VALIDACAOTIPOARQUIVO).should('contain', 'Por favor, selecione um Tipo de Arquivo')
            cy.get('#cadastro-modelo-form_configArquivo').should('not.visible')
    
        })
    
        it('M - Validar - campo configArquivo não preenchido (Tela de Edição)', () => {
            cy.visit('/')
             //cy.get('.ant-select-clear > .anticon > svg > path').click()
            cy.xpath(`//tbody//tr[contains(.,'Cadastro modelo cy separador 1')]`).click()
                                                                                 .rightclick()
            cy.get(loc.MODELO.BTN_EDITAR).click()
            cy.wait(1000)
            cy.get(loc.MODELO.CONFIGARQUIVO).clear()
            cy.get(loc.MODELO.BTN_SALVAR).click()
            cy.get(loc.MODELO.VALIDACAOCONFTIPOARQUIVO).should('contain', 'Por favor, informe o caractere separador')
    
        })
    
        it('N - Validar preenchimento automático do campo Tipo de arquivo', () => {
            cy.visit('/')
            cy.wait(2000)
            // cy.get(loc.MODELO.BTN_MENU).click() 
            // cy.get(loc.MODELO.BTN_MENU_CADASTRARMODELO).click()
            cy.get(loc.MODELO.BTN_NOVO).click() 
            cy.get(loc.MODELO.TIPOARQUIVO).should('contain','Texto: Separador')
    
            cy.get(loc.MODELO.TIMELINEMODELO).should('contain', 'Modelo')
            cy.get(loc.MODELO.TIMELINELEIAUTE).should('contain', 'Leiaute')
            cy.get(loc.MODELO.TIMELINEVERSAO).should('contain', 'Versão')
            cy.get(loc.MODELO.TIMELINEBLOCO).should('contain', 'Bloco')
            cy.get(loc.MODELO.TIMELINEREGISTRO).should('contain', 'Registro')
            cy.get(loc.MODELO.TIMELINECAMPO).should('contain', 'Campo')
            cy.get(loc.MODELO.VOLTARMODELO).click()
            
            cy.get(loc.MODELO.ABAXML).click()
            cy.wait(500)
            // cy.get(loc.MODELO.BTN_MENU).click()
            // cy.get(loc.MODELO.BTN_MENU_CADASTRARMODELO).click()
            cy.get(loc.MODELO.BTN_NOVO).click() 
            cy.get(loc.MODELO.TIPOARQUIVO).should('contain','Xml')
    
            cy.get(loc.MODELO.TIMELINEMODELO).should('contain', 'Modelo')
            cy.get(loc.MODELO.TIMELINELEIAUTE).should('contain', 'Leiaute')
            cy.get(loc.MODELO.TIMELINETAG).should('contain', 'Tag')
            cy.get(loc.MODELO.VOLTARMODELO).click()
    
            cy.get(loc.MODELO.ABAEXCEL).click()
            cy.wait(500)
            cy.get(loc.MODELO.BTN_NOVO).click() 
            // cy.get(loc.MODELO.BTN_MENU).click()
            // cy.get(loc.MODELO.BTN_MENU_CADASTRARMODELO).click()
            cy.get(loc.MODELO.TIPOARQUIVO).should('contain','Xlsx')
    
            cy.get(loc.MODELO.TIMELINEMODELO).should('contain', 'Modelo')
            cy.get(loc.MODELO.TIMELINELEIAUTE).should('contain', 'Leiaute')
            cy.get(loc.MODELO.TIMELINEPLANILHA).should('contain', 'Planilha')
            cy.get(loc.MODELO.TIMELINECOLUNAS).should('contain', 'Colunas')
            cy.get(loc.MODELO.VOLTARMODELO).click()
    
            cy.get(loc.MODELO.ABAPDF).click()
            cy.wait(500)
            cy.get(loc.MODELO.BTN_NOVO).click() 
            // cy.get(loc.MODELO.BTN_MENU).click()
            // cy.get(loc.MODELO.BTN_MENU_CADASTRARMODELO).click()
            cy.get(loc.MODELO.TIPOARQUIVO).should('contain','Pdf')
    
            cy.get(loc.MODELO.TIMELINEMODELO).should('contain', 'Modelo')
            cy.get(loc.MODELO.TIMELINELEIAUTE).should('contain', 'Leiaute')
            cy.get(loc.MODELO.TIMELINEBLOCOPDF).should('contain', 'Bloco')
            cy.get(loc.MODELO.TIMELINELINHA).should('contain', 'Linha')
            cy.get(loc.MODELO.VOLTARMODELO).click()
    
            cy.get(loc.MODELO.ABATEXTO).click()
            cy.wait(1000)
    
        })

    })
        describe('3 - Validar limite máximo de caracteres', () => {
            it('A - Validar limite máximo - Campo Nome (Cadastro)', () => {
                cy.visit('/novo')
                cy.get(loc.MODELO.NOME).type('modelos de documentos fiscais e os registros da EFD-ICMS/IPI correspondentes')
                cy.get(loc.MODELO.VALIDACAONOME).should('contain', 'Tamanho máximo do campo de 50 caracteres')

            })
            //APÓS O AJUSTE DO HEBERTE NÃO É MAIS POSSÍVEL DIGITAR OU COLAR MAIS DE 150 CARACTERES
            it.skip('B - Validar limite máximo - Campo Descrição (Cadastro)', () => {
                cy.visit('/novo')
                cy.get(loc.MODELO.DESCRICAO).type('Devem ser apresentados e agrupados todos os registros do mesmo tipo existentes no período e, após o término daquele documento, na sequência, serão apresentados os demais registros.')
                cy.get(loc.MODELO.VALIDACAODESCRICAO).should('contain', 'Tamanho máximo do campo de 150 caracteres')
            })

            it('C - Validar limite máximo - Campo configArquivo (Cadastro)', () => {
                cy.visit('/novo')
                cy.get(loc.MODELO.CONFIGARQUIVO).type('||||||')
                cy.get(loc.MODELO.VALIDACAOCONFTIPOARQUIVO).should('contain', 'Tamanho máximo do campo de 5 caracteres')
    
            })

            it('D - Validar limite máximo - Campo Nome (Edição)', () => {
                cy.visit('/')
                cy.xpath(`//tbody//tr[contains(.,'Cadastro sem escopo modelo cy 3')]`).rightclick()
                cy.get(loc.MODELO.BTN_EDITAR).click()

                cy.get(loc.MODELO.NOME).type('modelos de documentos fiscais e os registros da EFD-ICMS/IPI correspondentes')
                cy.get(loc.MODELO.VALIDACAONOME).should('contain', 'Tamanho máximo do campo de 50 caracteres')

            })
            //APÓS O AJUSTE DO HEBERTE NÃO É MAIS POSSÍVEL DIGITAR OU COLAR MAIS DE 150 CARACTERES
            it.skip('E - Validar limite máximo - Campo Descrição (Edição)', () => {
                cy.visit('/')
                cy.xpath(`//tbody//tr[contains(.,'Cadastro sem escopo modelo cy 3')]`).rightclick()
                cy.get(loc.MODELO.BTN_EDITAR).click()
                cy.get(loc.MODELO.DESCRICAO).type('Devem ser apresentados e agrupados todos os registros do mesmo tipo existentes no período e, após o término daquele documento, na sequência, serão apresentados os demais registros.')
                cy.get(loc.MODELO.VALIDACAODESCRICAO).should('contain', 'Tamanho máximo do campo de 150 caracteres')
            })

            it('F - Validar limite máximo - Campo configArquivo (Cadastro)', () => {
                cy.visit('/')
                cy.xpath(`//tbody//tr[contains(.,'Cadastro sem escopo modelo cy 3')]`).rightclick()
                cy.get(loc.MODELO.BTN_EDITAR).click()
                cy.get('.ant-select-clear > .anticon > svg').click()
                cy.get(loc.MODELO.TIPOARQUIVOA).click()
                cy.get(loc.MODELO.TIPOARQUIVOSEPARADOR).click()
                cy.get(loc.MODELO.CONFIGARQUIVO).type('||||||')
                cy.get(loc.MODELO.VALIDACAOCONFTIPOARQUIVO).should('contain', 'Tamanho máximo do campo de 5 caracteres')
    
            })
        })

            describe('4 - Validar funcionamento dos Botões (tela Cadastro Modelo', () => {
                //redireciona para a página de visualização dos modelos. Nenhum campo preenchido
                it('A - Validar botão Voltar (campos vazios)', () => {
                    cy.visit('/')
                    cy.wait(200)
                    // cy.get(loc.MODELO.BTN_MENU).click()
                    cy.get(loc.MODELO.BTN_NOVO).click()
                    // cy.get('.ant-dropdown-menu > :nth-child(1)').click()
                    cy.wait(500)
                    cy.get(loc.MODELO.BTN_VOLTAR).click()
                    cy.get(loc.MODELO.NOMETELA).should('contain','Modelos')

                })
                //redireciona para a página de visualização dos modelos. Nenhum campo preenchido
                it('B - Validar botão Voltar - Não (campos preenchidos)', () => {
                    cy.visit('/')
                    cy.wait(200)
                    cy.get(loc.MODELO.BTN_MENU).click()
                    cy.get(loc.MODELO.BTN_MENU_CADASTRARMODELO).click()
                    cy.wait(200)
                    cy.get(loc.MODELO.NOME).type('Teste Nome modelo cy 1')
                    cy.get(loc.MODELO.DESCRICAO).type('Teste descrição modelo cy 1')
                    cy.get(loc.MODELO.BTN_VOLTAR).click()
                    cy.get(loc.MODELO.MENSAGEMVALIDACAO).should('contain','Tem certeza que deseja voltar?')//
                    cy.get(loc.MODELO.MENSAGEMVALIDACAONAO).click()
                    cy.get(loc.MODELO.NOME).should('have.value','Teste Nome modelo cy 1')
                    
                })

                it('C - Validar botão Voltar - Sim (campos preenchidos)', () => {
                    cy.visit('/')
                    cy.wait(200)
                    cy.get(loc.MODELO.BTN_MENU).click()
                    cy.get(loc.MODELO.BTN_MENU_CADASTRARMODELO).click()
                    cy.wait(200)
                    cy.get(loc.MODELO.NOME).type('Teste Nome modelo cy 1')
                    cy.get(loc.MODELO.DESCRICAO).type('Teste descrição modelo cy 1')
                    cy.get(loc.MODELO.BTN_VOLTAR).click()
                    cy.get(loc.MODELO.MENSAGEMVALIDACAO).should('contain','Tem certeza que deseja voltar?')//
                    cy.get(loc.MODELO.MENSAGEMCONFIRMACAOSIM).click()
                    cy.get(loc.MODELO.NOMETELA).should('contain','Modelos')
                    
                })

                it('D - Validar botão Limpar - Não (campos vazios)', () => {
                    cy.visit('/novo')
                    cy.get(loc.MODELO.BTN_LIMPAR).click()
                    cy.get(loc.MODELO.MENSAGEMVALIDACAO).should('contain','Tem certeza que deseja limpar todos os campos do formulário?')//
                    cy.get(loc.MODELO.MENSAGEMVALIDACAONAO).click()//clicar em Não
                    cy.get(loc.MODELO.NOMETELA).should('contain', 'Cadastrar Modelo')
                    
                })

                it('E - Validar botão Limpar - SIM (campos vazios)', () => {
                    cy.visit('/novo')
                    cy.get(loc.MODELO.BTN_LIMPAR).click()
                    cy.get(loc.MODELO.MENSAGEMVALIDACAO).should('contain','Tem certeza que deseja limpar todos os campos do formulário?')//
                    cy.get(loc.MODELO.MENSAGEMCONFIRMACAOSIM).click()//clicar em Não
                    cy.get('.styles__Title-sc-12b1chh-2').should('contain', 'Cadastrar Modelo')
                    
                })

                it('F - Validar botão Limpar - Não (campos preenchidos)', () => {
                    cy.visit('/novo')
                    cy.get(loc.MODELO.NOME).type('Teste Nome modelo cy 1')
                    cy.get(loc.MODELO.DESCRICAO).type('Teste descrição modelo cy 1')
                    cy.get(loc.MODELO.BTN_LIMPAR).click()
                    cy.get(loc.MODELO.MENSAGEMVALIDACAO).should('contain','Tem certeza que deseja limpar todos os campos do formulário?')//
                    cy.get(loc.MODELO.MENSAGEMVALIDACAONAO).click()//clicar em Não
                    cy.get(loc.MODELO.NOME).should('have.value','Teste Nome modelo cy 1')
                    
                })

                it('G - Validar botão Limpar - Sim (campos preenchidos)', () => {
                    cy.visit('/novo')
                    cy.get(loc.MODELO.NOME).type('Teste Nome modelo cy 1')
                    cy.get(loc.MODELO.DESCRICAO).type('Teste descrição modelo cy 1')
                    cy.get(loc.MODELO.BTN_LIMPAR).click()
                    cy.get(loc.MODELO.MENSAGEMVALIDACAO).should('contain','Tem certeza que deseja limpar todos os campos do formulário?')//
                    cy.get(loc.MODELO.MENSAGEMCONFIRMACAOSIM).click()//clicar em Não
                    cy.get('.styles__Title-sc-12b1chh-2').should('contain', 'Cadastrar Modelo')
                    cy.get(loc.MODELO.NOME).should('not.have.value','Teste Nome modelo cy 1')
                    cy.get(loc.MODELO.DESCRICAO).should('not.have.value','Teste descrição modelo cy 1')
                    
                })
                //Campo Tipo de Arquivo já está vindo preenchido
                it('H - Validar botão Cancelar - Não (campos preenchidos)', () => {
                    cy.visit('/novo')
                    cy.get(loc.MODELO.NOME).type('Teste Nome modelo cy 1')
                    cy.get(loc.MODELO.DESCRICAO).type('Teste descrição modelo cy 1')
                    cy.get(loc.MODELO.TAGA).click()
                    cy.get(loc.MODELO.TAGS).click()
                    cy.get(':nth-child(4) > .ant-form-item-label').click()//clicar em qualquer parte da tela
                    cy.get(loc.MODELO.CONFIGARQUIVO).type('||||')
                    cy.get(loc.MODELO.BTN_CAMCELAR).click()
                    cy.get(loc.MODELO.MENSAGEMVALIDACAO).should('contain','Tem certeza que deseja cancelar?')//
                    cy.get(loc.MODELO.MENSAGEMVALIDACAONAO).click()//clicar em Não
                    cy.get(loc.MODELO.NOME).should('have.value','Teste Nome modelo cy 1')
                    cy.get(loc.MODELO.DESCRICAO).should('have.value','Teste descrição modelo cy 1')
                    
                })
                //Campo Tipo de Arquivo já está vindo preenchido
                it('I - Validar botão Cancelar - SIM (campos preenchidos)', () => {
                    cy.visit('/novo')
                    cy.get(loc.MODELO.NOME).type('Teste Nome modelo cy 1')
                    cy.get(loc.MODELO.DESCRICAO).type('Teste descrição modelo cy 1')
                    cy.get(loc.MODELO.TAGA).click()
                    cy.get(loc.MODELO.TAGS).click()
                    cy.get(':nth-child(4) > .ant-form-item-label').click()//clicar em qualquer parte da tela
                    cy.get(loc.MODELO.CONFIGARQUIVO).type('|||||')
                    cy.get(loc.MODELO.BTN_CAMCELAR).click()
                    cy.get(loc.MODELO.MENSAGEMVALIDACAO).should('contain','Tem certeza que deseja cancelar?')//
                    cy.get(loc.MODELO.MENSAGEMCONFIRMACAOSIM).click()//clicar em Sim
                    cy.get(loc.MODELO.NOMETELA).should('contain', 'Modelos')
                    
                })

                it('J - Validar botão Novo - Modelos', () => {
                    cy.visit('/')
                    cy.get(loc.MODELO.BTN_NOVO).click()
                    
                    cy.get(loc.MODELO.NOMETELA).should('contain', 'Cadastrar Modelo')
                    
                })
            })               
})
                //depende do primeiro teste
                describe('5 - Validar tela Edição de Modelo', () => {                  
                    //Mudou o componente do campo descrição. Mesmo problema do campo nome.
                    it.skip('A - Editando Campo Descrição', () => {
                        cy.visit('/')
                        cy.xpath(`//table//tr[contains(.,'Cadastro modelo cy separador 1')]`).rightclick()
                    cy.get(loc.MODELO.BTN_EDITAR).click()

                        const antes = 'Descrição cadastro modelo cy 1'
                        cy.get(loc.MODELO.DESCRICAO).type(' Edita cy')
                        const apos = 'Descrição cadastro modelo cy 1 Edita cy'
                        cy.get(loc.MODELO.BTN_SALVAR).click()
                        cy.get(loc.MODELO.MENSAGEMVALIDACAO).should('contain', 'Salvar')
                        //Validando mensagem de alteração - Campo Nome após a edição
                        cy.get(':nth-child(3) > .ant-typography > code').should(($btn2) => {
                            expect($btn2.text()).to.eq(apos)
                        })
                            //Validando mensagem de alteração - Campo Nome antes da edição
                            cy.get('del').should(($msnAntes) => {
                                expect($msnAntes.text()).to.eq(antes)
                            })        
                            //cy.get(loc.MODELO.MENSAGEMVALIDACAOSIM).click()
                            cy.get('.ant-modal-confirm-btns > .ant-btn-primary').click()
                            //cy.get(loc.MODELO.NOME).should('have.value','Teste Nome cadastro modelo cy separador 1 Edita cy')
                            //cy.get('.ant-message-custom-content > :nth-child(2)').should('contain','Dados de Modelo Leiaute salvos com sucesso!')
                            cy.get('.ant-message-notice-content').should('contain','Dados de Modelo salvos com sucesso!')
                            
                            
                    })
                    //Falta implementar o Salvar e prosseguir do cadastro de leiaute
                    it('B - Editar Leiaute via grid na Edição do modelo', () => {
                        cy.criarModelo('Testando', 'Descrição', '//')
                        cy.wait(1000)
                        cy.get(loc.LEIAUTE.CODIGO).type('1111')
                        cy.get(loc.LEIAUTE.DESCRICAO).type('leiaute descricao')
                        cy.get(loc.LEIAUTE.STATUS).click()
                        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                                    .type('01/01/2025')
                                                                    .type('{enter}02/02/2025')
                                                                    .type('{enter}')
                        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
                        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
                        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')
                        cy.get(':nth-child(1) > .ant-steps-item-container > .ant-steps-item-icon').click()
                        //cy.get(loc.MODELO.VOLTARMODELO).click()
                        cy.get('.ant-table-row').click()
                                                .rightclick()
                        cy.get(loc.LEIAUTE.BTN_EDITAR).click()
                        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Editar Leiaute')

                        //EXCLUSÃO
                        cy.visit('/')
                        cy.reload()
                        cy.wait(2000)
                        cy.xpath(`//table//tr[contains(.,'Testando')]`).click()
                                                                            .rightclick()
                        cy.get(loc.MODELO.BTN_EXCLUIR).click()
                        cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Testando')
                        cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
                        cy.reload()
                        cy.xpath(`//table//tr[contains(.,'Testando')]`).should('not.exist')
                          
                    })
               
                    it('C - Modificar status do Leiaute via grid na Edição do modelo', () => {
                        cy.criarModelo('Status', 'Descrição do status', '//')
                        
                        cy.get(loc.LEIAUTE.CODIGO).type('2222')
                        cy.get(loc.LEIAUTE.DESCRICAO).type('leiaute status descricao')
                        cy.get(loc.LEIAUTE.STATUS).click()
                        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                                    .type('01/01/2025')
                                                                    .type('{enter}02/02/2025')
                                                                    .type('{enter}')
                        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
                        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
                        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')
                        cy.get(':nth-child(1) > .ant-steps-item-container > .ant-steps-item-icon').click()
                        //cy.get(loc.MODELO.VOLTARMODELO).click()
                        cy.get('.ant-table-row').click()
                                                .rightclick()
                        cy.get(loc.LEIAUTE.BTN_STATUS).click()
                        cy.get(loc.LEIAUTE.MENSAGEMVALIDACAO).should('contain', 'Modificar Status')
                        cy.get(loc.LEIAUTE.REGISTROMENSAGEMVALIDACAO).should('contain', '2222')
                        //cy.get('.ant-typography-success > code')
                        cy.get(loc.LEIAUTE.MENSAGEMALTERACAOSIM).click()
                        cy.get('.ant-table-row > :nth-child(5)').should('contain', 'Inativo')
                        cy.get('.ant-table-row').click()
                                                .rightclick()
                        cy.get(loc.LEIAUTE.BTN_STATUS).click()
                        cy.get(loc.LEIAUTE.MENSAGEMALTERACAOSIM).click()
                        cy.get('.ant-table-row > :nth-child(5)').should('contain', 'Ativo')
                        
                        //EXCLUSÃO
                        cy.visit('/')
                        cy.reload()
                        cy.wait(2000)
                        cy.xpath(`//table//tr[contains(.,'Status')]`).click()
                                                                            .rightclick()
                        cy.get(loc.MODELO.BTN_EXCLUIR).click()
                        cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Status')
                        cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
                        //cy.get('.ant-btn-dangerous').click()
                        cy.reload()
                        cy.xpath(`//table//tr[contains(.,'Status')]`).should('not.exist')
                          
                    })

                    it('D - Editar Leiaute via grid na Edição do modelo', () => {
                        cy.criarModelo('Duplicar', 'Descrição do clonar', '//')
                        
                        cy.get(loc.LEIAUTE.CODIGO).type('3333')
                        cy.get(loc.LEIAUTE.DESCRICAO).type('leiaute clonar descricao')
                        cy.get(loc.LEIAUTE.STATUS).click()
                        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                                    .type('01/01/2025')
                                                                    .type('{enter}02/02/2025')
                                                                    .type('{enter}')
                        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
                        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
                        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')
                        cy.get(':nth-child(1) > .ant-steps-item-container > .ant-steps-item-icon').click()
                        //cy.get(loc.MODELO.VOLTARMODELO).click()
                        cy.get('.ant-table-row').click()
                                                .rightclick()
                        cy.get(loc.LEIAUTE.BTN_CLONAR).click()
                        cy.get(loc.LEIAUTE.MENSAGEMVALIDACAO).should('contain', 'Deseja clonar o registro')
                        cy.get(loc.LEIAUTE.REGISTROMENSAGEMVALIDACAO).should('contain', '3333')
                        cy.get(loc.LEIAUTE.MENSAGEMALTERACAOSIM).click()
                        cy.xpath(`//tbody//tr[contains(.,'3334')]`).should('contain', '3334')
                        cy.xpath(`//tbody//tr[contains(.,'3334')]`).should('contain', 'Inativo')
                    
                        //EXCLUSÃO
                        cy.visit('/')
                        cy.reload()
                        cy.wait(2000)
                        cy.xpath(`//tbody//tr[contains(.,'Duplicar')]`).click()
                                                                            .rightclick()
                        cy.get(loc.MODELO.BTN_EXCLUIR).click()
                        cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Duplicar')
                        cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
                        cy.reload()
                        cy.xpath(`//tbody//tr[contains(.,'Duplicar')]`).should('not.exist')
                          
                    })

                    it('F - Excluir Leiaute via grid na Exclusão do modelo', () => {
                        cy.criarModelo('Excluir', 'Descrição do excluir', '//')
                        
                        cy.get(loc.LEIAUTE.CODIGO).type('4444')
                        cy.get(loc.LEIAUTE.DESCRICAO).type('leiaute excluir descricao')
                        cy.get(loc.LEIAUTE.STATUS).click()
                        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                                    .type('01/01/2025')
                                                                    .type('{enter}02/02/2025')
                                                                    .type('{enter}')
                        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
                        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
                        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')
                        cy.get(':nth-child(1) > .ant-steps-item-container > .ant-steps-item-icon').click()
                        //cy.get(loc.MODELO.VOLTARMODELO).click()
                        cy.get('.ant-table-row').click()
                                                .rightclick()
                        
                        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
                        cy.get(loc.LEIAUTE.MENSAGEMVALIDACAO).should('contain', 'Tem certeza que deseja excluir o registro')
                        cy.get(loc.LEIAUTE.REGISTROMENSAGEMVALIDACAOEXCLUIR).should('contain', '4444')
                        cy.wait(2000)
                        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
                        cy.xpath(`//tbody//tr[contains(.,'4444')]`).should('not.exist')
                        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','O registro Leiaute foi excluído com sucesso!')
                        
                        //EXCLUSÃO
                        cy.visit('/')
                        cy.reload()
                        cy.wait(2000)
                        cy.xpath(`//tbody//tr[contains(.,'Excluir')]`).click()
                                                                            .rightclick()
                        cy.get(loc.MODELO.BTN_EXCLUIR).click()
                        cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Excluir')
                        cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
                        cy.wait(1000)
                        cy.xpath(`//tbody//tr[contains(.,'Excluir')]`).should('not.exist')
                          
                    })




                    it.skip('Editando Campo Nome', () => {
                        cy.visit('/')
                        cy.xpath(`//table//tr[contains(.,'Teste Nome cadastro modelo cy separador 1')]`).rightclick()
                        cy.get(loc.MODELO.BTN_EDITAR).click()

                        const antes = 'Teste Nome cadastro modelo cy separador 1'
                        cy.get(loc.MODELO.NOME).type(' Edita cy')
                        const apos = 'Teste Nome cadastro modelo cy separador 1 Edita cy'
                        cy.get(loc.MODELO.BTN_SALVAR).click()
                        cy.get(loc.MODELO.MENSAGEMVALIDACAO).should('contain', 'Confirmar Alterações')
                        //Validando mensagem de alteração - Campo Nome após a edição
                        cy.get(':nth-child(3) > .ant-typography > code').should(($btn2) => {
                            expect($btn2.text()).to.eq(apos)
                        })
                            //Validando mensagem de alteração - Campo Nome antes da edição
                            cy.get('del').should(($msnAntes) => {
                                expect($msnAntes.text()).to.eq(antes)
                            })        
                            cy.get(loc.MODELO.MENSAGEMVALIDACAOSIM).click()
                            //cy.get(loc.MODELO.NOME).should('have.value','Teste Nome cadastro modelo cy separador 1 Edita cy')
                            cy.get('.ant-message-custom-content > :nth-child(2)').should('contain','Dados de Modelo Leiaute salvos com sucesso!')   
                    })
                    //Não consegui ainda implementar ainda esse cenário
                    it.skip('Editando Campo Configuração do Tipo de Arquivo', () => {
                        cy.visit('/')
                        cy.xpath(`//table//tr[contains(.,'Teste Nome cadastro modelo cy separador 1 Edita cy')]`).rightclick()
                        cy.get(loc.MODELO.BTN_EDITAR).click()

                        const antes = '|||||'
                        cy.get(loc.MODELO.CONFIGARQUIVO).clear()
                        .type('##')
                        const apos = '##'
                        cy.get(loc.MODELO.BTN_SALVAR).click()
                        cy.get(loc.MODELO.MENSAGEMVALIDACAO).should('contain', 'Confirmar Alterações')
                        //Validando mensagem de alteração - Campo Nome após a edição
                        cy.get(':nth-child(3) > .ant-typography > code').should(($btn2) => {
                            expect($btn2.text()).to.eq(apos)
                        })
                            //Validando mensagem de alteração - Campo Nome antes da edição
                            cy.get('del').should(($msnAntes) => {
                                expect($msnAntes.text()).to.eq(antes)
                            })        
                            cy.get(loc.MODELO.MENSAGEMVALIDACAOSIM).click()
                            //cy.get(loc.MODELO.NOME).should('have.value','Teste Nome cadastro modelo cy separador 1 Edita cy')
                            cy.get('.ant-message-custom-content > :nth-child(2)').should('contain','Dados de Modelo Leiaute salvos com sucesso!')
                            
                    })

                    it.skip('Editando Campo Tipo de Arquivo', () => {
                        cy.visit('/')
                        cy.xpath(`//table//tr[contains(.,'Teste Nome cadastro modelo cy separador 1 Edita cy')]`).rightclick()
                        cy.get(loc.MODELO.BTN_EDITAR).click()

                        cy.get(loc.MODELO.TIPOARQUIVO).then(($descricaoantes) => {
                            // Armazenando a descrição anterior a edição na variável abaixo
                            const antes = $descricaoantes.text()
                            console.log(antes)
                            
                            cy.get('#cadastro-modelo-form_tipoArquivo')
                            .select('Texto: Separador')


                            /* cy.get('del').should(($msnAntes) => {
                                expect($msnAntes.text()).to.eq(antes)
                            }) */
                        })
                    
                    
                    })

                })
                    describe('6 - Ordenação das grids', () => {
                        it('A - Validar a ordenação da grid de visualização dos modelos (Nome)', () => {
                            cy.visit('/')

                            cy.SortClassificacoes(1)

                            // cy.visit('https://conta.e-auditoria.com.br/Login')

                            // cy.get('#Email').type('rayner.losque@e-auditoria.com.br ')
                            // cy.get('#Senha').type('1q2w3e')
                            // cy.get('#lnkLogin').click()
                            // cy.get('.erecuperador > .flipper > .front > .btn').click()
                            // cy.get(':nth-child(1) > .react-card-flipper > .react-card-front > .sc-crrsfI > .text-center > .ant-btn').click()
                            // cy.wait(2000)
                            // cy.get(':nth-child(1) > .react-card-flipper > .react-card-front > .sc-crrsfI > .text-center > .ant-btn').click()
                            // cy.wait(2000)
                            // cy.get(':nth-child(1) > .react-card-flipper > .react-card-front > .sc-crrsfI > .text-center > .ant-btn').click()
                            
                           // .ant-table-cell-ellipsis > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > :nth-child(1)
                           // :nth-child(1) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > :nth-child(1)

                        })

                        it.skip('B - Validar a ordenação da grid de visualização dos modelos (Tipo de Arquivo)', () => {
                            cy.visit('/')

                            cy.SortClassificacoes(2)

                        })

                    })


                        describe('7 - Validando a exclusão dos modelos', () => {

                            it('A - Excluindo o modelo clonado 1 (1 - D)', () => {
                                cy.visit('/')
                                cy.reload()
                                cy.xpath(`//tbody//tr[contains(.,'Clonar modelo 1')]`).click()
                                                                                    .rightclick()
                                cy.get(loc.MODELO.BTN_EXCLUIR).click()
                                cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Clonar modelo 1')
                                cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
                                cy.reload()
                                cy.xpath(`//tbody//tr[contains(.,'Clonar modelo 1')]`).should('not.exist')
                                
                                //cy.get('.ant-message-custom-copor ntent > :nth-child(2)').should('contain','O registro')
                                // cy.get('.ant-message-custom-copor ntent > :nth-child(2)').should('contain','O modelo foi excluido com sucesso!')
                            })

                            it('B - Excluindo o modelo clonado (1 - D)', () => {
                                cy.visit('/')
                                cy.xpath(`//tbody//tr[contains(.,'Clonar modelo')]`).click()
                                                                                .rightclick()
                                cy.get(loc.MODELO.BTN_EXCLUIR).click()
                                cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Clonar modelo')
                                cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
                                cy.reload()
                                cy.xpath(`//tbody//tr[contains(.,'Clonar modelo')]`).should('not.exist')
                                
                                //cy.get('.ant-message-custom-copor ntent > :nth-child(2)').should('contain','O registro')
                                // cy.get('.ant-message-custom-copor ntent > :nth-child(2)').should('contain','O modelo foi excluido com sucesso!')
                            })
                            
                            it('C - Excluindo o modelo cadastrado no cenário (1 - A)', () => {
                                cy.visit('/')
                                cy.xpath(`//tbody//tr[contains(.,'Cadastro modelo cy separador 1')]`).click()
                                                                                                .rightclick()
                                cy.get(loc.MODELO.BTN_EXCLUIR).click()
                                cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Cadastro modelo cy separador 1')
                                cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
                                cy.xpath(`//tbody//tr[contains(.,'Cadastro modelo cy separador 1')]`).should('not.exist')
                            
                                //cy.get('.ant-message-custom-content > :nth-child(2)').should('contain','O modelo foi excluido com sucesso!')
                            })

                            it('D - Excluindo o modelo cadastrado no cenário (1 - B)', () => {
                                cy.visit('/')
                                cy.xpath(`//tbody//tr[contains(.,'Cadastro modelo posicionamento cy 2')]`).click()
                                                                                                    .rightclick()
                                cy.get(loc.MODELO.BTN_EXCLUIR).click()
                                cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Cadastro modelo posicionamento cy 2')
                                cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
                                cy.xpath(`//tbody//tr[contains(.,'Cadastro modelo posicionamento cy 2')]`).should('not.exist')
                                
                                //cy.get('.ant-message-custom-copor ntent > :nth-child(2)').should('contain','O registro')
                                // cy.get('.ant-message-custom-copor ntent > :nth-child(2)').should('contain','O modelo foi excluido com sucesso!')
                            })
                            
                            it('E - Excluindo o modelo cadastrado no cenário (2 - A)', () => {
                                cy.visit('/')
                                cy.xpath(`//tbody//tr[contains(.,'IPI Modelo')]`).click()
                                                                                .rightclick()
                                cy.get(loc.MODELO.BTN_EXCLUIR).click()
                                cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('IPI Modelo')
                                cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
                                cy.xpath(`//tbody//tr[contains(.,'IPI Modelo')]`).should('not.exist')
                                
                                //cy.get('.ant-message-custom-copor ntent > :nth-child(2)').should('contain','O registro')
                                // cy.get('.ant-message-custom-copor ntent > :nth-child(2)').should('contain','O modelo foi excluido com sucesso!')
                            })

                            it('F - Excluindo o modelo cadastrado no cenário (2 - G)', () => {
                                cy.visit('/')
                                cy.xpath(`//tbody//tr[contains(.,'Cadastro sem escopo modelo cy 3')]`).click()
                                                                                                .rightclick()
                                cy.get(loc.MODELO.BTN_EXCLUIR).click()
                                cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Cadastro sem escopo modelo cy 3')
                                cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
                                cy.wait(500)
                                cy.xpath(`//tbody//tr[contains(.,'Cadastro sem escopo modelo cy 3')]`).should('not.exist')
                                
                                // //cy.get('.ant-message-custom-content > :nth-child(2)').should('contain','O modelo foi excluido com sucesso!')
                            })

                            it('G - Excluindo o modelo cadastrado no cenário (2 - H)', () => {
                                cy.visit('/')
                                cy.xpath(`//tbody//tr[contains(.,'Modelo testando')]`).click()
                                                                                                .rightclick()
                                cy.get(loc.MODELO.BTN_EXCLUIR).click()
                                cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo testando')
                                cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
                                cy.wait(500)
                                cy.xpath(`//tbody//tr[contains(.,'Modelo testando')]`).should('not.exist')
                                
                                // //cy.get('.ant-message-custom-content > :nth-child(2)').should('contain','O modelo foi excluido com sucesso!')
                            })

                            it('H - Excluindo o modelo cadastrado no cenário (2 - H)', () => {
                                cy.visit('/')
                                cy.xpath(`//tbody//tr[contains(.,'Modelo duplicado')]`).click()
                                                                                                .rightclick()
                                cy.get(loc.MODELO.BTN_EXCLUIR).click()
                                cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo duplicado')
                                cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
                                cy.wait(500)
                                cy.xpath(`//tbody//tr[contains(.,'Modelo duplicado')]`).should('not.exist')
                                
                                // //cy.get('.ant-message-custom-content > :nth-child(2)').should('contain','O modelo foi excluido com sucesso!')
                            })
                        })


                        it.skip('B - denação da grid de visualização dos modelos (Tipo de Arquivo)', () => {
                         
                        cy.visit('/')
                        cy.xpath(`//tbody//tr[contains(.,'Clonar modelo')]`).click()
                        .rightclick()
      })
    /* arquivo Cypress.json

    "viewportWidth": 1152,
    "viewportHeight": 864,
    
    "baseUrl": "https://gestaoleiauteteste.e-auditoria.com.br/modelo",
   
    "reporter": "cypress-multi-reporters",
    "reporterOptions": {
        "reporterEnabled": "mochawesome",
        "mochawesomeReporterOptions": {
            "reportDir": "cypress/reports/mocha",
            "quite": true,
            "overwrite": false,
            "html": false,
            "json": true
        }
    }
    */