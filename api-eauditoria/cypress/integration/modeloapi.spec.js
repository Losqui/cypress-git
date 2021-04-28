/// <reference types= "cypress" />

describe(`Teste API modeloleiaute (Tipo Arquivo: Separador)`, () => {

    it.skip('for', () => {
        for (var i = 0; i < 3; i++){

        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                nome: `Modelo ECD alterado cy ${i}`,
                descricao: 'Escrituração Contábil Digital alterado cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)

    }

    })

    it('POST - Cadastrando um Modelo (Separador) ', () => {
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Modelo ECD alterado cy',
                descricao: 'Escrituração Contábil Digital alterado cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)

        // Validar POST
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).its('body.retorno').should('not.be.empty')

    })
    //EA-69 Ajustado
    it('POST - Cadastrando um Modelo com um Nome que já existe (Separador) ', () => {
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: 
            {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Modelo ECD alterado cy',
                descricao: 'Escrituração Contábil Digital alterado teste cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(resposta => {
            console.log(resposta)    
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors[""][0]).to.be.equal('Já existe um Modelo Leiaute com o nome especificado')
        })
    })
    
    it('POST - Todos os Campo obrigatórios não preenchidos', () => {
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(resposta => {
            console.log(resposta)    
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.Descricao[0]).to.be.equal('O campo de Descrição é obrigatório')
            expect(resposta.body.errors.Nome[0]).to.be.equal('O campo de Nome é obrigatório')
            expect(resposta.body.errors.TipoArquivo[0]).to.be.equal('O campo de TipoArquivo é obrigatório')
        })
    })

    it('POST - Campo Descrição vazio (O campo de Descrição é obrigatório)', () => {
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Modelo ECD Validacao cy',
                descricao: '',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(resposta => {
            console.log(resposta)    
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.Descricao[0]).to.be.equal('O campo de Descrição é obrigatório')
        })
    })

    it('POST - Campo Nome vazio (O campo de nome é obrigatório)', () => {
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: '',
                descricao: 'Escrituração Contábil Digital Validacao cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(resposta => {
            console.log(resposta)    
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.Nome[0]).to.be.equal('O campo de Nome é obrigatório')
        })
    })

    it('POST - Campo tipoArquivo vazio ("O campo de tipoArquivo é obrigatório")', () => {
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Modelo ECD Validacao cy',
                descricao: 'Escrituração Contábil Digital Validacao cy',
                configArquivo: '|'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(resposta => {
            console.log(resposta)    
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.TipoArquivo[0]).to.be.equal('O campo de TipoArquivo é obrigatório')
        })
    })

    it('POST - Campo tipoArquivo INVÁLIDO ("O campo de tipoArquivo é obrigatório")', () => {
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Modelo ECD Validacao cy',
                descricao: 'Escrituração Contábil Digital Validacao cy',
                tipoArquivo: 'Testes',
                configArquivo: '|'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(resposta => {
            console.log(resposta)    
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.TipoArquivo[0]).to.be.equal('O campo de TipoArquivo é obrigatório')
        })
    })

    it('POST - Campo configArquivo vazio ("O campo de ConfigArquivo é obrigatório")', () => {
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Modelo ECD Validacao cy',
                descricao: 'Escrituração Contábil Digital Validacao cy',
                tipoArquivo: 'Separador',
                configArquivo: ''
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(resposta => {
            console.log(resposta)    
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.ConfigArquivo[0]).to.be.equal('O campo de ConfigArquivo é obrigatório')
        })
    })
    //ajustado EA-68
    it('POST - Mais de 5 caracteres no ConfigArquivo (O campo deve ter no máximo 5 caracteres)', () => {
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Modelo ECD Validacao cy',
                descricao: 'Escrituração Contábil Digital Validacao cy',
                tipoArquivo: 'Separador',
                configArquivo: '//////'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(resposta => {
            console.log(resposta)    
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.ConfigArquivo[0]).to.be.equal('O campo deve ter no máximo 5 caracteres')
        })
    })

    it('POST - Campo idEscopo vazio (Campo NÃO obrigatório)', () => {
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '',
                nome: 'Modelo ECD Validacao cy',
                descricao: 'Escrituração Contábil Digital Validacao cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(resposta => {
            console.log(resposta)    
            expect(resposta.status).to.be.equal(200)
        })
    })

    it('GET - Pegar informações', () => {
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => console.log(resposta))

    })

    it.skip('GET - Verificar se existe modelo leaiute cadastrado', () => {
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then (resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if(c.nome === 'Modelo ECD alterado cy') nomeModelo = c.nome
                
            })
            expect(nomeModelo).to.be.equal ('Modelo ECD alterado cy')
        })
    })

    it('PUT - Alterando (Nome e Descrição) um modelo já cadastrado', () => {
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute',
            qs: 
            {
                nome: 'Modelo ECD alterado cy'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`,
                body: 
                {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Modelo ECD alterado pelo cy',
                    descricao: 'Escrituração Contábil Digital alterado pelo cy',
                    tipoArquivo: 'Separador',
                    configArquivo: '|'
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.retorno').should('exist')

    })

    it('PUT - Alterando (ConfigArquivo) um modelo já cadastrado', () => {
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute',
            qs: 
            {
                nome: 'Modelo ECD alterado pelo cy'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`,
                body: 
                {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Modelo ECD alterado pelo cy',
                    descricao: 'Escrituração Contábil Digital alterado pelo cy',
                    tipoArquivo: 'Separador',
                    configArquivo: '//'
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.retorno').should('exist')

    })

    it('PUT - Campo Descrição vazio (O campo de Descrição é obrigatório)', () => {
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute',
            qs: 
            {
                nome: 'Modelo ECD alterado pelo cy'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`,
                body: 
                {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Modelo ECD alterado pelo cy',
                    descricao: '',
                    tipoArquivo: 'Separador',
                    configArquivo: '//'
                },
                failOnStatusCode: false
            }).as('response')
        })

        cy.get('@response').then(resposta => {
            console.log(resposta)    
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.Descricao[0]).to.be.equal('O campo de Descrição é obrigatório')
        }) 
    })
    //ajustado EA-68
    it('PUT - Campo ConfigArquivo mais de 5 caracteres (O campo deve ter no máximo 5 caracteres)', () => {
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute',
            qs: 
            {
                nome: 'Modelo ECD alterado pelo cy'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`,
                body: 
                {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Modelo ECD alterado pelo cy',
                    descricao: 'Escrituração Contábil Digital alterado pelo cy',
                    tipoArquivo: 'Separador',
                    configArquivo: '||||||'
                },
                failOnStatusCode: false
            }).as('response')
        })

        cy.get('@response').then(resposta => {
            console.log(resposta)    
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.ConfigArquivo[0]).to.be.equal('O campo deve ter no máximo 5 caracteres')
        }) 
    })

    it('PUT - Campo Nome vazio (O campo de Nome é obrigatório)', () => {
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute',
            qs: 
            {
                nome: 'Modelo ECD alterado pelo cy'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`,
                body: 
                {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: '',
                    descricao: 'Escrituração Contábil Digital alterado pelo cy',
                    tipoArquivo: 'Separador',
                    configArquivo: '//'
                },
                failOnStatusCode: false
            }).as('response')
        })

        cy.get('@response').then(resposta => {
            console.log(resposta)    
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.Nome[0]).to.be.equal('O campo de Nome é obrigatório')
        }) 
    })

    it('PUT - Campo idEscopo vazio. Campo NÃO obrigatório', () => {
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute',
            qs: 
            {
                nome: 'Modelo ECD alterado pelo cy'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`,
                body: 
                {
                    idEscopo: '',
                    nome: 'Modelo ECD alterado pelo cy',
                    descricao: 'Escrituração Contábil Digital alterado pelo cy',
                    tipoArquivo: 'Separador',
                    configArquivo: '//'
                },
                failOnStatusCode: false
            }).as('response')
        })

        cy.get('@response').then(resposta => {
            console.log(resposta)    
            expect(resposta.status).to.be.equal(200)
            //expect(resposta.body.errors.idEscopo[0]).to.be.equal('O campo de idEscopo é obrigatório')
        }) 
    })

    it('PUT - Campo tipoArquivo vazio (O campo de TipoArquivo é obrigatório)', () => {
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute',
            qs: 
            {
                nome: 'Modelo ECD alterado pelo cy'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`,
                body: 
                {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Modelo ECD alterado pelo cy',
                    descricao: 'Escrituração Contábil Digital alterado pelo cy',
                    configArquivo: ''
                },
                failOnStatusCode: false
            }).as('response')
        })

        cy.get('@response').then(resposta => {
            console.log(resposta)    
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.TipoArquivo[0]).to.be.equal('O campo de TipoArquivo é obrigatório')
        }) 
    })

    it('PUT - Campo configArquivo vazio (O campo de ConfigArquivo é obrigatório)', () => {
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute',
            qs: 
            {
                nome: 'Modelo ECD alterado pelo cy'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`,
                body: 
                {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Modelo ECD alterado pelo cy',
                    descricao: 'Escrituração Contábil Digital alterado pelo cy',
                    tipoArquivo: 'Separador',
                    configArquivo: ''
                },
                failOnStatusCode: false
            }).as('response')
        })

        cy.get('@response').then(resposta => {
            console.log(resposta)    
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.ConfigArquivo[0]).to.be.equal('O campo de ConfigArquivo é obrigatório')
        }) 
    })

    it('DELETE - Cadastro de modelo', () => {
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute',
            qs: 
            {
                nome: 'Modelo ECD alterado pelo cy'
            }
        }).then (resposta => {
            cy.request({
                method: 'DELETE',
                url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`
            }).its('status').should('be.equal', 200)
        })
    })

    it('GET - Validando se modelo foi removido', () => {
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then (resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if(c.nome === 'Modelo ECD alterado pelo cy') nomeModelo = c.nome
            })
            expect(nomeModelo).not.be.equal ('Modelo ECD alterado pelo cy')
        })
    })

    it('DELETE - Cadastro de modelo com idEscopo vazio', () => {
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute',
            qs: 
            {
                nome: 'Modelo ECD Validacao cy'
            }
        }).then (resposta => {
            cy.request({
                method: 'DELETE',
                url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`
            }).its('status').should('be.equal', 200)
        })
    })
})

    describe(`Teste API modeloleiaute (Tipo Arquivo: Posicionamento)`, () => { 

        it('POST - Cadastrando um Modelo (Posicionamento) ', () => {
            cy.request({
                method: 'POST',
                url: '/ModeloLeiaute',
                body: 
                {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Modelo SINTEGRA cy',
                    descricao: 'Convênio ICMS cy',
                    tipoArquivo: 'Posicionamento'
                }
            }).its('status').should('be.equal', 200)

            // Validar POST
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).its('body.retorno').should('not.be.empty')

        })
        //EA-69 Ajustado
        it('POST - Cadastrando um Modelo com um Nome que já existe (Posicionamento) ', () => {
            cy.request({
                method: 'POST',
                url: '/ModeloLeiaute',
                body: 
                {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Modelo SINTEGRA cy',
                    descricao: 'Convênio ICMS teste cy',
                    tipoArquivo: 'Posicionamento'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)    
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors[""][0]).to.be.equal('Já existe um Modelo Leiaute com o nome especificado')
            })
        })

        it('POST - Todos os Campo obrigatórios vazios', () => {
            cy.request({
                method: 'POST',
                url: '/ModeloLeiaute',
                body: {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: '',
                    descricao: '',
                    tipoArquivo: 'Posicionamento'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)    
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Descricao[0]).to.be.equal('O campo de Descrição é obrigatório')
                expect(resposta.body.errors.Nome[0]).to.be.equal('O campo de Nome é obrigatório')
            })
        })

        it('POST - Campo Descrição vazio (O campo de Descrição é obrigatório)', () => {
            cy.request({
                method: 'POST',
                url: '/ModeloLeiaute',
                body: {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Modelo SINTEGRA validacao cy',
                    descricao: '',
                    tipoArquivo: 'Posicionamento'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)    
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Descricao[0]).to.be.equal('O campo de Descrição é obrigatório')
            })
        })

        it('POST - Campo Nome vazio (O campo de nome é obrigatório)', () => {
            cy.request({
                method: 'POST',
                url: '/ModeloLeiaute',
                body: {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: '',
                    descricao: 'Convênio ICMS validacao cy',
                    tipoArquivo: 'Posicionamento'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)    
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Nome[0]).to.be.equal('O campo de Nome é obrigatório')
            })
        })

        it('POST - Campo tipoArquivo vazio (O campo de TipoArquivo é obrigatório)', () => {
            cy.request({
                method: 'POST',
                url: '/ModeloLeiaute',
                body: {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Modelo SINTEGRA cy',
                    descricao: 'Convênio ICMS validacao cy'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)    
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.TipoArquivo[0]).to.be.equal('O campo de TipoArquivo é obrigatório')
            })
        })

        it('POST - Campo tipoArquivo inválido (O campo de TipoArquivo é obrigatório)', () => {
            cy.request({
                method: 'POST',
                url: '/ModeloLeiaute',
                body: {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Modelo SINTEGRA cy',
                    descricao: 'Convênio ICMS validacao cy',
                    tipoArquivo: 'Teste'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)    
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.TipoArquivo[0]).to.be.equal('O campo de TipoArquivo é obrigatório')
            })
        })

        it('POST - Campo configArquivo vazio (Campo NÃO obrigatório)', () => {
            cy.request({
                method: 'POST',
                url: '/ModeloLeiaute',
                body: {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Modelo SINTEGRA validacao cy',
                    descricao: 'Convênio ICMS validacao cy',
                    tipoArquivo: 'Posicionamento'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)    
                expect(resposta.status).to.be.equal(200)
            })
        })

        it('POST - Campo idEscopo vazio (Campo NÃO obrigatório)', () => {
            cy.request({
                method: 'POST',
                url: '/ModeloLeiaute',
                body: {
                    idEscopo: '',
                    nome: 'Modelo SINTEGRA validacao escopo cy',
                    descricao: 'Convênio ICMS validacao cy',
                    tipoArquivo: 'Posicionamento'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)    
                expect(resposta.status).to.be.equal(200)
            })
        })

        it('POST - Campo configArquivo preenchido (Campo NÃO obrigatório)', () => {
            cy.request({
                method: 'POST',
                url: '/ModeloLeiaute',
                body: {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Modelo SINTEGRA validacao configArquivo cy',
                    descricao: 'Convênio ICMS validacao cy',
                    tipoArquivo: 'Posicionamento',
                    configArquivo: '//'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)    
                expect(resposta.status).to.be.equal(200)
            })
        })

        it('PUT - Alterando (Nome e Descrição) um modelo já cadastrado', () => {
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute',
                qs: 
                {
                    nome: 'Modelo SINTEGRA cy'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`,
                    body: 
                    {
                        idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                        nome: 'Modelo SINTEGRA alterado pelo cy',
                        descricao: 'Convênio ICMS alterado pelo cy',
                        tipoArquivo: 'Posicionamento'
                    }
                }).as('response')
            })
            cy.get('@response').its('status').should('be.equal', 200)
            cy.get('@response').its('body.retorno').should('exist')

        })

        it('PUT - Campo Descrição vazio (O campo de Descrição é obrigatório)', () => {
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute',
                qs: 
                {
                    nome: 'Modelo SINTEGRA alterado pelo cy'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`,
                    body: 
                    {
                        idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                        nome: 'Modelo SINTEGRA alterado pelo cy',
                        descricao: '',
                        tipoArquivo: 'Posicionamento'
                    },
                    failOnStatusCode: false
                }).as('response')
            })

            cy.get('@response').then(resposta => {
                console.log(resposta)    
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Descricao[0]).to.be.equal('O campo de Descrição é obrigatório')
            }) 
        })

        it('PUT - Campo Nome vazio (O campo de Nome é obrigatório)', () => {
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute',
                qs: 
                {
                    nome: 'Modelo SINTEGRA alterado pelo cy'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`,
                    body: 
                    {
                        idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                        nome: '',
                        descricao: 'Convênio ICMS alterado pelo cy',
                        tipoArquivo: 'Posicionamento'
                    },
                    failOnStatusCode: false
                }).as('response')
            })

            cy.get('@response').then(resposta => {
                console.log(resposta)    
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Nome[0]).to.be.equal('O campo de Nome é obrigatório')
            }) 
        })

        it('PUT - Campo tipoArquivo vazio (O campo de TipoArquivo é obrigatório)', () => {
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute',
                qs: 
                {
                    nome: 'Modelo SINTEGRA alterado pelo cy'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`,
                    body: 
                    {
                        idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                        nome: 'Modelo SINTEGRA alterado pelo cy',
                        descricao: 'Convênio ICMS alterado pelo cy'
                    },
                    failOnStatusCode: false
                }).as('response')
            })

            cy.get('@response').then(resposta => {
                console.log(resposta)    
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.TipoArquivo[0]).to.be.equal('O campo de TipoArquivo é obrigatório')
            }) 
        })

        it('PUT - Campo idEscopo vazio. Campo NÃO obrigatório', () => {
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute',
                qs: 
                {
                    nome: 'Modelo SINTEGRA alterado pelo cy'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`,
                    body: 
                    {
                        idEscopo: '',
                        nome: 'Modelo SINTEGRA alterado pelo cy',
                        descricao: 'Convênio ICMS alterado pelo cy',
                        tipoArquivo: 'Posicionamento'
                    },
                    failOnStatusCode: false
                }).as('response')
            })

            cy.get('@response').then(resposta => {
                console.log(resposta)    
                expect(resposta.status).to.be.equal(200)
                //expect(resposta.body.errors.idEscopo[0]).to.be.equal('O campo de idEscopo é obrigatório')
            }) 
        })

        it('DELETE - Cadastro de modelo', () => {
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute',
                qs: 
                {
                    nome: 'Modelo SINTEGRA alterado pelo cy'
                }
            }).then (resposta => {
                cy.request({
                    method: 'DELETE',
                    url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`
                }).its('status').should('be.equal', 200)
            })
        })

        it('GET - Validando se modelo foi removido', () => {
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then (resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if(c.nome === 'Modelo SINTEGRA alterado pelo cy') nomeModelo = c.nome
                })
                expect(nomeModelo).not.be.equal ('Modelo SINTEGRA alterado pelo cy')
            })
        })

        it('DELETE - Cadastro de modelo com configArquivo vazio', () => {
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute',
                qs: 
                {
                    nome: 'Modelo SINTEGRA validacao cy'
                }
            }).then (resposta => {
                cy.request({
                    method: 'DELETE',
                    url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`
                }).its('status').should('be.equal', 200)
            })
        })

        it('DELETE - Cadastro de modelo com idEscopo vazio', () => {
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute',
                qs: 
                {
                    nome: 'Modelo SINTEGRA validacao escopo cy'
                }
            }).then (resposta => {
                cy.request({
                    method: 'DELETE',
                    url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`
                }).its('status').should('be.equal', 200)
            })
        })

        it('DELETE - Cadastro de modelo com configArquivo preenchido', () => {
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute',
                qs: 
                {
                    nome: 'Modelo SINTEGRA validacao configArquivo cy'
                }
            }).then (resposta => {
                cy.request({
                    method: 'DELETE',
                    url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`
                }).its('status').should('be.equal', 200)
            })
        })
    })
        describe(`Teste API modeloleiaute (Filtros)`, () => { 
            it('GET: [Termo] - (Listar todos) Filtrar modelos pelo Nome = ECF', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        Termo: 'ECF'
                    }
                }) .then (resposta => {
                        let termoNomeModelo = null
                        resposta.body.retorno.forEach(c => {
                            if(c.termo === 'ECF') termoNomeModelo = c.termo
                    })
                    expect(resposta.body.retorno[0].nome).to.contain('ECF')
                }) 
            })

            it('GET: [Termo] - (Listar todos) Filtrar modelos pela Descricao = PIS/Pasep', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        Termo: 'PIS/Pasep'
                    }
                }) .then (resposta => {
                        let termoDescricaoModelo = null
                        resposta.body.retorno.forEach(c => {
                            if(c.termo === 'PIS/Pasep') termoDescricaoModelo = c.termo
                    })
                    console.log(resposta)
                    expect(resposta.body.retorno[0].descricao).to.contain('PIS/Pasep')
                }) 
            })

            it('GET - (Listar todos) Filtrar modelos pelo Nome (Parte do nome)', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        nome: 'SINTEGRA'
                    }
                }) .then (resposta => {
                        let tipoArquivoModelo = null
                        resposta.body.retorno.forEach(c => {
                            if(c.tipoA === 'SINTEGRA') tipoArquivoModelo = c.tipoA
                    })
                    console.log(resposta)
                    expect(resposta.body.retorno[0].nome).to.contain('SINTEGRA')
                    
                }) 
            })

            it('GET - (Listar todos) Filtrar modelos pelo Tipo = Sistema', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        Tipo: 'Sistema'
                    }
                }) .then (resposta => {
                        let tipoModelo = null
                        resposta.body.retorno.forEach(c => {
                            if(c.tipo === 'Sistema') tipoModelo = c.tipo
                    })
                    expect(tipoModelo).to.be.equal ('Sistema')
                }) 
            })
            //*
            it('GET - (Listar todos) Filtrar modelos pelo tipoArquivo = Posicionamento', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        tiposArquivos: 'Posicionamento'
                    }
                }).then (resposta => {
                        let tipoArquivoModelo = null
                        resposta.body.retorno.forEach(c => {
                            if(c.tipoArquivo === 'Posicionamento') tipoArquivoModelo = c.tipoArquivo
                    })
                    console.log(resposta.body.retorno[0].tipoArquivo)
                    expect(resposta.body.retorno[0].tipoArquivo).to.contain('Posicionamento')
                }) 
            })

            it('GET - (Listar todos) Filtrar modelos pelo tipoArquivo = Separador', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        tipoArquivo: 'Separador'
                    }
                }) .then (resposta => {
                        let tipoArquivoModelo = null
                        resposta.body.retorno.forEach(c => {
                            if(c.tipoA === 'Separador') tipoArquivoModelo = c.tipoA
                    })
                    console.log(resposta)
                    expect(resposta.body.retorno[0].tipoArquivo).to.be.equal('Separador')
                }) 
            })

            it('GET - (Listar todos) Quando não existir registros correspondentes com a busca', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        nome: 'casa'
                    }
                }) .then (resposta => {
                        let tipoArquivoModelo = null
                        resposta.body.retorno.forEach(c => {
                            if(c.tipoA === 'casa') tipoArquivoModelo = c.tipoA
                    })
                    console.log(resposta)
                    expect(resposta.body.paginacao.totalPorPagina).to.be.equal(0)
                    
                }) 
            })
            //*
            it('GET - (Listar todos) Filtrar modelos pelo idEscopo', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        IdsEscopos: `e42e933a-3332-4c51-acd4-6c6c274975a0`
                    }
                }) .then (resposta => {
                        let idEscopoModelo = null
                        resposta.body.retorno.forEach(c => {
                            if(c.idE === `e42e933a-3332-4c51-acd4-6c6c274975a0`) idEscopoModelo = c.idE
                    })
                    console.log(resposta.body.retorno[0].idEscopo)
                    expect(resposta.body.retorno[0].idEscopo).to.be.equal(`e42e933a-3332-4c51-acd4-6c6c274975a0`)
                }) 
            })

            it('GET - Listar todos) Aplicar Filtro ordenando por Nome (desc)', () => {
                //Populando modelos para o teste
                cy.request({
                    method: 'POST',
                    url: '/ModeloLeiaute',
                    body: 
                    {
                        idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                        nome: 'AA Modelo SINTEGRA cy',
                        descricao: 'AA Convênio ICMS cy',
                        tipoArquivo: 'Posicionamento'
                    }
                }).its('status').should('be.equal', 200)

                cy.request({
                    method: 'POST',
                    url: '/ModeloLeiaute',
                    body: 
                    {
                        idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                        nome: 'ZZ Modelo SINTEGRA cy',
                        descricao: 'ZZ Convênio ICMS cy',
                        tipoArquivo: 'Posicionamento'
                    }
                }).its('status').should('be.equal', 200)

                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        Ordenacao: `nome desc`
                    }
                }) .then (resposta => {
                        
                    console.log(resposta.body.retorno[0].nome)
                    expect(resposta.body.retorno[0].nome).to.contain(`ZZ`)
                }) 
            })
            
            it('GET - Listar todos) Aplicar Filtro ordenando por Nome (asc)', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        Ordenacao: `nome asc`
                    }
                }) .then (resposta => {
                        
                    console.log(resposta.body.retorno[0].nome)
                    expect(resposta.body.retorno[0].nome).to.contain(`AA`)
                }) 
            })

            it('GET - Listar todos) Aplicar Filtro ordenando por Descrição (desc)', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        Ordenacao: `descricao desc`
                    }
                }) .then (resposta => {
                        
                    console.log(resposta.body.retorno[0].descricao)
                    expect(resposta.body.retorno[0].descricao).to.contain(`ZZ`)
                }) 
            })

            it('GET - Listar todos) Aplicar Filtro ordenando por Descrição (desc)', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        Ordenacao: `descricao desc`
                    }
                }) .then (resposta => {
                        
                    console.log(resposta.body.retorno[0].descricao)
                    expect(resposta.body.retorno[0].descricao).to.contain(`ZZ`)
                }) 
            })

            it('GET - Listar todos) Aplicar Filtro ordenando por Descrição (asc)', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        Ordenacao: `descricao asc`
                    }
                }) .then (resposta => {
                        
                    console.log(resposta.body.retorno[0].descricao)
                    expect(resposta.body.retorno[0].descricao).to.contain(`AA`)
                }) 
            })

            it('GET - Listar todos) Aplicar Filtro ordenando por Tipo de arquivo (desc)', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        Ordenacao: `TipoArquivo desc`
                    }
                }) .then (resposta => {
                        
                    console.log(resposta.body.retorno[0].descricao)
                    expect(resposta.body.retorno[0].tipoArquivo).to.contain(`Separador`)
                }) 
            })

            it('GET - Listar todos) Aplicar Filtro ordenando por Tipo de arquivo (asc)', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        Ordenacao: `TipoArquivo asc`
                    }
                }) .then (resposta => {
                        
                    console.log(resposta.body.retorno[0].descricao)
                    expect(resposta.body.retorno[0].tipoArquivo).to.contain(`Posicionamento`)
                }) 
            })

            it('DELETE - Removendo o Modelo utilizado nos testes de ordenação', () => {
                //apagando o primeiro modelo
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        nome: 'AA Modelo SINTEGRA cy'
                    }
                }).then (resposta => {
                    cy.request({
                        method: 'DELETE',
                        url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`
                    }).its('status').should('be.equal', 200)
                })
                //apagando o segundo modelo
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs: 
                    {
                        nome: 'ZZ Modelo SINTEGRA cy'
                    }
                }).then (resposta => {
                    cy.request({
                        method: 'DELETE',
                        url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`
                    }).its('status').should('be.equal', 200)
                })
            })

        })
            describe(`Teste API modeloleiaute (Limite de caracteres)`, () => { 

                it('POST - Limite de caracteres - Nome [50]', () => {
                    cy.request({
                        method: 'POST',
                        url: '/ModeloLeiaute',
                        body: {
                            idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                            nome: 'Modelo ECD alterado cy. Este manual visa a orientar a execução dos serviços',
                            descricao: 'Escrituração Contábil Digital Validacao cy',
                            tipoArquivo: 'Separador',
                            configArquivo: '||'
                        },
                        failOnStatusCode: false
                    }).as('response')
            
                    cy.get('@response').then(resposta => {
                        console.log(resposta)    
                        expect(resposta.status).to.be.equal(400)
                        expect(resposta.body.errors.Nome[0]).to.be.equal('O campo deve ter no máximo 50 caracteres')
                    })
                })

                it('POST - Limite de caracteres - Descrição [150]', () => {
                    cy.request({
                        method: 'POST',
                        url: '/ModeloLeiaute',
                        body: {
                            idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                            nome: 'Modelo ECD alterado cy. Este manual visa a orientar a execução dos serviços',
                            descricao: 'Escrituração Contábil Digital Validacao cy. Este manual visa a orientar a execução dos serviços destinados à emissão de documentos e escrituração de livros fiscais',
                            tipoArquivo: 'Separador',
                            configArquivo: '||'
                        },
                        failOnStatusCode: false
                    }).as('response')
            
                    cy.get('@response').then(resposta => {
                        console.log(resposta)    
                        expect(resposta.status).to.be.equal(400)
                        expect(resposta.body.errors.Descricao[0]).to.be.equal('O campo deve ter no máximo 150 caracteres')
                    })
                })

                it('POST - Mais de 5 caracteres no ConfigArquivo (O campo deve ter no máximo 5 caracteres)', () => {
                    cy.request({
                        method: 'POST',
                        url: '/ModeloLeiaute',
                        body: {
                            idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                            nome: 'Modelo ECD Validacao cy',
                            descricao: 'Escrituração Contábil Digital Validacao cy',
                            tipoArquivo: 'Separador',
                            configArquivo: ';;;;;;'
                        },
                        failOnStatusCode: false
                    }).as('response')
            
                    cy.get('@response').then(resposta => {
                        console.log(resposta)    
                        expect(resposta.status).to.be.equal(400)
                        expect(resposta.body.errors.ConfigArquivo[0]).to.be.equal('O campo deve ter no máximo 5 caracteres')
                    })
                })
                //*
                it('POST - Cadastrando um Modelo para teste (Posicionamento)', () => {
                    cy.request({
                        method: 'POST',
                        url: '/ModeloLeiaute',
                        body: 
                        {
                            idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                            nome: 'Modelo SINTEGRA para teste cy',
                            descricao: 'Convênio ICMS para teste cy',
                            tipoArquivo: 'Posicionamento'
                        }
                    }).its('status').should('be.equal', 200)
        
                    // Validar POST
                    cy.request({
                        method: 'GET',
                        url: '/ModeloLeiaute'
                    }).then(resposta => {
                        let codigoLeiaute = null
                        resposta.body.retorno.forEach(c => {
                            if (c.nome === 'Modelo SINTEGRA para teste cy') codigoLeiaute = c.nome
                        })
                        expect(codigoLeiaute).to.be.equal('Modelo SINTEGRA para teste cy')
                    })
        
                })

                it('PUT - Limite de caracteres - Nome [50]', () => {
                    cy.request({
                        method: 'GET',
                        url: '/ModeloLeiaute',
                        qs: 
                        {
                            nome: 'Modelo SINTEGRA para teste cy'
                        }
                    }).then(resposta => {
                        cy.request({
                            method: 'PUT',
                            url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`,
                            body: 
                            {
                                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                                nome: 'Modelo ECD alterado cy. Este manual visa a orientar a execução dos serviços',
                                descricao: 'Convênio ICMS alterado pelo cy',
                                tipoArquivo: 'Posicionamento'
                            },
                            failOnStatusCode: false
                        }).as('response')
                    })
        
                    cy.get('@response').then(resposta => {
                        console.log(resposta)    
                        expect(resposta.status).to.be.equal(400)
                        expect(resposta.body.errors.Nome[0]).to.be.equal('O campo deve ter no máximo 50 caracteres')
                    }) 
                })

                it('PUT - Limite de caracteres - Descrição [150]', () => {
                    cy.request({
                        method: 'GET',
                        url: '/ModeloLeiaute',
                        qs: 
                        {
                            nome: 'Modelo SINTEGRA para teste cy'
                        }
                    }).then(resposta => {
                        cy.request({
                            method: 'PUT',
                            url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`,
                            body: 
                            {
                                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                                nome: 'Modelo SINTEGRA para teste cy',
                                descricao: 'Escrituração Contábil Digital Validacao cy. Este manual visa a orientar a execução dos serviços destinados à emissão de documentos e escrituração de livros fiscais',
                                tipoArquivo: 'Posicionamento'
                            },
                            failOnStatusCode: false
                        }).as('response')
                    })
        
                    cy.get('@response').then(resposta => {
                        console.log(resposta)    
                        expect(resposta.status).to.be.equal(400)
                        expect(resposta.body.errors.Descricao[0]).to.be.equal('O campo deve ter no máximo 150 caracteres')
                    }) 
                })

                it('DELETE - Removendo o Modelo utilizado no teste (Posicionamento)', () => {
                    cy.request({
                        method: 'GET',
                        url: '/ModeloLeiaute',
                        qs: 
                        {
                            nome: 'Modelo SINTEGRA para teste cy'
                        }
                    }).then (resposta => {
                        cy.request({
                            method: 'DELETE',
                            url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`
                        }).its('status').should('be.equal', 200)
                    })
                })

            })
               
