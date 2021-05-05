const locators = {
    MODELO: { 
        NOME: '#cadastro-modelo-form_nome',
        DESCRICAO: '#cadastro-modelo-form_descricao',
        TAGA: '.ant-select-selection-overflow',
        TAGS: ':nth-child(1) > .ant-select-item-option-content',
        TIPOARQUIVO: '.ant-select-selection-item',
        TIPOARQUIVOA: '#cadastro-modelo-form_tipoArquivo',
        TIPOARQUIVOSEPARADOR: '[title="Texto: Separador"] > .ant-select-item-option-content',
        TIPOARQUIVOPOSICIONAMENTO: '[title="Texto: Posicionamento"]',
        CONFIGARQUIVO: '#cadastro-modelo-form_configArquivo', 
        VOLTARMODELO: '.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon',
        ABATEXTO: '.ant-tabs-nav-list > :nth-child(1)',
        ABAXML: '.ant-tabs-nav-list > :nth-child(2)',
        ABAEXCEL: '.ant-tabs-nav-list > :nth-child(3)',
        ABAPDF: '.ant-tabs-nav-list > :nth-child(4)',
        BTN_SALVARPROSSEGUIR: '#cadastro-modelo-form-btn-salvar',//'.ant-form-item-control-input-content > :nth-child(1) > :nth-child(2) > .ant-btn', //':nth-child(2) > .ant-btn',
        BTN_VOLTAR: '#cadastro-modelo-form-btn-voltar',
        BTN_LIMPAR: '#cadastro-modelo-form-btn-limpar',
        BTN_CAMCELAR: '#cadastro-modelo-form-btn-cancelar',
        BTN_SALVAR: '#cadastro-modelo-form-btn-salvar',
        BTN_EDITAR: '.ant-menu > :nth-child(1)',
        BTN_EXCLUIR: '.ant-menu > :nth-child(4)',
        BTN_CLONAR: '.ant-menu > :nth-child(3)',
        BTN_CLONAR_SIM: '.ant-modal-confirm-btns > .ant-btn-primary',
        BTN_NOVO: '#filtro-simples-btn-cadastrar-modelo',
        BTN_MENU: '#box-menu-item',
        BTN_MENU_CADASTRARMODELO: '#box-menu-item-cadastrar-modelo',
        BTN_MENU_CADASTRARTAG: '#box-menu-item-cadastrar-tag',
        BTN_TABELALEIAUTE: '#box-menu-item-cadastrar-tabela-leiaute',
        MESSAGESUCCESS: '.ant-message-custom-content',
        MENSAGEMALERTA: '.ant-alert-message',
        MENSAGEMVALIDACAO: '.ant-modal-confirm-title',
        MENSAGEMCONFIRMACAOSIM: '.ant-btn-dangerous',
        MENSAGEMEXCLUSAOCRITICASIM: '.ant-modal-confirm-btns > .ant-btn-primary',
        EXCLUSAOCRITICANOME: '#modal-exclusao-modelo-form_nomeModelo',
        MENSAGEMVALIDACAONAO: '.ant-modal-confirm-btns > .ant-btn-primary',
        MENSAGEMALTERACAOSIM: '.ant-modal-confirm-btns > .ant-btn-primary',
        VALIDACAONOME: '.ant-form-item-explain > div',//':nth-child(2) > .ant-form-item-control > .ant-form-item-explain > div',
        VALIDACAODESCRICAO: ':nth-child(3) > .ant-form-item-control > .ant-form-item-explain > div',
        VALIDACAOCONFTIPOARQUIVO: '.ant-col-push-2 > .ant-row > .ant-form-item-control > .ant-form-item-explain > div',
        VALIDACAOTIPOARQUIVO: '.ant-form-item-explain > div',
        NOMETELA: '.styles__Title-sc-12b1chh-2',
        TIMELINEMODELO: '.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title',
        TIMELINELEIAUTE: ':nth-child(2) > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title',
        TIMELINEVERSAO: ':nth-child(3) > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title',
        TIMELINEBLOCO: ':nth-child(4) > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title',
        TIMELINEREGISTRO: ':nth-child(5) > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title',
        TIMELINECAMPO: ':nth-child(6) > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title',
        TIMELINETAG: ':nth-child(3) > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title',
        TIMELINEPLANILHA: ':nth-child(3) > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title',
        TIMELINECOLUNAS: ':nth-child(4) > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title',
        TIMELINELINHA: ':nth-child(4) > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title',
        TIMELINEBLOCOPDF: ':nth-child(3) > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title',
        BUSCAR: '.ant-input',


},

        LEIAUTE:{
            CODIGO: '#cadastro-leiaute-form_codigo',
            DESCRICAO: '#cadastro-leiaute-form_descricao',
            STATUS: '#cadastro-leiaute-form_status',
            BTN_SALVARPROSSEGUIR: '#cadastro-leiaute-form-btn-salvar',
            NOMETELA: '.ant-layout-content > :nth-child(2)',
            MESSAGESUCCESS: '.ant-message-custom-content',
            VOLTARLEIAUTE: ':nth-child(2) > .ant-steps-item-container > .ant-steps-item-icon',
            BTN_EDITAR: '.ant-menu > :nth-child(1)',
            BTN_STATUS: '.ant-menu > :nth-child(2)',
            BTN_CLONAR: '.ant-menu > :nth-child(4)',
            BTN_EXCLUIR: '.ant-menu > :nth-child(5)',
            MENSAGEMVALIDACAO: '.ant-modal-confirm-title',
            REGISTROMENSAGEMVALIDACAO: '.ant-typography-success > code > strong',
            REGISTROMENSAGEMVALIDACAOEXCLUIR:'code > strong',
            MENSAGEMCONFIRMACAOSIM: '.ant-btn-dangerous',
            MENSAGEMALTERACAOSIM: '.ant-modal-confirm-btns > .ant-btn-primary',
            MENSAGEMVALIDACAONAO: '.ant-modal-confirm-btns > .ant-btn-primary',
            MENSAGEMALERTA: '.ant-alert-message',
            BTN_VOLTAR: '#cadastro-leiaute-form-btn-voltar', 
            BTN_LIMPAR: '#cadastro-leiaute-form-btn-limpar',
            BTN_CANCELAR: '#cadastro-leiaute-form-btn-cancelar',
            BTN_NOVO: '#filtro-simples-btn-cadastrar-leiaute',
            BTN_NOVOVERSAO: '#filtro-simples-btn-cadastrar-versao',
            VALIDACAOCODIGO: ':nth-child(3) > .ant-form-item-control > .ant-form-item-explain',
            VALIDACAODESCRICAO: ':nth-child(4) > .ant-form-item-control > .ant-form-item-explain > div', 
            VALIDACAOVIGENCIA: ':nth-child(5) > :nth-child(1) > .ant-row > .ant-form-item-control > .ant-form-item-explain',
            VAILIDACAOSTATUS: '.ant-col-offset-2 > .ant-row > .ant-form-item-control > .ant-form-item-explain',
            BUSCAR: '.ant-input-wrapper > .ant-input-affix-wrapper > .ant-input'
            
        },

        VERSAO:{
            BTN_VOLTAR: '#cadastro-versao-form-btn-voltar',
            NOMETELA: '.styles__Title-sc-12b1chh-2',
            CODIGO: '#cadastro-versao-form_codigo',
            DESCRICAO: '#cadastro-versao-form_descricao',
            STATUS: '#cadastro-versao-form_status', 
            PUBLICACAO: '#cadastro-versao-form_publicacao',
            BTN_SALVARPROSSEGUIR: '#cadastro-versao-form-btn-salvar',
            MESSAGESUCCESS: '.ant-message-custom-content > :nth-child(2)',
            BTN_EXCLUIR: '.ant-menu > :nth-child(5)',
            MENSAGEMCONFIRMACAOSIM: '.ant-btn-dangerous',
            BUSCAR: '.ant-input-wrapper > .ant-input-affix-wrapper > .ant-input',
        },

        BLOCO:{
            NOMETELA: '.styles__Title-sc-12b1chh-2',
            BTN_VOLTAR: '#cadastro-bloco-form-btn-voltar',
        }
}

export default locators;