/// <reference types= "cypress" />



describe('Módulo e-Auditor', () => {
    beforeEach(() => {//executa antes de cada teste
  
      cy.visit('https://conta.e-auditoria.com.br')
      //Validando o título da página
      cy.title().should('be.equal', 'Conta Única | e-Auditoria - Login')
      //login
      cy.get('#Email').type('rayner.losque@e-auditoria.com.br')
      cy.get('#Senha').type('1q2w3e')
      cy.get('#lnkLogin').click()
      //Validando título da página de acesso aos módulos
      cy.title().should('be.equal', 'Conta Única | e-Auditoria - Conta', { timeout: 30000 })
      //Acessando módulo e_Auditor
      cy.get('.eauditor > .flipper > .front > .btn').click()
      cy.wait(1000)
      cy.get('.confirm').should('exist')
      cy.get('.confirm').click()
      cy.get('.confirm').should('exist')
      cy.get('.confirm').click()
      // Verificando se estou na tela do e-Auditor
      cy.get('#MenuPadrao_btn_automatizar_auditoria').should('exist')
      // Acessando o menu - MAIS >> Empresas
      cy.get('#menu_principal > .navbar > .nav > :nth-child(4) > .nav-link').click()
      cy.get('#MenuPadrao_MenurelatoriosEmpresa').click()
      cy.get('#ContentSidebarLeft_menuSidebarLeft_btnPreCadastro > .btn-action-sidebar').click()
  
    })
  
    describe('Testes no Cadastro de Empresas', () => {
  
      it('Cadastrar empresas', () => {
        
        cy.get('#CNPJ_Cadastro').type('17685872000133')    
        cy.get('#Cidade_Cadastro').type('Carmo do Rio Claro')
        cy.get('#Razao_Social_Cadastro').type('DSG FARMA JD AMERICA LTDA')
        cy.get('#Regime_Tributacao_Cadastro_Input').type('Simples Nacional')
        cy.get('em').click()
  
        cy.get('#ctl00_central_UF_Cadastro_Input').type('MG')
        cy.get('em').click()
        
        cy.wait(2000)
        cy.get('#IE_Cadastro').type('0021090320019')
        cy.wait(2000)
        cy.get('#btnSalvar2').click()
        cy.timeout(30000)
        cy.get('.confirm').should('exist')
        cy.get('.confirm').click()
        
        
        
        cy.wait(5000)
        cy.get('#ContentSidebarLeft_menuSidebarLeft_btnPreCadastro > .btn-action-sidebar').click()
        
        cy.wait(3000)
        cy.get('#CNPJ_Cadastro').type('02126840000120')   
        cy.get('#Cidade_Cadastro').type('Juiz de Fora')
        cy.get('#Razao_Social_Cadastro').type('GILMAQ COMERCIO DE MAQUINAS AGRICOLAS LTDA - EPP')
        cy.get('#ctl00_central_UF_Cadastro_Input').type('MG')
        cy.get('em').click()
        cy.get('#Regime_Tributacao_Cadastro_Input').type('Simples Nacional')
        cy.get('#IE_Cadastro').type('2237135870051')
              
        cy.get('#btnSalvar2').click()
        cy.timeout(30000)
        cy.get('.confirm').should('exist')
        cy.get('.confirm').click()
        cy.timeout(30000)
  
        // cy.xpath("//*[contains(@id, 'ctl00_ctl00_ContentSidebarLeft_menuSidebarLeft_rtvEmpresasPanel')]//*[contains(@title, 'GILMAQ COMERCIO DE MAQUINAS AGRICOLAS LTDA - EPP - 02126840000120')]").should('exist')
        
  
        //cy.get('#ContentSidebarLeft_menuSidebarLeft_btnPreCadastro > .btn-action-sidebar').click()
        //cy.get('#ContentSidebarLeft_menuSidebarLeft_btnPreCadastro > .btn-action-sidebar').click()
        // cy.get('#ctl00_ContentSidebarLeft_menuSidebarLeft_rtvEmpresas_i0_lblempresa').click()
        // cy.get('#area_dados > .titulo-card').should('be.visible')
        // cy.get('.hamburger-box').click()
        // cy.get('#ContentSidebarLeft_menuSidebarLeft_btnPreCadastro > .btn-action-sidebar').click()
  
        //cy.xpath("//*[contains(@id, 'ctl00_ctl00_ContentSidebarLeft_menuSidebarLeft_rtvEmpresasPanel')]//*[contains(@title, 'DSG FARMA JD AMERICA LTDA - 17685872000133')]").should('exist')
  
        //li[@class='rcbItem']/descendant-or-self::*/text() 
      })
  
      it('Alterar o cadastro', () => {
        
        cy.get('.rtMid > .rtIn > .rtTemplate').click()
        cy.wait(3000)
        cy.get('#ctl00_central_maCNPJ').should('contain', ('17685872000133'))
        cy.get('#nav3Link').click()
        cy.get('#chklistXML > tbody').click()
        cy.get('#chklistNFCe > tbody').click()
        
        cy.wait(5000)
        cy.get('#btnSalvar2').click()
        cy.wait(2000)
        cy.get('.confirm').should('exist')
  
  
  
       // cy.xpath("//*[contains(@id, 'ctl00_ctl00_ContentSidebarLeft_menuSidebarLeft_rtvEmpresasPanel')]//*[contains(@title, 'DSG FARMA JD AMERICA LTDA - 17685872000133')]").click()
  
  
  
        // cy.wait(2000)
        // cy.get('#MenuPadrao_MenuInicio').click()
        // cy.wait(5000)
        // cy.get('#menu_principal > .navbar > .nav > :nth-child(4) > .nav-link').click()
        // cy.get('#MenuPadrao_MenurelatoriosEmpresa').click()
  
  
  
        // cy.wait(1000)
        // cy.get('#MenuPadrao_MenuInicio').click()
        // cy.wait(1000)
        // cy.get('#menu_principal > .navbar > .nav > :nth-child(4) > .nav-link').click()
        // cy.get('#MenuPadrao_MenurelatoriosEmpresa').click()
        // cy.wait(2000)
        // cy.get('#ContentSidebarLeft_menuSidebarLeft_btnPreCadastro > .btn-action-sidebar').click()
        // Cadastrar a segunda empresa          
        //cy.get('#Regime_Tributacao_Cadastro_Input').type('Simples Nacional')
          //cy.get('#Regime_Tributacao_Cadastro_DropDown > .rcbScroll > .rcbList').contains('Simples Nacional').click()
        // cy.get('#IE_Cadastro').type('2237135870051')
         //cy.get('#Razao_Social_Cadastro').type('GILMAQ COMERCIO DE MAQUINAS AGRICOLAS LTDA - EPP')
        // cy.get('#Cidade_Cadastro').type('Juiz de Fora')
        // cy.get('#CNPJ_Cadastro').type('02126840000120')
        // cy.get('#ctl00_central_UF_Cadastro_Arrow').click()
        // cy.get('#ctl00_central_UF_Cadastro_DropDown > .rcbScroll > .rcbList').wait(300).contains('MG').click()
        // cy.wait(5000)
        
  
         //cy.get('#btnSalvar2').click()
        // cy.timeout(30000)
        // cy.get('.confirm').should('exist')
        // cy.get('.confirm').click()
  
        // cy.xpath("//*[contains(@id, 'ctl00_ctl00_ContentSidebarLeft_menuSidebarLeft_rtvEmpresasPanel')]//*[contains(@title, 'GILMAQ COMERCIO DE MAQUINAS AGRICOLAS LTDA - EPP - 02126840000120')]").should('exist')
  
  
        /*  // Cadastrar a segunda empresa          
         cy.get('#Razao_Social_Cadastro').type('GILMAQ COMERCIO DE MAQUINAS AGRICOLAS LTDA - EPP')
         cy.get('#Regime_Tributacao_Cadastro_Input').type('Lucro Presumido')
         cy.get('#IE_Cadastro').type('2237135870051')         
         cy.get('#ctl00_central_UF_Cadastro_Input').type('MG')                        
         cy.get('em').click()           
         cy.get('#ctl00_central_Isento_Cadastro').click()
         cy.get('#CNPJ_Cadastro').type('02126840000120')            
         cy.get('#Cidades_Cadastro').type('Juiz de Fora') 
               
         cy.get('#btnSalvar2').click()
         cy.get('.confirm').should('exist')
         cy.get('.confirm').click()  */
  
        //cy.xpath("//@class[contains(.,'sa-confirm-button-container')]").click() 
        //cy.xpath("//*[contains(@id, 'ctl00_ctl00_ContentSidebarLeft_menuSidebarLeft_rtvEmpresasPanel')]//*[contains(@title, 'GILMAQ COMERCIO DE MAQUINAS AGRICOLAS LTDA - EPP - 02126840000120')]").should('exist')
        //cy.xpath("//h2[contains(.,'sucesso')]").should('Operação realizada com sucesso', {timeout: 30000})
      })
  
      it('Validar obrigatoriedade dos campos', () => {
          // Razão Social
          cy.get('#btnSalvar2').click()
          cy.get('p[style="display: block;"]').should('exist')
          //cy.xpath("//p[contains(.,'Razão Social')]").should('contains','Informe o campo (Razão Social), da empresa.')
          cy.get('.confirm').click()
          cy.get('#Razao_Social_Cadastro').type('DSG FARMA JD AMERICA LTDA')
          // CNPJ
          cy.get('#btnSalvar2').click()
          cy.get('p[style="display: block;"]').should('exist')
          cy.get('.confirm').click()
          cy.get('#CNPJ_Cadastro').type('17685872000133')    
          // Estado 
          cy.get('#btnSalvar2').click()
          cy.get('p[style="display: block;"]').should('exist')
          cy.get('.confirm').click()
          cy.get('#ctl00_central_UF_Cadastro_Input').type('MG')
          cy.get('em').click()
          // Cidade
          cy.get('#btnSalvar2').click()
          cy.get('p[style="display: block;"]').should('exist')
          cy.get('.confirm').click()
          cy.get('#Cidade_Cadastro').type('Carmo do Rio Claro')
          // Regime de tributação
          cy.get('#btnSalvar2').click()
          cy.get('p[style="display: block;"]').should('exist')
          cy.get('.confirm').click()
          cy.get('#Regime_Tributacao_Cadastro_Input').type('Simples Nacional')
          cy.get('em').click()
          //Já existe empresa cadastrada com a mesma Razão social
          cy.get('#btnSalvar2').click()
          cy.get('p[style="display: block;"]').should('exist')
          cy.get('.confirm').click()
  
      })
  
      it('Excluir empresa', () => {
           //cy.reload()
           
           // Identificar a empresa cadastrada no teste anterior e excluir
          cy.xpath("//*[contains(@id, 'ctl00_ctl00_ContentSidebarLeft_menuSidebarLeft_rtvEmpresasPanel')]//*[contains(@title, 'DSG FARMA JD AMERICA LTDA - 17685872000133')]").click()
          cy.wait(5000)
          cy.get('#btn-excluir-empresa').click()
          cy.get('#ButtonExcluirEmpresa').click()
          cy.wait(5000)
           
          cy.xpath("//*[contains(@id, 'ctl00_ctl00_ContentSidebarLeft_menuSidebarLeft_rtvEmpresasPanel')]//*[contains(@title, 'DSG FARMA JD AMERICA LTDA - 17685872000133')]").should('not.exist')
          cy.wait(5000)
  
            // Identificar a empresa cadastrada no teste anterior e excluir
          cy.xpath("//*[contains(@id, 'ctl00_ctl00_ContentSidebarLeft_menuSidebarLeft_rtvEmpresasPanel')]//*[contains(@title, 'GILMAQ COMERCIO DE MAQUINAS AGRICOLAS LTDA - EPP - 02126840000120')]").click()
          cy.wait(5000)
          cy.get('#btn-excluir-empresa').click()
          cy.get('#ButtonExcluirEmpresa').click()
          cy.wait(5000)
          
          cy.xpath("//*[contains(@id, 'ctl00_ctl00_ContentSidebarLeft_menuSidebarLeft_rtvEmpresasPanel')]//*[contains(@title, 'GILMAQ COMERCIO DE MAQUINAS AGRICOLAS LTDA - EPP - 02126840000120')]").should('not.exist')
      })
    })
  })
  