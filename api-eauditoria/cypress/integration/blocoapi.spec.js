/// <reference types= "cypress" />


describe(`1 - Testes API - Cadastro de Bloco (POST)`, () => {

    it('A - POST - Cadastrando um Bloco', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                //idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Teste para versão',
                descricao: 'Escrituração Contábil Digital alterado cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Teste para versão') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '112233',
                    descricao: 'Leiaute 005 do modelo EFD Contribuições cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-02-03T02:00:00',
                        fim: '2025-04-03T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
            cy.request({
                method: 'GET',
                url: '/Leiaute'
            }).then(resposta => {
                let codigoLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.codigo === '112233') codigoLeiaute = c.codigo
                })
                expect(codigoLeiaute).to.be.equal('112233')
            })
        })
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {

            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '112233') codigoLeiaute = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (codigoLeiaute),
                    codigo: '1741',
                    descricao: 'Versão 10.99',
                    publicacao: '2025-01-01T02:00:00',
                    status: 'Ativo'

                }
            }).its('status').should('be.equal', 200)
            // Buscar pela versão e cadastrar um bloco   
            cy.request({
                method: 'GET',
                url: '/Versao'
            }).then(resposta => {

                let codigoVersao = null
                resposta.body.retorno.forEach(c => {
                    if (c.codigo === '1741') codigoVersao = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
                cy.request({
                    method: 'POST',
                    url: '/Bloco',
                    body:
                    {
                        idVersao: (codigoVersao),
                        ordem: 1,
                        bloco: '18',
                        nome: 'Bloco 1 API',
                        descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'

                    }
                }).its('status').should('be.equal', 200)

            })
        })
    })

    it('B - POST - Cadastrando um Bloco com um idVersao que não existe (Não foi possível encontrar o Bloco especificado)', () => {
        cy.request({
            method: 'POST',
            url: '/Bloco',
            body: {
                idVersao: 'c5050740-2871-423b-9354-24b413a8fdd5',
                ordem: 1,
                bloco: '1',
                nome: 'Bloco 1 API',
                descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(resposta => {
            console.log(resposta)
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors[""][0]).to.be.equal('Não foi possível encontrar o Versão especificado')
        })
    })

    it('C - POST - Campo Bloco duplicado (Já existe um Bloco com este nome)', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Modelo Bloco ducplicado',
                descricao: 'Escrituração Contábil Digital alterado cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)

        // Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Modelo Bloco ducplicado') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '7182',
                    descricao: 'Leiaute 7182 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2024-12-01T02:00:00',
                        fim: '2024-12-31T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o leiaute registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '7182') codigoLeiaute = c.id
            })
            //Cadastrando o Versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (codigoLeiaute),
                    codigo: '1099',
                    descricao: 'Duplicidade código 10.99',
                    publicacao: '2025-02-01T02:00:00',
                    status: 'Ativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)
        })
        //Buscar a versão
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let codigoVersao = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '1099') codigoVersao = c.id
            })
            // Cadastrando o Bloco utilizando a versão
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body:
                {
                    idVersao: (codigoVersao),
                    ordem: 1,
                    bloco: '19667',
                    nome: 'Bloco 2 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'

                }
            }).its('status').should('be.equal', 200)
            //Cadastrando o Bloco utilizando o ID da versão cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body:
                {
                    idVersao: (codigoVersao),
                    ordem: 2,
                    bloco: '19667',
                    nome: 'Bloco 2.1 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Bloco[0]).to.be.equal('Já existe um Bloco com este nome')
            })
        })
    })
    // EA-153  Criar tarefa para ajustar a mensagem de validação
    it('D - POST - Campo idVersao vazio (Não foi possível encontrar a Versão especificada)', () => {
        cy.request({
            method: 'POST',
            url: '/Bloco',
            body: {
                //idVersao: (codigoVersao),
                ordem: 2,
                bloco: '1',
                nome: 'Bloco 2.1 API',
                descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(resposta => {
            console.log(resposta)
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors[""][0]).to.be.equal('Não foi possível encontrar a Versão especificada')
            // expect(resposta.body.errors[""][0]).to.be.equal('Não foi possível encontrar o Versão especificado')
        })
      
    })

    it('E - POST - Todos os campos obrigatórios vazios', () => {
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {

            let nomeVersao = null
            resposta.body.retorno.forEach(c => {
                if (c.status === 'Ativo') nomeVersao = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body: {
                    idVersao: (nomeVersao),
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta.body.errors)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Bloco[0]).to.be.equal('O campo de Bloco é obrigatório')
                expect(resposta.body.errors.Descricao[0]).to.be.equal('O campo de Descrição é obrigatório')
                expect(resposta.body.errors.Nome[0]).to.be.equal('O campo de Nome é obrigatório')
            })
        })
    })

    it('F - POST - Campo Bloco vazio (O campo de Bloco é obrigatório)', () => {
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {

            let nomeVersao = null
            resposta.body.retorno.forEach(c => {
                if (c.status === 'Ativo') nomeVersao = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body: {
                    idVersao: (nomeVersao),
                    ordem: 2,
                    // bloco: '1',
                    nome: 'Bloco 2.1 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta.body.errors)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Bloco[0]).to.be.equal('O campo de Bloco é obrigatório')

            })
        })
    })

    it('G - POST - Campo Nome vazio (O campo de Nome é obrigatório)', () => {
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {

            let nomeVersao = null
            resposta.body.retorno.forEach(c => {
                if (c.status === 'Ativo') nomeVersao = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body: {
                    idVersao: (nomeVersao),
                    ordem: 3,
                    bloco: '3',
                    // nome: 'Bloco 2.1 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta.body.errors)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Nome[0]).to.be.equal('O campo de Nome é obrigatório')

            })
        })
    })

    it('H - POST - Campo Descricao vazio (O campo de Descrição é obrigatório)', () => {
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {

            let nomeVersao = null
            resposta.body.retorno.forEach(c => {
                if (c.status === 'Ativo') nomeVersao = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body: {
                    idVersao: (nomeVersao),
                    ordem: 3,
                    bloco: '3',
                    nome: 'Bloco 3.2 API'
                    // descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta.body.errors)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Descricao[0]).to.be.equal('O campo de Descrição é obrigatório')

            })
        })
    })

})
describe(`2 - Testes API - Cadastro de Bloco (PUT)`, () => {

    it('A - PUT - Alterar (Bloco) de um Bloco', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                //idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Alter bko',
                descricao: 'Teste bloco cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Alter bko') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '5926',
                    descricao: 'Leiaute 5926 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-06-04T02:00:00',
                        fim: '2025-07-03T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '5926') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '1699',
                    descricao: 'Versão 16.99',
                    publicacao: '2025-06-01T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let codversao = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '1699') codversao = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body:
                {
                    idVersao: (codversao),
                    ordem: 4,
                    bloco: '411',
                    nome: 'Bloco 4 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })

        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                bloco: '411'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Bloco/${resposta.body.retorno[0].id}`,
                body:
                {
                    idVersao: `${resposta.body.retorno[0].idVersao}`,
                    ordem: 4,
                    bloco: '4112',
                    nome: 'Bloco 4 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.retorno').should('exist')
        cy.request({
            method: 'GET',
            url: '/Bloco'
        }).then(resposta => {
            let nomeBloco = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Bloco 4 API') nomeBloco = c.nome
            })
            expect(nomeBloco).to.be.equal('Bloco 4 API')
        })
    })

    it('B - PUT - Alterar (Nome) de um Bloco', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Alterando Nome',
                descricao: 'Teste Nome cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Alterando Nome') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '5599',
                    descricao: 'Leiaute 5599 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-06-04T02:00:00',
                        fim: '2025-07-03T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '5599') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '1797',
                    descricao: 'Versão 1797',
                    publicacao: '2025-06-01T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let codversao = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '1797') codversao = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body:
                {
                    idVersao: (codversao),
                    ordem: 5,
                    bloco: '59',
                    nome: 'Bloco 5 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })

        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                bloco: '59'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Bloco/${resposta.body.retorno[0].id}`,
                body:
                {
                    idVersao: `${resposta.body.retorno[0].idVersao}`,
                    ordem: 5,
                    bloco: '59',
                    nome: 'Bloco 5.1 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.retorno').should('exist')
        cy.request({
            method: 'GET',
            url: '/Bloco'
        }).then(resposta => {
            let nomeBloco = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Bloco 5.1 API') nomeBloco = c.nome
            })
            expect(nomeBloco).to.be.equal('Bloco 5.1 API')
        })
    })

    it('C - PUT - Alterar (Descrição) de um Bloco', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Alterando descrição',
                descricao: 'Teste descrição cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Alterando descrição') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '7788',
                    descricao: 'Leiaute 7788 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-06-04T02:00:00',
                        fim: '2025-07-03T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '7788') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '9781',
                    descricao: 'Versão 9781',
                    publicacao: '2025-06-01T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let codversao = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '9781') codversao = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body:
                {
                    idVersao: (codversao),
                    ordem: 6,
                    bloco: '69',
                    nome: 'Bloco 6 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })

        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                bloco: '69'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Bloco/${resposta.body.retorno[0].id}`,
                body:
                {
                    idVersao: `${resposta.body.retorno[0].idVersao}`,
                    ordem: 6,
                    bloco: '69',
                    nome: 'Bloco 6.1 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO'
                },
                failOnStatusCode: false
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.retorno').should('exist')
        cy.request({
            method: 'GET',
            url: '/Bloco'
        }).then(resposta => {
            let nomeBloco = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Bloco 6.1 API') nomeBloco = c.nome
            })
            expect(nomeBloco).to.be.equal('Bloco 6.1 API')
        })
    })

    it('D - PUT - Alterar (Bloco) para vazio (O campo de Bloco é obrigatório)', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Alterando b vazio',
                descricao: 'Teste bloc cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Alterando b vazio') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '8856',
                    descricao: 'Leiaute 8856 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-06-04T02:00:00',
                        fim: '2025-07-03T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '8856') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '1898',
                    descricao: 'Versão 1898',
                    publicacao: '2025-06-01T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let codversao = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '1898') codversao = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body:
                {
                    idVersao: (codversao),
                    ordem: 7,
                    bloco: '79',
                    nome: 'Bloco 7 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })

        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                bloco: '79'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Bloco/${resposta.body.retorno[0].id}`,
                body:
                {
                    idVersao: `${resposta.body.retorno[0].idVersao}`,
                    ordem: 7,
                    //bloco: '79',
                    nome: 'Bloco 7 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).as('response')
        })

        cy.get('@response').then(resposta => {
            console.log(resposta)
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.Bloco[0]).to.be.equal('O campo de Bloco é obrigatório')

        })
    })

    it('E - PUT - Alterar (Nome) para vazio (O campo de Nome é obrigatório)', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Alterando Nm vazio',
                descricao: 'Teste nom cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Alterando Nm vazio') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '6774',
                    descricao: 'Leiaute 6774 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-06-04T02:00:00',
                        fim: '2025-07-03T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '6774') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '1561',
                    descricao: 'Versão 1561',
                    publicacao: '2025-06-01T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let codversao = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '1561') codversao = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body:
                {
                    idVersao: (codversao),
                    ordem: 8,
                    bloco: '89',
                    nome: 'Bloco 8 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })

        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                bloco: '89'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Bloco/${resposta.body.retorno[0].id}`,
                body:
                {
                    idVersao: `${resposta.body.retorno[0].idVersao}`,
                    ordem: 8,
                    bloco: '89',
                    // nome: 'Bloco 7 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
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

    it('F - PUT - Alterar (Descrição) para vazio (O campo de Descrição é obrigatório)', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Alterando Descric vazio',
                descricao: 'Teste Descric cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Alterando Descric vazio') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '8579',
                    descricao: 'Leiaute 8579 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-06-04T02:00:00',
                        fim: '2025-07-03T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '8579') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '46991',
                    descricao: 'Versão 46991',
                    publicacao: '2025-06-01T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let codversao = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '46991') codversao = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body:
                {
                    idVersao: (codversao),
                    ordem: 9,
                    bloco: '99',
                    nome: 'Bloco 9 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })

        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                bloco: '99'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Bloco/${resposta.body.retorno[0].id}`,
                body:
                {
                    idVersao: `${resposta.body.retorno[0].idVersao}`,
                    ordem: 9,
                    bloco: '99',
                    nome: 'Bloco 9 API',
                    // descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
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

    it('G - PUT - Alterar campo Bloco duplicado (Já existe um Bloco com este nome)', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Campo duplicado bloco',
                descricao: 'Teste Descric cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Campo duplicado bloco') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '77854',
                    descricao: 'Leiaute 77854 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-06-04T02:00:00',
                        fim: '2025-07-03T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '77854') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '58411',
                    descricao: 'Versão 58411',
                    publicacao: '2025-06-01T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let codversao = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '58411') codversao = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body:
                {
                    idVersao: (codversao),
                    ordem: 9,
                    bloco: '85',
                    nome: 'Bloco 9 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)
            // segundo bloco

            cy.request({
                method: 'GET',
                url: '/Versao'
            }).then(resposta => {
                let codigoversao = null
                resposta.body.retorno.forEach(c => {
                    if (c.codigo === '58411') codigoversao = c.id
                })

                cy.request({
                    method: 'POST',
                    url: '/Bloco',
                    body:
                    {
                        idVersao: (codigoversao),
                        ordem: 12,
                        bloco: '105',
                        nome: 'Bloco 101 API',
                        descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                    },
                    failOnStatusCode: false
                }).its('status').should('be.equal', 200)

            })
        })
        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                bloco: '105'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Bloco/${resposta.body.retorno[0].id}`,
                body:
                {
                    idVersao: `${resposta.body.retorno[0].idVersao}`,
                    ordem: 12,
                    bloco: '85',
                    nome: 'Bloco 12 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).as('response')
        })

        cy.get('@response').then(resposta => {
            console.log(resposta)
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.Bloco[0]).to.be.equal('Já existe um Bloco com este nome')

        })

    })

})

describe(`3 - Teste API Bloco (Filtros)`, () => {
    it('A - POST - Populando base com Bloco', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                //idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Teste Filtros bloco',
                descricao: 'Escrituração Contábil Digital alterado cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Teste Filtros bloco') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '965842',
                    descricao: 'Leiaute 005 do modelo EFD Contribuições cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-02-03T02:00:00',
                        fim: '2025-04-03T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
            cy.request({
                method: 'GET',
                url: '/Leiaute'
            }).then(resposta => {
                let codigoLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.codigo === '965842') codigoLeiaute = c.codigo
                })
                expect(codigoLeiaute).to.be.equal('965842')
            })
        })
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {

            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '965842') codigoLeiaute = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (codigoLeiaute),
                    codigo: '71489',
                    descricao: 'Versão 10.99',
                    publicacao: '2025-01-01T02:00:00',
                    status: 'Ativo'

                }
            }).its('status').should('be.equal', 200)
            // Buscar pela versão e cadastrar um bloco   
            cy.request({
                method: 'GET',
                url: '/Versao'
            }).then(resposta => {

                let codigoVersao = null
                resposta.body.retorno.forEach(c => {
                    if (c.codigo === '71489') codigoVersao = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
                cy.request({
                    method: 'POST',
                    url: '/Bloco',
                    body:
                    {
                        idVersao: (codigoVersao),
                        ordem: 1,
                        bloco: '21',
                        nome: 'Bloco 21 API',
                        descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'

                    }
                }).its('status').should('be.equal', 200)

            })
        })
    })

    it('B - GET - (Listar todos) Filtrar Bloco pelo Bloco', () => {
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                bloco: '21'
            }
        }).then(resposta => {
            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.cod === '21') codigoLeiaute = c.cod
            })
            console.log(resposta)
            expect(resposta.body.retorno[0].bloco).to.contain('21')

        })
    })

    it('C - GET - (Listar todos) Filtrar Bloco pela Descrição', () => {
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
            }
        }).then(resposta => {
            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.cod === 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS') codigoLeiaute = c.cod
            })
            console.log(resposta)
            expect(resposta.body.retorno[0].descricao).to.contain('ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS')

        })
    })

    it('D - GET - (Listar todos) Filtrar Bloco pelo Nome', () => {
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                nome: 'Bloco 21 API'
            }
        }).then(resposta => {
            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.cod === 'Bloco 21 API') codigoLeiaute = c.cod
            })
            console.log(resposta)
            expect(resposta.body.retorno[0].nome).to.contain('Bloco 21 API')

        })
    })

    it('E - GET - (Listar todos) Filtrar Bloco pelo Termo (Nome)', () => {
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                termo: 'Bloco 21 API'
            }
        }).then(resposta => {
            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.cod === 'Bloco 21 API') codigoLeiaute = c.cod
            })
            console.log(resposta)
            expect(resposta.body.retorno[0].nome).to.contain('Bloco 21 API')

        })
    })

    it('F - GET - (Listar todos) Filtrar Bloco pelo Termo (Bloco)', () => {
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                termo: '21'
            }
        }).then(resposta => {
            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.cod === 'Bloco 21 API') codigoLeiaute = c.cod
            })
            console.log(resposta)
            expect(resposta.body.retorno[0].nome).to.contain('Bloco 21 API')

        })
    })

    it('G - GET - (Listar todos) Filtrar Blocos por uma página especifica e que exista registros', () => {
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                'Paginacao.Pagina': '1'
            }
        }).then(resposta => {
            console.log(resposta)
            expect(resposta.body.retorno.length).to.be.above(1) //Validando se existema mais de 1 registro nessa página 
        })
    })

    it('H - GET - (Listar todos) Filtrar Blocos por uma página que NÃO exista registros', () => {
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                'Paginacao.Pagina': '1000'
            }
        }).then(resposta => {
            console.log(resposta)
            expect(resposta.body.retorno.length).to.be.equal(0)
            //Validando se na página 1000 o número de registros seja = 0
        })
    })

    it('I - GET - (Listar todos) Filtrar Blocos pelo total de páginas', () => {
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                'Paginacao.TotalPorPagina': '2'
            }
        }).then(resposta => {
            console.log(resposta)
            expect(resposta.body.retorno.length).to.be.equal(2)
            //Validando o total de registros disponíveis por página. Nesse teste são 2 por página
        })
    })

})

describe(`4 - Teste API Bloco (Validando: Limite de caracteres)`, () => {
    it('A - POST - Limite de caracteres - Bloco [50]', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Limite bloc',
                descricao: 'Teste bloc cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Limite bloc') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '958641',
                    descricao: 'Leiaute 958641 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-06-04T02:00:00',
                        fim: '2025-07-03T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '958641') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '81279',
                    descricao: 'Versão 16.99',
                    publicacao: '2025-06-01T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let codversao = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '81279') codversao = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body:
                {
                    idVersao: (codversao),
                    ordem: 4,
                    bloco: '11987452445214587459632514785496325174789658214578965214785',
                    nome: 'Bloco 4 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Bloco[0]).to.be.equal('O campo deve ter no máximo 50 caracteres')
            })
        })


    })

    it('B - PUT - Limite de caracteres - Bloco [50]', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Alterar bloco limite max',
                descricao: 'Teste bloc cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Alterar bloco limite max') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '951738',
                    descricao: 'Leiaute 951738 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-06-04T02:00:00',
                        fim: '2025-07-03T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '951738') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '84695',
                    descricao: 'Versão 16.99',
                    publicacao: '2025-06-01T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let codversao = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '84695') codversao = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body:
                {
                    idVersao: (codversao),
                    ordem: 4,
                    bloco: '4',
                    nome: 'Bloco 4 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })

        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                bloco: '4'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Bloco/${resposta.body.retorno[0].id}`,
                body:
                {
                    idVersao: `${resposta.body.retorno[0].idVersao}`,
                    ordem: 4,
                    bloco: '11987452445214587459632514785496325174789658214578965214785',
                    nome: 'Bloco 4 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).as('response')
            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Bloco[0]).to.be.equal('O campo deve ter no máximo 50 caracteres')
            })
        })
    })

    it('C - POST - Limite de caracteres - Nome [50]', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Campo Nome Limite',
                descricao: 'Teste bloc cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Campo Nome Limite') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '96321',
                    descricao: 'Leiaute 96321 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-06-04T02:00:00',
                        fim: '2025-07-03T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '96321') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '856545',
                    descricao: 'Versão 16.99',
                    publicacao: '2025-06-01T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let codversao = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '856545') codversao = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body:
                {
                    idVersao: (codversao),
                    ordem: 4,
                    bloco: '144',
                    nome: '11987452445214587459632514785496325174789658214578965214785',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Nome[0]).to.be.equal('O campo deve ter no máximo 50 caracteres')
            })
        })
    })

    it('D - PUT - Limite de caracteres - Nome [50]', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Campo Nome alterar limite max',
                descricao: 'Teste bloc cy',
                tipoArquivo: 'Separador',
                configArquivo: '|'
            }
        }).its('status').should('be.equal', 200)
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Campo Nome alterar limite max') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '95124',
                    descricao: 'Leiaute 95124 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-06-04T02:00:00',
                        fim: '2025-07-03T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '95124') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '1983',
                    descricao: 'Versão 16.99',
                    publicacao: '2025-06-01T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let codversao = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '1983') codversao = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body:
                {
                    idVersao: (codversao),
                    ordem: 47,
                    bloco: '155',
                    nome: 'Bloco 4 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })

        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                bloco: '155'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Bloco/${resposta.body.retorno[0].id}`,
                body:
                {
                    idVersao: `${resposta.body.retorno[0].idVersao}`,
                    ordem: 4,
                    bloco: '155',
                    nome: '11987452445214587459632514785496325174789658214578965214785',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'
                },
                failOnStatusCode: false
            }).as('response')
            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Nome[0]).to.be.equal('O campo deve ter no máximo 50 caracteres')
            })
        })
    })

})

describe('5 - Testes API Leiaute - Clonar', () => {

    it('A - POST - Clonar Bloco', () => {
        cy.cadastrarModelo('Modelo Clone bloco')  //Cadastrando um modelo pra utilizar nos testes de Leiaute

        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Modelo Clone bloco') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '48891',
                    descricao: 'Leiaute 48891 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-09-04T02:00:00',
                        fim: '2025-10-03T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '48891') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '2356',
                    descricao: 'Versão 2356',
                    publicacao: '2025-06-11T02:00:00',
                    status: 'Ativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)
        })
        // Buscar pela versão e cadastrar um bloco   
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {

            let codigoVersao = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '2356') codigoVersao = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body:
                {
                    idVersao: (codigoVersao),
                    ordem: 23,
                    bloco: '23',
                    nome: 'Bloco 23 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'

                }
            }).its('status').should('be.equal', 200)
            //Buscar a versão cadastrada anteriormente para alterar o campo descrição
            cy.request({
                method: 'GET',
                url: '/Bloco',
                qs:
                {
                    bloco: '23'
                }
            }).then(resposta => {
                cy.request({
                    method: 'POST',
                    url: `/Bloco/${resposta.body.retorno[0].id}/clone`,
                    // body:
                    // {
                    //     idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                    //     codigo: '11987452445214587459632514785496325174789658214578965214785',
                    //     descricao: 'Versão 119',
                    //     publicacao: '2025-06-11T02:00:00',
                    //     status: 'Inativo'
                    // },
                    failOnStatusCode: false
                }).as('response')
                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(200)

                    cy.request({
                        method: 'GET',
                        url: '/Bloco'
                    }).then(resposta => {
                        let ordemBloco = null
                        let nomeBloco = null
                        let descLeiaute = null

                        resposta.body.retorno.forEach(c => {
                            if (c.bloco === '24') ordemBloco = c.bloco
                            if (c.nome === 'Bloco 23 API') nomeBloco = c.nome
                            if (c.descricao === 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS') descLeiaute = c.descricao
                        })
                        expect(ordemBloco).to.be.equal('24')
                        expect(nomeBloco).to.be.equal('Bloco 23 API')
                        expect(descLeiaute).to.be.equal('ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS')
                    })
                })
            })
        })
    })
})

describe('6 - Testes API Leiaute - Ordem', () => {

    it('A - PUT - Alterando a ordem dos Blocos', () => {
        cy.cadastrarModelo('Modelo ordenamento de bloco')  //Cadastrando um modelo pra utilizar nos testes de Leiaute

        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Modelo ordenamento de bloco') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '60988',
                    descricao: 'Leiaute 60988 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-09-04T02:00:00',
                        fim: '2025-10-03T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '60988') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '232510',
                    descricao: 'Versão 2356',
                    publicacao: '2025-06-11T02:00:00',
                    status: 'Ativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)
        })
        // Buscar pela versão e cadastrar um bloco   
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {

            let codigoVersao = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '232510') codigoVersao = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Bloco',
                body:
                {
                    idVersao: (codigoVersao),
                    ordem: 1,
                    bloco: '51',
                    nome: 'Bloco 51 API',
                    descricao: 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS'

                }
            }).its('status').should('be.equal', 200)
            //Buscar a versão cadastrada anteriormente para alterar o campo descrição
            cy.request({
                method: 'GET',
                url: '/Bloco',
                qs:
                {
                    bloco: '51'
                }
            }).then(resposta => {
                cy.request({
                    method: 'POST',
                    url: `/Bloco/${resposta.body.retorno[0].id}/clone`,
                    // body:
                    // {
                    //     idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                    //     codigo: '11987452445214587459632514785496325174789658214578965214785',
                    //     descricao: 'Versão 119',
                    //     publicacao: '2025-06-11T02:00:00',
                    //     status: 'Inativo'
                    // },
                    failOnStatusCode: false
                }).as('response')
                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(200)

                    cy.request({
                        method: 'GET',
                        url: '/Bloco'
                    }).then(resposta => {
                        let ordemBloco = null
                        let nomeBloco = null
                        let descLeiaute = null

                        resposta.body.retorno.forEach(c => {
                            if (c.bloco === '52') ordemBloco = c.bloco
                            if (c.nome === 'Bloco 51 API') nomeBloco = c.nome
                            if (c.descricao === 'ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS') descLeiaute = c.descricao
                        })
                        expect(ordemBloco).to.be.equal('52')
                        expect(nomeBloco).to.be.equal('Bloco 51 API')
                        expect(descLeiaute).to.be.equal('ABERTURA, IDENTIFICAÇÃO E REFERÊNCIAS')
                    })
                })
            })
        })

        cy.request({
            method: 'GET',
            url: '/Bloco',
            qs:
            {
                bloco: '51'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Bloco/${resposta.body.retorno[0].id}/ordem`,
                body:
                {
                    ordem: 2
                },
                failOnStatusCode: false
            }).as('response')
            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(200)
            })
        })







    })
})

