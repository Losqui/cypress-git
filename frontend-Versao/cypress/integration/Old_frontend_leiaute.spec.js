import loc from '../support/locators'



describe('1 - Cadastro de modelo', () => {
   
    it('Primeira execução', () => {
        cy.visit('/novo')
        cy.get('.ant-select-clear > .anticon > svg').click()
        cy.get(loc.MODELO.NOME).type('Cadastro modelo cy separador 1')
        cy.get(loc.MODELO.DESCRICAO).type('Descrição cadastro modelo cy 1')
        cy.reload()
    })

    it('A - Cadastrar Leiaute', () => {
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

    })

    it.skip('A - Excluindo o Leiaute (1 - A)', () => {
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
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('11111')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'11111')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modeloum')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modeloum')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modeloum')]`).should('not.exist')
        cy.excluirModelo('Modeloum')
        
    })

    it('B - Cadastrar Leiaute e não preencher a vigência fim', () => {
        cy.criarModelo('Modelovigenciafim', 'descrição do modelo um', '//')

        cy.wait(3000)
        
        
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.CODIGO).type('74108')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
                                                    
       
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

    })

    it('B - Excluindo o Leiaute (1 - B)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelovigenciafim')
        .type('{enter}')

        cy.xpath(`//tbody//tr[contains(.,'Modelovigenciafim')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()
        cy.wait(2000)

        cy.get(loc.LEIAUTE.BUSCAR).type('74108')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'74108')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        
        cy.get(loc.LEIAUTE.BUSCAR).type('74108')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'74108')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelovigenciafim')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelovigenciafim')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelovigenciafim')]`).should('not.exist')
                
        cy.excluirModelo('Modelovigenciafim')
    })

    it('C - Validar o nome das telas', () => {
        cy.criarModelo('Modelo dois', 'descrição do modelo dois', '//')

     
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Leiaute')
        cy.get(loc.LEIAUTE.CODIGO).type('22222')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('03/02/2025')
                                                    .type('{enter}02/03/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()

        cy.get(loc.VERSAO.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Editar Leiaute')

      
    })

    it('C - Excluindo o Leiaute (1 - C)', () => {
        cy.visit('/')
        cy.reload()
        cy.get(loc.MODELO.BUSCAR).type('Modelo dois')
        .type('{enter}')

        cy.xpath(`//tbody//tr[contains(.,'Modelo dois')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('22222')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'22222')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('22222')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'22222')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dois')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo dois')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dois')]`).should('not.exist')
        
        cy.excluirModelo('Modelo dois')  
        
    })

})

describe('2 - Validação de campos - Cadastro de leiaute', () => {
    //EA-122 - Campo código não está sendo destacado e não apresenta mensagem de validação.
    it.skip('A - Cadastrar Leiaute utilizando Código já utilizado (Tela de Cadastro)', () => {

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

        cy.get(loc.VERSAO.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()
        cy.get('#filtro-simples-btn-cadastrar-leiaute').click()
        //cy.get(loc.MODELO.BTN_NOVO).click()

        cy.get(loc.LEIAUTE.CODIGO).type('33333')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute duplicado')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('02/03/2025')
                                                    .type('{enter}02/04/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        

        cy.get(loc.MODELO.MENSAGEMALERTA).should('contain', 'Existem erros que precisam ser tratados, verifique os erros abaixo:')
        cy.get(loc.MODELO.VALIDACAONOME).should('contain', 'Já existe um Modelo com o nome especificado')

    })

    it('B - Validar - Todos os campos sem preenchimento (Tela de Cadastro)', () => {
        cy.criarModelo('Modelo quatro', 'descrição do modelo quatro', '//')

        cy.wait(1000)
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.VALIDACAOCODIGO).should('contain', 'Por favor, informe o Código do Leiaute')
        cy.get(loc.LEIAUTE.VALIDACAODESCRICAO).should('contain', 'Por favor, informe a Descrição')
        cy.get(loc.LEIAUTE.VALIDACAOVIGENCIA).should('contain', 'Por favor, informe o Início da Vigência')
        cy.get(loc.LEIAUTE.VAILIDACAOSTATUS).should('contain', 'Por favor, informe o Status')

    })

    it('E - Excluindo o Leiaute (2 - B)', () => {
        // cy.visit('/')
        // cy.reload()
       
        // cy.xpath(`//tbody//tr[contains(.,'Modelo quatro')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo quatro')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo quatro')]`).should('not.exist')

        cy.excluirModelo('Modelo quatro')
            
    })

    it('C - Validar - campo Código não preenchido (Tela de Cadastro)', () => {
        cy.criarModelo('Modelo cinco', 'descrição do modelo cinco', '//')

        cy.wait(3000)
        
        //cy.get(loc.LEIAUTE.CODIGO).type('11111')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.VALIDACAOCODIGO).should('contain', 'Por favor, informe o Código do Leiaute')
    })

    it('F - Excluindo o Leiaute (2 - C)', () => {
        // cy.visit('/')
        // cy.reload()
       
        // cy.xpath(`//tbody//tr[contains(.,'Modelo cinco')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo cinco')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo cinco')]`).should('not.exist')
            
        cy.excluirModelo('Modelo cinco')
    })

    it('D - Validar - campo Descrição não preenchido (Tela de Cadastro)', () => {
        cy.criarModelo('Modelo sexto', 'descrição do modelo sexto', '//')

        cy.wait(3000)
        
        cy.get(loc.LEIAUTE.CODIGO).type('66666')
        //cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.VALIDACAODESCRICAO).should('contain', 'Por favor, informe a Descrição')
    })

    it('G - Excluindo o Leiaute (2 - D)', () => {
        // cy.visit('/')
        // cy.reload()
       
        // cy.xpath(`//tbody//tr[contains(.,'Modelo sexto')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo sexto')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo sexto')]`).should('not.exist')

        cy.excluirModelo('Modelo sexto')
            
    })

    it('E - Validar - campo Status não preenchido (Tela de Cadastro)', () => {
        cy.criarModelo('Modelo sete', 'descrição do modelo sete', '//')

        cy.wait(3000)
        
        cy.get(loc.LEIAUTE.CODIGO).type('77777')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        //cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.VAILIDACAOSTATUS).should('contain', 'Por favor, informe o Status')
    })

    it('H - Excluindo o Leiaute (2 - E)', () => {
        // cy.visit('/')
        // cy.reload()
       
        // cy.xpath(`//tbody//tr[contains(.,'Modelo sete')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo sete')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo sete')]`).should('not.exist')

        cy.excluirModelo('Modelo sete')
            
    })

    it('F - Validar - campo Vigência não preenchido (Tela de Cadastro)', () => {
        cy.criarModelo('Modelo oito', 'descrição do modelo oito', '//')

        cy.wait(3000)
        
        cy.get(loc.LEIAUTE.CODIGO).type('88888')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        // cy.get('#cadastro-leiaute-form_vigencia').click()
        //                                             .type('01/01/2025')
        //                                             .type('{enter}02/02/2025')
        //                                             .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.VALIDACAOVIGENCIA).should('contain', 'Por favor, informe o Início da Vigência')
    })

    it('I - Excluindo o Leiaute (2 - F)', () => {
        // cy.visit('/')
        // cy.reload()
       
        // cy.xpath(`//tbody//tr[contains(.,'Modelo oito')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo oito')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo oito')]`).should('not.exist')
            
        cy.excluirModelo('Modelo oito')
    })

    it('G - Validar - campo Vigência Fim não preenchido (Tela de Cadastro)', () => {
        cy.criarModelo('Modelo nove', 'descrição do modelo nove', '//')
        cy.wait(3000) 
        
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.CODIGO).type('99999')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.VERSAO.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()
        cy.xpath(`//tbody//tr[contains(.,'01/01/2025 até hoje')]`).should('not.exist')
        
    })

    it('J - Excluindo o Leiaute (2 - G)', () => {
        cy.visit('/')
        cy.reload()
        cy.get(loc.MODELO.BUSCAR).type('Modelo nove')
        .type('{enter}')

        cy.xpath(`//tbody//tr[contains(.,'Modelo nove')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('99999')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'99999')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('99999')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'99999')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BUSCAR).type('Modelo nove')
        // .type('{enter}')
        // cy.xpath(`//tbody//tr[contains(.,'Modelo nove')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo nove')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.get(loc.MODELO.BUSCAR).type('Modelo nove')
        // .type('{enter}')
        // cy.xpath(`//tbody//tr[contains(.,'Modelo nove')]`).should('not.exist')
        cy.excluirModelo('Modelo nove')
            
    })
    //EA-123 Esse cenário não precisa ser executado.
    it.skip('H - Validar Leiaute Passando um valor Não numerico no campo Código (Campo deve aceitar apenas valores Numéricos)', () => {
        cy.criarModelo('Modelo dez', 'descrição do modelo dez', '//')

        cy.wait(3000)
        
        cy.get(loc.LEIAUTE.CODIGO).type('e')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.VALIDACAOCODIGO).should('contain', 'Por favor, informe o Código do Leiaute')

    }) 
    //EA-122 Backlog
    it.skip('I - Validar um Leiaute onde o período de vigência coincide com outro já cadastrado (Existe um conflito de vigência com outro leiaute cadastrado)', () => {
           
        cy.criarModelo('Modelo onze', 'descrição do modelo onze', '//')

        cy.wait(3000)
        
        cy.get(loc.LEIAUTE.CODIGO).type('110011')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

        cy.get(loc.VERSAO.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.BTN_NOVO).click()

        cy.get(loc.LEIAUTE.CODIGO).type('112211')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('11/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.VALIDACAOVIGENCIA).should('contain', 'Existe um conflito de vigência com outro leiaute cadastrado')
        cy.get(loc.LEIAUTE.MENSAGEMALERTA).should('contain', 'Existem erros que precisam ser tratados, verifique os erros abaixo:')
    })
    //Ao usuário cadastrar outro leiaute com data inicial (campo ‘de’) maior que o leiaute cujo data
    //final (campo 'a') tiver preenchido com null deve alterar o valor null para a data inicial -1 dia
    //informada no outro leiaute. (OBS: Não deve existir mais de um cadastro com a data final null)
    it('J - Validar (se Data fim = null, deve ser substituída pela data início do novo leiaute)', () => {
        cy.criarModelo('Modelo doze', 'descrição do modelo doze', '//')

        cy.wait(3000)

        
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('03/01/2025')
                                                    .type('{enter}')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.CODIGO).type('121212')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()

        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.VERSAO.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.BTN_NOVO).click()

        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('03/06/2025')
                                                    .type('{enter}03/10/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.CODIGO).type('121312')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.VERSAO.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()
        cy.xpath(`//tbody//tr[contains(.,'03/01/2025 até 02/06/2025')]`).should('exist')

    })

    it('K - Excluindo o Leiaute (2 - J)', () => {
        cy.visit('/')
        cy.reload()
        cy.get(loc.MODELO.BUSCAR).type('Modelo doze')
        .type('{enter}')

        cy.xpath(`//tbody//tr[contains(.,'Modelo doze')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()
        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('121212')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'121212')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('121212')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'121212')]`).should('not.exist')

        cy.get(loc.LEIAUTE.BUSCAR).clear()
                                    .type('121312')
                                    .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'121312')]`).click()
                                                    .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()

        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('121312')
                                    .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'121312')]`).should('not.exist')

        cy.excluirModelo('Modelo doze')

        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo doze')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo doze')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo doze')]`).should('not.exist')
            
    })

     //EA-122 - Tarefa foi criada no backlog, mas no dia seguinte esse funcionalidade subiu pra o ambiente de teste
     //Campo código não está sendo destacado e não apresenta mensagem de validação.
    it('K - Editar Leiaute utilizando Código já utilizado (Tela de Edição)', () => {

        cy.criarModelo('Modelo treze', 'descrição do modelo treze', '//')

        cy.wait(3000)
        
        cy.get(loc.LEIAUTE.CODIGO).type('131313')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

        cy.get(loc.VERSAO.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()

        cy.get('#filtro-simples-btn-cadastrar-leiaute').click()
        // //cy.get(loc.MODELO.BTN_NOVO).click()

        cy.get(loc.LEIAUTE.CODIGO).type('130013')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('04/02/2025')
                                                    .type('{enter}02/05/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

        cy.get(loc.VERSAO.BTN_VOLTAR).click()

        cy.get(loc.LEIAUTE.CODIGO).clear()
                                    .type('131313')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMALTERACAOSIM).click()
        
        cy.get(loc.MODELO.MENSAGEMALERTA).should('contain', 'Existem erros que precisam ser tratados, verifique os erros abaixo:')
        cy.get(loc.MODELO.VALIDACAONOME).should('contain', 'Já existe um Leiaute com este código')

    })

    it('L - Excluindo o Leiaute (2 - K)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo treze')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo treze')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()
        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('131313')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'131313')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('131313')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'131313')]`).should('not.exist')

        cy.get(loc.LEIAUTE.BUSCAR).clear()
                                    .type('130013')
                                    .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'130013')]`).click()
        .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()

        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('130013')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'130013')]`).should('not.exist')

        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo treze')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo treze')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo treze')]`).should('not.exist')

        cy.excluirModelo('Modelo treze')
            
    })

    it('L - Editar - Todos os campos sem preenchimento (Tela de Edição)', () => {
        cy.criarModelo('Modelo quatorze', 'descrição do modelo quatorze', '//')

        cy.wait(3000)
        
        cy.get(loc.LEIAUTE.CODIGO).type('141414')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

        cy.get(loc.VERSAO.BTN_VOLTAR).click()

        cy.get(loc.LEIAUTE.CODIGO).clear()
        cy.get(loc.LEIAUTE.DESCRICAO).clear()
        cy.get('#cadastro-leiaute-form_vigencia').click()
        cy.get(':nth-child(1) > .ant-tag').click()
        
        cy.get(loc.LEIAUTE.VALIDACAOCODIGO).should('contain', 'Por favor, informe o Código do Leiaute')
        cy.get(loc.LEIAUTE.VALIDACAODESCRICAO).should('contain', 'Por favor, informe a Descrição')
        cy.get(loc.LEIAUTE.VALIDACAOVIGENCIA).should('contain', 'Por favor, informe o Início da Vigência')
        
    })

    it('M - Excluindo o Leiaute (2 - L)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo quatorze')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo quatorze')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('141414')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'141414')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('141414')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'141414')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo quatorze')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo quatorze')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo quatorze')]`).should('not.exist')
            
        cy.excluirModelo('Modelo quatorze')

    })

    it('M - Editar - campo Código não preenchido (Tela de Edição)', () => {
        cy.criarModelo('Modelo quinze', 'descrição do modelo quinze', '//')

        cy.wait(3000)
        
        cy.get(loc.LEIAUTE.CODIGO).type('151515')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

        cy.get(loc.VERSAO.BTN_VOLTAR).click()

        cy.get(loc.LEIAUTE.CODIGO).clear()
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.VALIDACAOCODIGO).should('contain', 'Por favor, informe o Código do Leiaute')
    })

    it('N - Excluindo o Leiaute (2 - M)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo quinze')
        .type('{enter}')

        cy.xpath(`//tbody//tr[contains(.,'Modelo quinze')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('151515')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'151515')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('151515')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'151515')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo quinze')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo quinze')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo quinze')]`).should('not.exist')

        cy.excluirModelo('Modelo quinze')
            
    })

    it('N - Editar - campo Descrição não preenchido (Tela de Edição)', () => {
        cy.criarModelo('Modelo dezeseis', 'descrição do modelo dezeseis', '//')

        cy.wait(3000)
        
        cy.get(loc.LEIAUTE.CODIGO).type('161616')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

        cy.get(loc.VERSAO.BTN_VOLTAR).click()
        
        cy.get(loc.LEIAUTE.DESCRICAO).clear()
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.VALIDACAODESCRICAO).should('contain', 'Por favor, informe a Descrição')
    })

    it('O - Excluindo o Leiaute (2 - N)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo dezeseis')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo dezeseis')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('161616')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'161616')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('161616')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'161616')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezeseis')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo dezeseis')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezeseis')]`).should('not.exist')
            
        cy.excluirModelo('Modelo dezeseis')
    })

    it('O - Editar - campo Vigência não preenchido (Tela de Edição)', () => {
        cy.criarModelo('Modelo dezessete', 'descrição do modelo dezessete', '//')

        cy.wait(3000)
        
        cy.get(loc.LEIAUTE.CODIGO).type('171717')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

        cy.get(loc.VERSAO.BTN_VOLTAR).click()
        
        cy.get('#cadastro-leiaute-form_vigencia').click()
        cy.get(':nth-child(1) > .ant-tag').click()
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.VALIDACAOVIGENCIA).should('contain', 'Por favor, informe o Início da Vigência')
    })

    it('P - Excluindo o Leiaute (2 - O)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo dezessete')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo dezessete')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('171717')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'171717')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('171717')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'171717')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezessete')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo dezessete')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezessete')]`).should('not.exist')

        cy.excluirModelo('Modelo dezessete')
            
    })

    it('P - Editar - campo Vigência Fim não preenchido (Tela de Edição)', () => {
        cy.criarModelo('Modelo dezoito', 'descrição do modelo dezoito', '//')
        cy.wait(3000) 

        cy.get(loc.LEIAUTE.CODIGO).type('181818')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

        cy.get(loc.VERSAO.BTN_VOLTAR).click()

        cy.get('#cadastro-leiaute-form_vigencia').click()
        cy.get(':nth-child(1) > .ant-tag').click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                .type('01/01/2025')
                                                .type('{enter}')
                                                .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMALTERACAOSIM).click()
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()
        cy.xpath(`//tbody//tr[contains(.,'01/01/2025 até hoje')]`).should('not.exist')
        
    })

    it('Q - Excluindo o Leiaute (2 - P)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo dezoito')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo dezoito')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('181818')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'181818')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()

        cy.get(loc.LEIAUTE.BUSCAR).type('181818')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'181818')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezoito')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo dezoito')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezoito')]`).should('not.exist')

        cy.excluirModelo('Modelo dezoito')
            
    })

    it('Q - Editar um Leiaute onde o período de vigência coincide com outro já cadastrado (Existe um conflito de vigência com outro leiaute cadastrado)', () => {
        cy.criarModelo('Modelo dezenove', 'descrição do modelo dezenove', '//')

        cy.wait(3000)
        
        cy.get(loc.LEIAUTE.CODIGO).type('191919')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

        cy.get(loc.VERSAO.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.BTN_NOVO).click()



        cy.get(loc.LEIAUTE.CODIGO).type('199119')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('09/03/2024')
                                                    .type('{enter}02/04/2024')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

        cy.get(loc.VERSAO.BTN_VOLTAR).click()

        cy.get('#cadastro-leiaute-form_vigencia').click()
        cy.get(':nth-child(1) > .ant-tag').click()        

        cy.get('#cadastro-leiaute-form_vigencia').click()
                                            .type('11/01/2025')
                                            .type('{enter}02/02/2025')
                                            .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMALTERACAOSIM).click()
        cy.get(loc.LEIAUTE.VALIDACAOVIGENCIA).should('contain', 'Existe um conflito de vigência com outro leiaute cadastrado')
        cy.get(loc.LEIAUTE.MENSAGEMALERTA).should('contain', 'Existem erros que precisam ser tratados, verifique os erros abaixo:')
    })

    it('R - Excluindo o Leiaute (2 - Q)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo dezenove')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo dezenove')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('191919')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'191919')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('191919')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'191919')]`).should('not.exist')

        cy.get(loc.LEIAUTE.BUSCAR).clear()
                                    .type('199119')
                                    .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'199119')]`).click()
                                                     .rightclick()   
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()

        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('199119')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'199119')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezenove')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo dezenove')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezenove')]`).should('not.exist')
            cy.excluirModelo('Modelo dezenove')
    })

    it('R - Validar (se 2 leiautes com Data fim = null, o primeiro deve ter data fim substituída pela data início do novo leiaute)', () => {
        cy.criarModelo('Modelo20', 'descrição do Modelo20', '//')

        cy.wait(3000)

       
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('03/01/2025')
                                                    .type('{enter}')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.CODIGO).type('202020')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.VERSAO.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.BTN_NOVO).click()

        
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('03/06/2025')
                                                    .type('{enter}')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.CODIGO).type('202120')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.VERSAO.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()
        cy.xpath(`//tbody//tr[contains(.,'03/01/2025 até 02/06/2025')]`).should('exist')





        // cy.get('#cadastro-leiaute-form_vigencia').click()
        // .type('03/06/2025')
        // .type('{enter}03/10/2025')
        // .type('{enter}')
    })

    it('S - Excluindo o Leiaute (2 - R)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo20')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo20')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('202020')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'202020')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('202020')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'202020')]`).should('not.exist')

        cy.get(loc.LEIAUTE.BUSCAR).clear()
                                    .type('202120')
                                    .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'202120')]`).click()
        .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()

        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('202120')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'202120')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo20')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo20')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo20')]`).should('not.exist')
            cy.excluirModelo('Modelo20')
    })

})