describe('7 - Testes API Leiaute - DELETE', () => {
        
    it('A - DELETE - Cadastro de Bloco (1 - A)', () => {
        cy.excluirBloco(18)
        cy.excluirVersao(1741)
        cy.excluirLeiaute(112233)
        cy.excluirModelo('Teste para versão')
    })

    it('B - DELETE - Cadastro de Bloco (1 - C)', () => {
        cy.excluirBloco(19667)
        cy.excluirVersao(1099)
        cy.excluirLeiaute(7182)
        cy.excluirModelo('Modelo Bloco ducplicado')
    })

    it('C - DELETE - Cadastro de Bloco (2 - A)', () => {
        cy.excluirBloco(4112)
        cy.excluirVersao(1699)
        cy.excluirLeiaute(5926)
        cy.excluirModelo('Alter bko')
    })

    it('D - DELETE - Cadastro de Bloco (2 - B)', () => {
        cy.excluirBloco(59)
        cy.excluirVersao(1797)
        cy.excluirLeiaute(5599)
        cy.excluirModelo('Alterando Nome')
    })

    it('E - DELETE - Cadastro de Bloco (2 - C)', () => {
        cy.excluirBloco(69)
        cy.excluirVersao(9781)
        cy.excluirLeiaute(7788)
        cy.excluirModelo('Alterando descrição')
    })

    it('F - DELETE - Cadastro de Bloco (2 - D)', () => {
        cy.excluirBloco(79)
        cy.excluirVersao(1898)
        cy.excluirLeiaute(8856)
        cy.excluirModelo('Alterando b vazio')
    })

    it('G - DELETE - Cadastro de Bloco (2 - E)', () => {
        cy.excluirBloco(89)
        cy.excluirVersao(1561)
        cy.excluirLeiaute(6774)
        cy.excluirModelo('Alterando Nm vazio')
    })

    it('H - DELETE - Cadastro de Bloco (2 - F)', () => {
        cy.excluirBloco(99)
        cy.excluirVersao(46991)
        cy.excluirLeiaute(8579)
        cy.excluirModelo('Alterando Descric vazio')
    })

    it('I - DELETE - Cadastro de Bloco (2 - G)', () => {
        cy.excluirBloco(105)
        cy.excluirBloco(85)
        cy.excluirVersao(58411)
        cy.excluirLeiaute(77854)
        cy.excluirModelo('Campo duplicado bloco')
    })

    it('J - DELETE - Cadastro de Bloco (3 - A)', () => {
        cy.excluirBloco(21)
        cy.excluirVersao(71489)
        cy.excluirLeiaute(965842)
        cy.excluirModelo('Teste Filtros bloco')
    })

    it('K - DELETE - Cadastro de Bloco (4 - A)', () => {
        
        cy.excluirVersao(81279)
        cy.excluirLeiaute(958641)
        cy.excluirModelo('Limite bloc')
    })

    it('L - DELETE - Cadastro de Bloco (4 - B)', () => {
        cy.excluirBloco(4)
        cy.excluirVersao(84695)
        cy.excluirLeiaute(951738)
        cy.excluirModelo('Alterar bloco limite max')
    })

    it('M - DELETE - Cadastro de Bloco (4 - C)', () => {
        
        cy.excluirVersao(856545)
        cy.excluirLeiaute(96321)
        cy.excluirModelo('Campo Nome Limite')
    })

    it('N - DELETE - Cadastro de Bloco (4 - D)', () => {
        cy.excluirBloco(155)
        cy.excluirVersao(1983)
        cy.excluirLeiaute(95124)
        cy.excluirModelo('Campo Nome alterar limite max')
    })

    it('O - DELETE - Cadastro de Bloco (5 - A)', () => {
        cy.excluirBloco(24)
        cy.excluirBloco(23)
        cy.excluirVersao(2356)
        cy.excluirLeiaute(48891)
        cy.excluirModelo('Modelo Clone bloco')
    })

    it('P - DELETE - Cadastro de Bloco (6 - A)', () => {
        cy.excluirBloco(52)
        cy.excluirBloco(51)
        cy.excluirVersao(232510)
        cy.excluirLeiaute(60988)
        cy.excluirModelo('Modelo ordenamento de bloco')
    })

    it('Q - DELETE - ID inválido ', () => {
        cy.request({
            method: 'DELETE',
            url: `/Bloco/asdsafsf-fdsfsd`,
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(resposta => {
            console.log(resposta)
            expect(resposta.status).to.be.equal(404)
            expect(resposta.body.errors[""][0]).to.be.equal('A identificação do Bloco é inválida')

        })

        
    })



})