describe('3 - Validar limite máximo de caracteres', () => {

    it('A - Validar limite máximo - Campo Código (Cadastro)', () => {
        cy.criarModelo('Modelo vinteum', 'descrição do modelo vinteum', '//')

        cy.wait(3000)

        cy.get(loc.LEIAUTE.CODIGO).type('21212121465434140440198976104794413164648794817641748946156489412154')
        cy.get(loc.LEIAUTE.VALIDACAOCODIGO).should('contain', 'Tamanho máximo do campo de 50 caracteres')

    })

    it('T - Excluindo o Leiaute (3 - A)', () => {
        // cy.visit('/')
        // cy.reload()
       
        // cy.xpath(`//tbody//tr[contains(.,'Modelo vinteum')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo vinteum')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo vinteum')]`).should('not.exist')
            cy.excluirModelo('Modelo vinteum')
    })

    it('B - Validar limite máximo - Campo Código (Edição)', () => {
        cy.criarModelo('Modelo vintedois', 'descrição do modelo vinte e dois', '//')

        cy.wait(3000)
       
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('03/01/2025')
                                                    .type('{enter}')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.CODIGO).type('220222')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.VERSAO.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.CODIGO).clear()
                                    .type('21212121465434140440198976104794413164648794817641748946156489412154')
        cy.get(loc.LEIAUTE.VALIDACAOCODIGO).should('contain', 'Tamanho máximo do campo de 50 caracteres')

    })

    it('U - Excluindo o Leiaute (3 - B)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo vintedois')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo vintedois')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('220222')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'220222')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('220222')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'220222')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo vintedois')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo vintedois')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo vintedois')]`).should('not.exist')

        cy.excluirModelo('Modelo vintedois')
            
    })

})

describe('4 - Validar funcionamento dos Botões (tela Cadastro)', () => {
    //redireciona para a página de visualização dos modelos. Nenhum campo preenchido
    it('A - Validar botão Voltar (campos vazios)', () => {
        cy.criarModelo('Modelo vintetres', 'descrição do modelo vintetres', '//')

        cy.wait(3000)
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()
        cy.get(loc.MODELO.NOMETELA).should('contain','Editar Modelo')

        cy.excluirModelo('Modelo vintetres')
    })
    //redireciona para a página de visualização dos modelos. Nenhum campo preenchido
    it('B - Validar botão Voltar = Não (campos preenchidos)', () => {
        cy.criarModelo('Modelo vintequatro', 'descrição do modelo vintequatro', '//')

        cy.wait(3000)

        cy.get(loc.LEIAUTE.CODIGO).type('242424')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('03/01/2025')
                                                    .type('{enter}03/02/2025')
                                                    .type('{enter}')
        cy.wait(1000)
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()
        cy.get(loc.MODELO.MENSAGEMVALIDACAO).should('contain','Tem certeza que deseja voltar?')//
        cy.get(loc.LEIAUTE.MENSAGEMVALIDACAONAO).click()
        cy.wait(1000)
        cy.get(loc.LEIAUTE.CODIGO).should('have.value', '242424')
        
        cy.excluirModelo('Modelo vintequatro')
    })

    it('C - Validar botão Voltar - Sim (campos preenchidos)', () => {
        cy.criarModelo('Modelo vintecinco', 'descrição do modelo vintecinco', '//')

        cy.wait(3000)

        cy.get(loc.LEIAUTE.CODIGO).type('252525')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('03/01/2025')
                                                    .type('{enter}03/02/2025')
                                                    .type('{enter}')
        cy.wait(1000)
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()
        cy.get(loc.MODELO.MENSAGEMVALIDACAO).should('contain','Tem certeza que deseja voltar?')//
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        cy.wait(1000)
        cy.get(loc.MODELO.NOMETELA).should('contain','Editar Modelo')
        
        cy.excluirModelo('Modelo vintecinco')
        
    })

    it('D - Validar botão Limpar - Não (campos vazios)', () => {
        cy.criarModelo('Modelo vinteseis', 'descrição do modelo vinteseis', '//')

        cy.wait(3000)
        cy.get(loc.LEIAUTE.BTN_LIMPAR).click()
        cy.get(loc.MODELO.NOMETELA).should('contain','Cadastrar Leiaute')

        cy.excluirModelo('Modelo vinteseis')
        
        
    })

    it('E - Validar botão Limpar - Não (campos preenchidos)', () => {
        cy.criarModelo('Modelo vintesete', 'descrição do modelo vintesete', '//')

        cy.wait(3000)

        cy.get(loc.LEIAUTE.CODIGO).type('272727')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('03/01/2025')
                                                    .type('{enter}04/02/2025')
                                                    .type('{enter}')
        cy.wait(1000)
        cy.get('#cadastro-leiaute-form-btn-limpar').click()
        //cy.get(loc.LEIAUTE.BTN_LIMPAR).click()
        cy.get(loc.MODELO.NOMETELA).should('contain','Cadastrar Leiaute')


        cy.get(loc.LEIAUTE.MENSAGEMVALIDACAO).should('contain','Tem certeza que deseja limpar todos os campos do formulário?')//
        cy.get(loc.LEIAUTE.MENSAGEMVALIDACAONAO).click()//clicar em Não
        cy.wait(1000)
        cy.get(loc.LEIAUTE.CODIGO).should('have.value','272727')

        cy.excluirModelo('Modelo vintesete')
    })

    it('F - Validar botão Limpar - Sim (campos preenchidos)', () => {
        cy.criarModelo('Modelo vinteoito', 'descrição do modelo vinteoito', '//')

        cy.wait(3000)

        cy.get(loc.LEIAUTE.CODIGO).type('282828')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('03/01/2025')
                                                    .type('{enter}04/02/2025')
                                                    .type('{enter}')
        cy.wait(1000)
        cy.get('#cadastro-leiaute-form-btn-limpar').click()
        //cy.get(loc.LEIAUTE.BTN_LIMPAR).click()
      
        cy.get(loc.LEIAUTE.MENSAGEMVALIDACAO).should('contain','Tem certeza que deseja limpar todos os campos do formulário?')//
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()//clicar em Não
        cy.get(loc.MODELO.NOMETELA).should('contain','Cadastrar Leiaute')
        cy.wait(1000)
        cy.get(loc.LEIAUTE.CODIGO).should('not.have.value','282828')
        cy.get(loc.LEIAUTE.DESCRICAO).should('not.have.value','Breve descrição do leiaute')

        cy.excluirModelo('Modelo vinteoito')
       
    })
    
    it('G - Validar botão Cancelar - Não (campos preenchidos)', () => {
        cy.criarModelo('Modelo vintenove', 'descrição do modelo vintenove', '//')

        cy.wait(3000)

        cy.get(loc.LEIAUTE.CODIGO).type('292929')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('03/01/2025')
                                                    .type('{enter}04/02/2025')
                                                    .type('{enter}')

        cy.get(loc.LEIAUTE.BTN_CANCELAR).click()
        cy.get(loc.LEIAUTE.MENSAGEMVALIDACAO).should('contain','Tem certeza que deseja cancelar?')//
        cy.get(loc.LEIAUTE.MENSAGEMVALIDACAONAO).click()//clicar em Não
        cy.get(loc.LEIAUTE.CODIGO).should('have.value','292929')
        cy.get(loc.LEIAUTE.DESCRICAO).should('have.value','Breve descrição do leiaute')
        cy.excluirModelo('Modelo vintenove')

    })
    //Campo Tipo de Arquivo já está vindo preenchido
    it('H - Validar botão Cancelar - SIM (campos preenchidos)', () => {
        cy.criarModelo('Modelo30', 'descrição do modelo trinta', '//')

        cy.wait(3000)

        cy.get(loc.LEIAUTE.CODIGO).type('303030')
        cy.get(loc.LEIAUTE.DESCRICAO).type('Breve descrição do leiaute')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('03/01/2025')
                                                    .type('{enter}04/02/2025')
                                                    .type('{enter}')

        cy.get(loc.LEIAUTE.BTN_CANCELAR).click()
        cy.get(loc.LEIAUTE.MENSAGEMVALIDACAO).should('contain','Tem certeza que deseja cancelar?')//
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()//clicar em Não
        cy.get(loc.MODELO.NOMETELA).should('contain', 'Modelos')      
        
    })

    it('V - Excluindo o Leiaute (4 - H)', () => {
        // cy.visit('/')
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelotrinta')]`).click()
        //                                                     .rightclick()
       
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelotrinta')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelotrinta')]`).should('not.exist')
            cy.excluirModelo('Modelo30')
    })

    it('I - Validar botão Novo Leiaute na tela de Edição de Modelo de Arquivos', () => {
        cy.criarModelo('Modelotrintaum', 'descrição do modelo Modelotrintaum', '//')

        cy.wait(3000)
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()
        cy.get(loc.LEIAUTE.BTN_NOVO).click()
        
        cy.get(loc.MODELO.NOMETELA).should('contain', 'Cadastrar Leiaute')
        
    })

    it('X - Excluindo o Leiaute (4 - I)', () => {
        // cy.visit('/')
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelotrintaum')]`).click()
        //                                                     .rightclick()
       
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelotrintaum')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelotrintaum')]`).should('not.exist')

        cy.excluirModelo('Modelotrintaum')
            
    })

}) 

describe('5 - Validar Ações na grid de listagem de versões na tela (Edição de Leiaute)', () => {       
    it('A - Editar Versão via grid na tela de Edição de Leiaute', () => {
        cy.criarModelo('Editar', 'Descrição do editar', '//')
        
        cy.get(loc.LEIAUTE.CODIGO).type('1045748')
        cy.get(loc.LEIAUTE.DESCRICAO).type('leiaute editar descricao')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

        cy.get(loc.VERSAO.CODIGO).type('1045748')
        cy.get(loc.VERSAO.DESCRICAO).type('TESTE')
        cy.get(loc.VERSAO.STATUS).click()
        cy.get(loc.VERSAO.PUBLICACAO).click()
                                    .type('01/01/2025')
                                    .type('{enter}')
        cy.wait(3000)
        cy.get(loc.VERSAO.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Versão salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Bloco')

        // cy.get(loc.BLOCO.BTN_VOLTAR).click()
        cy.get(':nth-child(2) > .ant-steps-item-container').click()
        cy.get('.ant-table-row').click()
                                .rightclick()
        cy.get(loc.LEIAUTE.BTN_EDITAR).click()
        cy.wait(2000)
        cy.get(loc.VERSAO.NOMETELA).should('contain', 'Editar Versão')
          
    })

    it('Z - Excluindo o Leiaute (5 - A)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Editar')
        .type('{enter}')

        y.wait(2000)
        cy.xpath(`//tbody//tr[contains(.,'Editar')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('1045748')
        .type('{enter}')
        y.wait(2000)
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).click()
                                                .rightclick()
        cy.get(loc.LEIAUTE.BTN_EDITAR).click()

        cy.wait(3000)
        cy.get(loc.VERSAO.BUSCAR).type('1045748')
        .type('{enter}')
        y.wait(2000)
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).click()
        .rightclick()

        cy.get(loc.VERSAO.BTN_EXCLUIR).click()
        cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
        
         cy.reload()
         cy.get(loc.VERSAO.BUSCAR).type('1045748')
         .type('{enter}')
        cy.wait(2000)
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).should('not.exist')
        
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('1045748')
        .type('{enter}')
        cy.wait(2000)
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).click()
                                                    .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).clear()
                                    .type('1045748')
                                    .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).should('not.exist')

        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.wait(2000)
        // cy.xpath(`//tbody//tr[contains(.,'Editar')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Editar')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Editar')]`).should('not.exist')
            
        cy.excluirModelo('Editar')
    })

    it('B - Clonar Versão via grid na tela de Edição de Leiaute', () => {
        cy.criarModelo('Clonar', 'Descrição do clonar', '//')
        
        cy.get(loc.LEIAUTE.CODIGO).type('405233')
        cy.get(loc.LEIAUTE.DESCRICAO).type('leiaute clonar descricao')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

        cy.get(loc.VERSAO.CODIGO).type('405233')
        cy.get(loc.VERSAO.DESCRICAO).type('TESTE')
        cy.get(loc.VERSAO.STATUS).click()
        cy.get(loc.VERSAO.PUBLICACAO).click()
                                    .type('01/01/2025')
                                    .type('{enter}')
        cy.wait(3000)
        cy.get(loc.VERSAO.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Versão salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Bloco')

        // cy.get(loc.BLOCO.BTN_VOLTAR).click()
        cy.get(':nth-child(2) > .ant-steps-item-container').click()
        cy.get('.ant-table-row').click()
                                .rightclick()
        cy.get(loc.LEIAUTE.BTN_CLONAR).click()
        cy.get(loc.LEIAUTE.MENSAGEMALTERACAOSIM).click()

        cy.wait(2000)
        cy.xpath(`//tbody//tr[contains(.,'405234')]`).should('exist')

        
          
    })

    it('K - Excluindo o Leiaute (5 - B)', () => {
        cy.visit('/')
        cy.reload()
        cy.get(loc.MODELO.BUSCAR).type('Clonar')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Clonar')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('405233')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'405233')]`).click()
                                                .rightclick()
        cy.get(loc.LEIAUTE.BTN_EDITAR).click()

        cy.wait(2000) // 1

        cy.get(loc.VERSAO.BUSCAR).type('405233')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'405233')]`).click()
        .rightclick()
        cy.get(loc.VERSAO.BTN_EXCLUIR).click()
        cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
        
         cy.reload()
        cy.get(loc.VERSAO.BUSCAR).type('405233')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'405233')]`).should('not.exist')

        cy.wait(2000) // 2

        cy.get(loc.VERSAO.BUSCAR).clear()
                                .type('405234')
                                .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'405234')]`).click()
        .rightclick()
        cy.get(loc.VERSAO.BTN_EXCLUIR).click()
        cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
        
         cy.reload()
        cy.get(loc.VERSAO.BUSCAR).type('405234')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'405234')]`).should('not.exist')

        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('405233')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'405233')]`).click()
                                                    .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        cy.wait(3000)
        cy.reload()
        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('405233')
        .type('{enter}')
        cy.wait(1000)
        cy.xpath(`//tbody//tr[contains(.,'405233')]`).should('not.exist')

        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.wait(2000)
        // cy.xpath(`//tbody//tr[contains(.,'Clonar')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Clonar')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Clonar')]`).should('not.exist')

        cy.excluirModelo('Clonar')
            
    })

    it('C - Alterar o Status da Versão via grid na tela de Edição de Leiaute', () => {
        cy.criarModelo('Status', 'Descrição do status', '//')
        
        cy.get(loc.LEIAUTE.CODIGO).type('853059')
        cy.get(loc.LEIAUTE.DESCRICAO).type('leiaute status descricao')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

        cy.get(loc.VERSAO.CODIGO).type('853059')
        cy.get(loc.VERSAO.DESCRICAO).type('TESTE')
        cy.get(loc.VERSAO.STATUS).click()
        cy.get(loc.VERSAO.PUBLICACAO).click()
                                    .type('01/01/2025')
                                    .type('{enter}')
        cy.wait(3000)
        cy.get(loc.VERSAO.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Versão salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Bloco')

        // cy.get(loc.BLOCO.BTN_VOLTAR).click()
        cy.get(':nth-child(2) > .ant-steps-item-container').click()
        cy.get('.ant-table-row').click()
                                .rightclick()
        cy.get(loc.LEIAUTE.BTN_STATUS).click()
        cy.get(loc.LEIAUTE.MENSAGEMALTERACAOSIM).click()

        cy.wait(2000)
        cy.xpath(`//tbody//tr[contains(.,'Inativo')]`).should('exist')

        
          
    })

    it('W - Excluindo o Leiaute (5 - C)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Status')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Status')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('853059')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'853059')]`).click()
                                                .rightclick()
        cy.get(loc.LEIAUTE.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.VERSAO.BUSCAR).type('853059')
        .type('{enter}')

        cy.xpath(`//tbody//tr[contains(.,'853059')]`).click()
        .rightclick()
        cy.get(loc.VERSAO.BTN_EXCLUIR).click()
        cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.VERSAO.BUSCAR).type('853059')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'853059')]`).should('not.exist')
        
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('853059')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'853059')]`).click()
                                                    .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).clear()
                                    .type('853059')
                                    .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'853059')]`).should('not.exist')

        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.wait(2000)
        // cy.xpath(`//tbody//tr[contains(.,'Status')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Status')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Status')]`).should('not.exist')

        cy.excluirModelo('Status')
            
    })

}) 

describe('6 - Ordenação da grid', () => {
    it('A - Validar a ordenação da grid de visualização de Versões (Nome)', () => {
        cy.criarModelo('Ordem', 'Descrição do ordem', '//')
        
        cy.get(loc.LEIAUTE.CODIGO).type('1045748')
        cy.get(loc.LEIAUTE.DESCRICAO).type('leiaute ordem descricao')
        cy.get(loc.LEIAUTE.STATUS).click()
        cy.get('#cadastro-leiaute-form_vigencia').click()
                                                    .type('01/01/2025')
                                                    .type('{enter}02/02/2025')
                                                    .type('{enter}')
        cy.get(loc.LEIAUTE.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.LEIAUTE.MESSAGESUCCESS).should('contain','Dados de Leiaute salvos com sucesso!')
        cy.get(loc.LEIAUTE.NOMETELA).should('contain', 'Cadastrar Versão')

        cy.get(loc.VERSAO.CODIGO).type('1045748')
        cy.get(loc.VERSAO.DESCRICAO).type('TESTE')
        cy.get(loc.VERSAO.STATUS).click()
        cy.get(loc.VERSAO.PUBLICACAO).click()
                                    .type('01/01/2025')
                                    .type('{enter}')
        cy.wait(3000)
        cy.get(loc.VERSAO.BTN_SALVARPROSSEGUIR).click()
        cy.get(loc.BLOCO.BTN_VOLTAR).click()
        cy.get(loc.VERSAO.BTN_VOLTAR).click()
        cy.wait(1000)

        cy.get(loc.LEIAUTE.BTN_NOVOVERSAO).click()
        cy.get(loc.VERSAO.CODIGO).type('1045750')
        cy.get(loc.VERSAO.DESCRICAO).type('A VERSÃO')
        cy.get(loc.VERSAO.STATUS).click()
        cy.get(loc.VERSAO.PUBLICACAO).click()
                                    .type('01/02/2025')
                                    .type('{enter}')
     
        cy.get(loc.VERSAO.BTN_SALVARPROSSEGUIR).click()
        cy.wait(3000)
        cy.get(loc.BLOCO.BTN_VOLTAR).click()
        cy.get(loc.VERSAO.BTN_VOLTAR).click()

        cy.wait(1000)
        cy.get(loc.LEIAUTE.BTN_NOVOVERSAO).click()
        cy.wait(1000)
        cy.get(loc.VERSAO.CODIGO).type('1045752')
        cy.get(loc.VERSAO.DESCRICAO).type('BA VERSÃO')
        cy.get(loc.VERSAO.STATUS).click()
        cy.get(loc.VERSAO.PUBLICACAO).click()
                                    .type('01/03/2025')
                                    .type('{enter}')
        
        cy.get(loc.VERSAO.BTN_SALVARPROSSEGUIR).click()
        cy.wait(3000)
        cy.get(loc.BLOCO.BTN_VOLTAR).click()
        cy.get(loc.VERSAO.BTN_VOLTAR).click()
        cy.wait(2000)



       cy.SortClassificacoes(2)

    })

    it('Y - Excluindo o Leiaute (6 - A)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Ordem')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Ordem')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('1045748')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).click()
                                                .rightclick()
        cy.get(loc.LEIAUTE.BTN_EDITAR).click()

        cy.wait(2000) // 1

        cy.get(loc.VERSAO.BUSCAR).type('1045748')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).click()
        .rightclick()
        cy.get(loc.VERSAO.BTN_EXCLUIR).click()
        cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
        
         cy.reload()
         cy.get(loc.VERSAO.BUSCAR).type('1045748')
         .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).should('not.exist')

        cy.wait(2000) // 2
        
        cy.reload()
        cy.get(loc.VERSAO.BUSCAR).clear()
                                .type('1045750')
                                .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045750')]`).click()
        .rightclick()
        cy.get(loc.VERSAO.BTN_EXCLUIR).click()
        cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
        
         cy.reload()
         cy.get(loc.VERSAO.BUSCAR).type('1045750')
         .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045750')]`).should('not.exist')

        cy.wait(2000) // 3

        cy.get(loc.VERSAO.BUSCAR).clear()
                                .type('1045752')
                                .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045752')]`).click()
        .rightclick()
        cy.get(loc.VERSAO.BTN_EXCLUIR).click()
        cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
        
         cy.reload()
         cy.get(loc.VERSAO.BUSCAR).type('1045752')
         .type('{enter}')

        cy.xpath(`//tbody//tr[contains(.,'1045752')]`).should('not.exist')

        cy.wait(2000) // 4

        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('1045748')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).click()
                                                    .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.wait(2000)
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('1045748')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).should('not.exist')

        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.wait(2000)
        // cy.xpath(`//tbody//tr[contains(.,'Ordem')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Ordem')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Ordem')]`).should('not.exist')
            
        cy.excluirModelo('Ordem')
    })

})

describe.skip('6 - Validando a exclusão dos Leiautes', () => {

    it('A - Excluindo o Leiaute (1 - A)', () => {
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
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('11111')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'11111')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modeloum')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modeloum')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modeloum')]`).should('not.exist')
        cy.excluirModelo('Modeloum')
        
    })

    it('B - Excluindo o Leiaute (1 - B)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelovigenciafim')
        .type('{enter}')

        cy.xpath(`//tbody//tr[contains(.,'Modelovigenciafim')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()
        cy.wait(2000)

        cy.get(loc.LEIAUTE.BUSCAR).type('74108')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'74108')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        
        cy.get(loc.LEIAUTE.BUSCAR).type('74108')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'74108')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelovigenciafim')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelovigenciafim')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelovigenciafim')]`).should('not.exist')
                
        cy.excluirModelo('Modelovigenciafim')
    })

    it('C - Excluindo o Leiaute (1 - C)', () => {
        cy.visit('/')
        cy.reload()
        cy.get(loc.MODELO.BUSCAR).type('Modelo dois')
        .type('{enter}')

        cy.xpath(`//tbody//tr[contains(.,'Modelo dois')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('22222')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'22222')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('22222')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'22222')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dois')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo dois')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dois')]`).should('not.exist')
        
        cy.excluirModelo('Modelo dois')  
        
    })
    //EA-122 - Campo código não está sendo destacado e não apresenta mensagem de validação.
    it.skip('D - Excluindo o Leiaute (2 - A)', () => {
        cy.visit('/')
        
        cy.get(loc.MODELO.BUSCAR).type('MModelotres')
        .type('{enter}')

        cy.xpath(`//tbody//tr[contains(.,'MModelotres')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.get(loc.LEIAUTE.BUSCAR).type('33333')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'33333')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('33333')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'33333')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'MModelotres')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('MModelotres')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'MModelotres')]`).should('not.exist')
                
        cy.excluirModelo('MModelotres') 

    })

    it('E - Excluindo o Leiaute (2 - B)', () => {
        // cy.visit('/')
        // cy.reload()
       
        // cy.xpath(`//tbody//tr[contains(.,'Modelo quatro')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo quatro')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo quatro')]`).should('not.exist')

        cy.excluirModelo('Modelo quatro')
            
    })

    it('F - Excluindo o Leiaute (2 - C)', () => {
        // cy.visit('/')
        // cy.reload()
       
        // cy.xpath(`//tbody//tr[contains(.,'Modelo cinco')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo cinco')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo cinco')]`).should('not.exist')
            
        cy.excluirModelo('Modelo cinco')
    })

    it('G - Excluindo o Leiaute (2 - D)', () => {
        // cy.visit('/')
        // cy.reload()
       
        // cy.xpath(`//tbody//tr[contains(.,'Modelo sexto')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo sexto')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo sexto')]`).should('not.exist')

        cy.excluirModelo('Modelo sexto')
            
    })

    it('H - Excluindo o Leiaute (2 - E)', () => {
        // cy.visit('/')
        // cy.reload()
       
        // cy.xpath(`//tbody//tr[contains(.,'Modelo sete')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo sete')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo sete')]`).should('not.exist')

        cy.excluirModelo('Modelo sete')
            
    })

    it('I - Excluindo o Leiaute (2 - F)', () => {
        // cy.visit('/')
        // cy.reload()
       
        // cy.xpath(`//tbody//tr[contains(.,'Modelo oito')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo oito')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo oito')]`).should('not.exist')
            
        cy.excluirModelo('Modelo oito')
    })

    it('J - Excluindo o Leiaute (2 - G)', () => {
        cy.visit('/')
        cy.reload()
        cy.get(loc.MODELO.BUSCAR).type('Modelo nove')
        .type('{enter}')

        cy.xpath(`//tbody//tr[contains(.,'Modelo nove')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('99999')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'99999')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('99999')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'99999')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BUSCAR).type('Modelo nove')
        // .type('{enter}')
        // cy.xpath(`//tbody//tr[contains(.,'Modelo nove')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo nove')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.get(loc.MODELO.BUSCAR).type('Modelo nove')
        // .type('{enter}')
        // cy.xpath(`//tbody//tr[contains(.,'Modelo nove')]`).should('not.exist')
        cy.excluirModelo('Modelo nove')
            
    })

    it('K - Excluindo o Leiaute (2 - J)', () => {
        cy.visit('/')
        cy.reload()
        cy.get(loc.MODELO.BUSCAR).type('Modelo doze')
        .type('{enter}')

        cy.xpath(`//tbody//tr[contains(.,'Modelo doze')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()
        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('121212')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'121212')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('121212')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'121212')]`).should('not.exist')

        cy.get(loc.LEIAUTE.BUSCAR).clear()
                                    .type('121312')
                                    .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'121312')]`).click()
                                                    .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()

        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('121312')
                                    .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'121312')]`).should('not.exist')

        cy.excluirModelo('Modelo doze')

        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo doze')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo doze')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo doze')]`).should('not.exist')
            
    })

    it('L - Excluindo o Leiaute (2 - K)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo treze')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo treze')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()
        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('131313')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'131313')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('131313')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'131313')]`).should('not.exist')

        cy.get(loc.LEIAUTE.BUSCAR).clear()
                                    .type('130013')
                                    .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'130013')]`).click()
        .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()

        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('130013')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'130013')]`).should('not.exist')

        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo treze')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo treze')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo treze')]`).should('not.exist')

        cy.excluirModelo('Modelo treze')
            
    })

    it('M - Excluindo o Leiaute (2 - L)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo quatorze')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo quatorze')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('141414')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'141414')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('141414')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'141414')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo quatorze')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo quatorze')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo quatorze')]`).should('not.exist')
            
        cy.excluirModelo('Modelo quatorze')

    })
    
    it('N - Excluindo o Leiaute (2 - M)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo quinze')
        .type('{enter}')

        cy.xpath(`//tbody//tr[contains(.,'Modelo quinze')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('151515')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'151515')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('151515')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'151515')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo quinze')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo quinze')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo quinze')]`).should('not.exist')

        cy.excluirModelo('Modelo quinze')
            
    })

    it('O - Excluindo o Leiaute (2 - N)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo dezeseis')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo dezeseis')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('161616')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'161616')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('161616')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'161616')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezeseis')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo dezeseis')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezeseis')]`).should('not.exist')
            
        cy.excluirModelo('Modelo dezeseis')
    })
    
    it('P - Excluindo o Leiaute (2 - O)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo dezessete')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo dezessete')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('171717')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'171717')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('171717')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'171717')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezessete')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo dezessete')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezessete')]`).should('not.exist')

        cy.excluirModelo('Modelo dezessete')
            
    })

    it('Q - Excluindo o Leiaute (2 - P)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo dezoito')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo dezoito')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('181818')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'181818')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()

        cy.get(loc.LEIAUTE.BUSCAR).type('181818')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'181818')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezoito')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo dezoito')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezoito')]`).should('not.exist')

        cy.excluirModelo('Modelo dezoito')
            
    })

    it('R - Excluindo o Leiaute (2 - Q)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo dezenove')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo dezenove')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('191919')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'191919')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('191919')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'191919')]`).should('not.exist')

        cy.get(loc.LEIAUTE.BUSCAR).clear()
                                    .type('199119')
                                    .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'199119')]`).click()
                                                     .rightclick()   
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()

        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('199119')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'199119')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezenove')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo dezenove')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo dezenove')]`).should('not.exist')
            cy.excluirModelo('Modelo dezenove')
    })

    it('S - Excluindo o Leiaute (2 - R)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo20')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo20')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('202020')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'202020')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('202020')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'202020')]`).should('not.exist')

        cy.get(loc.LEIAUTE.BUSCAR).clear()
                                    .type('202120')
                                    .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'202120')]`).click()
        .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()

        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('202120')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'202120')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo20')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo20')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo20')]`).should('not.exist')
            cy.excluirModelo('Modelo20')
    })

    it('T - Excluindo o Leiaute (3 - A)', () => {
        // cy.visit('/')
        // cy.reload()
       
        // cy.xpath(`//tbody//tr[contains(.,'Modelo vinteum')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo vinteum')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo vinteum')]`).should('not.exist')
            cy.excluirModelo('Modelo vinteum')
    })

    it('U - Excluindo o Leiaute (3 - B)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Modelo vintedois')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Modelo vintedois')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('220222')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'220222')]`).click()
                                                   .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('220222')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'220222')]`).should('not.exist')
        
        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo vintedois')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelo vintedois')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelo vintedois')]`).should('not.exist')

        cy.excluirModelo('Modelo vintedois')
            
    })

    it('V - Excluindo o Leiaute (4 - H)', () => {
        // cy.visit('/')
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelotrinta')]`).click()
        //                                                     .rightclick()
       
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelotrinta')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelotrinta')]`).should('not.exist')
            cy.excluirModelo('Modelo30')
    })

    it('X - Excluindo o Leiaute (4 - I)', () => {
        // cy.visit('/')
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelotrintaum')]`).click()
        //                                                     .rightclick()
       
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Modelotrintaum')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Modelotrintaum')]`).should('not.exist')

        cy.excluirModelo('Modelotrintaum')
            
    })

    it('Z - Excluindo o Leiaute (5 - A)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Editar')
        .type('{enter}')

        y.wait(2000)
        cy.xpath(`//tbody//tr[contains(.,'Editar')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('1045748')
        .type('{enter}')
        y.wait(2000)
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).click()
                                                .rightclick()
        cy.get(loc.LEIAUTE.BTN_EDITAR).click()

        cy.wait(3000)
        cy.get(loc.VERSAO.BUSCAR).type('1045748')
        .type('{enter}')
        y.wait(2000)
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).click()
        .rightclick()

        cy.get(loc.VERSAO.BTN_EXCLUIR).click()
        cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
        
         cy.reload()
         cy.get(loc.VERSAO.BUSCAR).type('1045748')
         .type('{enter}')
        cy.wait(2000)
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).should('not.exist')
        
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('1045748')
        .type('{enter}')
        cy.wait(2000)
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).click()
                                                    .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).clear()
                                    .type('1045748')
                                    .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).should('not.exist')

        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.wait(2000)
        // cy.xpath(`//tbody//tr[contains(.,'Editar')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Editar')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Editar')]`).should('not.exist')
            
        cy.excluirModelo('Editar')
    })

    it('K - Excluindo o Leiaute (5 - B)', () => {
        cy.visit('/')
        cy.reload()
        cy.get(loc.MODELO.BUSCAR).type('Clonar')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Clonar')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('405233')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'405233')]`).click()
                                                .rightclick()
        cy.get(loc.LEIAUTE.BTN_EDITAR).click()

        cy.wait(2000) // 1

        cy.get(loc.VERSAO.BUSCAR).type('405233')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'405233')]`).click()
        .rightclick()
        cy.get(loc.VERSAO.BTN_EXCLUIR).click()
        cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
        
         cy.reload()
        cy.get(loc.VERSAO.BUSCAR).type('405233')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'405233')]`).should('not.exist')

        cy.wait(2000) // 2

        cy.get(loc.VERSAO.BUSCAR).clear()
                                .type('405234')
                                .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'405234')]`).click()
        .rightclick()
        cy.get(loc.VERSAO.BTN_EXCLUIR).click()
        cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
        
         cy.reload()
        cy.get(loc.VERSAO.BUSCAR).type('405234')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'405234')]`).should('not.exist')

        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('405233')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'405233')]`).click()
                                                    .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        cy.wait(3000)
        cy.reload()
        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('405233')
        .type('{enter}')
        cy.wait(1000)
        cy.xpath(`//tbody//tr[contains(.,'405233')]`).should('not.exist')

        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.wait(2000)
        // cy.xpath(`//tbody//tr[contains(.,'Clonar')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Clonar')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Clonar')]`).should('not.exist')

        cy.excluirModelo('Clonar')
            
    })

    it('W - Excluindo o Leiaute (5 - C)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Status')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Status')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('853059')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'853059')]`).click()
                                                .rightclick()
        cy.get(loc.LEIAUTE.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.VERSAO.BUSCAR).type('853059')
        .type('{enter}')

        cy.xpath(`//tbody//tr[contains(.,'853059')]`).click()
        .rightclick()
        cy.get(loc.VERSAO.BTN_EXCLUIR).click()
        cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.reload()
        cy.get(loc.VERSAO.BUSCAR).type('853059')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'853059')]`).should('not.exist')
        
        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('853059')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'853059')]`).click()
                                                    .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).clear()
                                    .type('853059')
                                    .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'853059')]`).should('not.exist')

        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.wait(2000)
        // cy.xpath(`//tbody//tr[contains(.,'Status')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Status')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Status')]`).should('not.exist')

        cy.excluirModelo('Status')
            
    })

    it('Y - Excluindo o Leiaute (6 - A)', () => {
        cy.visit('/')
        cy.reload()

        cy.get(loc.MODELO.BUSCAR).type('Ordem')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'Ordem')]`).click()
                                                            .rightclick()
        cy.get(loc.MODELO.BTN_EDITAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('1045748')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).click()
                                                .rightclick()
        cy.get(loc.LEIAUTE.BTN_EDITAR).click()

        cy.wait(2000) // 1

        cy.get(loc.VERSAO.BUSCAR).type('1045748')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).click()
        .rightclick()
        cy.get(loc.VERSAO.BTN_EXCLUIR).click()
        cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
        
         cy.reload()
         cy.get(loc.VERSAO.BUSCAR).type('1045748')
         .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).should('not.exist')

        cy.wait(2000) // 2
        
        cy.reload()
        cy.get(loc.VERSAO.BUSCAR).clear()
                                .type('1045750')
                                .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045750')]`).click()
        .rightclick()
        cy.get(loc.VERSAO.BTN_EXCLUIR).click()
        cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
        
         cy.reload()
         cy.get(loc.VERSAO.BUSCAR).type('1045750')
         .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045750')]`).should('not.exist')

        cy.wait(2000) // 3

        cy.get(loc.VERSAO.BUSCAR).clear()
                                .type('1045752')
                                .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045752')]`).click()
        .rightclick()
        cy.get(loc.VERSAO.BTN_EXCLUIR).click()
        cy.get(loc.VERSAO.MENSAGEMCONFIRMACAOSIM).click()
        
         cy.reload()
         cy.get(loc.VERSAO.BUSCAR).type('1045752')
         .type('{enter}')

        cy.xpath(`//tbody//tr[contains(.,'1045752')]`).should('not.exist')

        cy.wait(2000) // 4

        cy.get(loc.LEIAUTE.BTN_VOLTAR).click()

        cy.wait(2000)
        cy.get(loc.LEIAUTE.BUSCAR).type('1045748')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).click()
                                                    .rightclick()
        cy.get(loc.LEIAUTE.BTN_EXCLUIR).click()
        cy.get(loc.LEIAUTE.MENSAGEMCONFIRMACAOSIM).click()
        
        cy.wait(2000)
        cy.reload()
        cy.get(loc.LEIAUTE.BUSCAR).type('1045748')
        .type('{enter}')
        cy.xpath(`//tbody//tr[contains(.,'1045748')]`).should('not.exist')

        // cy.get(loc.MODELO.BTN_VOLTAR).click()
        // cy.wait(2000)
        // cy.xpath(`//tbody//tr[contains(.,'Ordem')]`).click()
        //                                                     .rightclick()
        // cy.get(loc.MODELO.BTN_EXCLUIR).click()
        // cy.get(loc.MODELO.EXCLUSAOCRITICANOME).type('Ordem')
        // cy.get(loc.MODELO.MENSAGEMEXCLUSAOCRITICASIM).click()
        // cy.reload()
        // cy.xpath(`//tbody//tr[contains(.,'Ordem')]`).should('not.exist')
            
        cy.excluirModelo('Ordem')
    })

})