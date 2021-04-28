/// <reference types= "cypress" />


describe(`Testes API - Cadastro de Versão`, () => {

    it('A - POST - Cadastrando uma Versão', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
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
                    codigo: '99999',
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
                    if (c.codigo === '99999') codigoLeiaute = c.codigo
                })
                expect(codigoLeiaute).to.be.equal('99999')
            })
        })
                cy.request({
                    method: 'GET',
                    url: '/Leiaute'
                }).then(resposta => {

                    let codigoLeiaute = null
                    resposta.body.retorno.forEach(c => {
                        if (c.codigo === '99999') codigoLeiaute = c.id
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
                })
    })

    it('B - POST - Cadastrando uma Versão com um idLeiaute que não existe (Não foi possível encontrar o Leiaute especificado)', () => {
        cy.request({
            method: 'POST',
            url: '/Versao',
            body: {
                idLeiaute: 'c5050740-2871-423b-9354-24b413a8fdd5',
                codigo: '10.98',
                descricao: 'Versão 10.99',
                publicacao: '2025-02-01T02:00:00',
                status: 'Ativo'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(resposta => {
            console.log(resposta)
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors[""][0]).to.be.equal('Não foi possível encontrar o Leiaute especificado')
        })
    })
    //EA-110 Resolvido
    it('C - POST - Campo Codigo duplicado (Já existe uma Versão com este código)', () => {
    //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Modelo versão ducplicado',
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
                if (c.nome === 'Modelo versão ducplicado') nomeModelo = c.id
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
          //Buscando no cadastro o modelo registrado acima
          cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '7182') codigoLeiaute = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
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
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '7182') codigoLeiaute = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (codigoLeiaute),
                    codigo: '1099',
                    descricao: 'Duplicidade código 210.99',
                    publicacao: '2025-02-02T02:00:00',
                    status: 'Ativo'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Codigo[0]).to.be.equal('Já existe uma Versão com este código')
            })
        })
    })
    //EA-110 Resolvido
    it('D - POST - Campo Publicação duplicado (Já existe uma Versão ativa com esta mesma data de publicação)', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Modelo publicação versão duplicado',
                descricao: 'Teste publicação cy',
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
                if (c.nome === 'Modelo publicação versão duplicado') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '5060',
                    descricao: 'Leiaute 5060 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-01-01T02:00:00',
                        fim: '2025-02-21T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {

            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '5060') codigoLeiaute = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (codigoLeiaute),
                    codigo: '111.99',
                    descricao: 'Duplicidade da data de publicação',
                    publicacao: '2025-03-01T02:00:00',
                    status: 'Ativo'
                    
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {

            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '5060') codigoLeiaute = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (codigoLeiaute),
                    codigo: '122.90',
                    descricao: 'Versão 122.90',
                    publicacao: '2025-03-01T02:00:00',
                    status: 'Ativo'
                    
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Publicacao[0]).to.be.equal('Já existe uma Versão ativa com esta mesma data de publicação')
            })
        })
    
    })
     //EA-110 Resolvido É permitido cadastrar duas versões com a mesma data de publicação
     // desde que uma das versões esteja com o status Inativo.
    it('E - POST - Campo Publicação duplicado porem com status diferentes(Já existe uma Versão ativa com esta mesma data de publicação)', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Modelo duplicar publicação com o Status inativo',
                descricao: 'Teste publicação cy',
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
                if (c.nome === 'Modelo duplicar publicação com o Status inativo') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '784477',
                    descricao: 'Leiaute 784477 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-01-01T02:00:00',
                        fim: '2025-02-21T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {

            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '784477') codigoLeiaute = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (codigoLeiaute),
                    codigo: '125689',
                    descricao: 'Duplicidade da data de publicação',
                    publicacao: '2025-03-01T02:00:00',
                    status: 'Inativo'
                    
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {

            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '784477') codigoLeiaute = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (codigoLeiaute),
                    codigo: '8556641',
                    descricao: 'Versão 68997',
                    publicacao: '2025-03-01T02:00:00',
                    status: 'Ativo'
                    
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)
            
        })
    
    })
    //EA-111 Corrigido
    it('D - POST - Campo Publicação invalido (O campo publicacao está em um formato inválido!)', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Modelo publicação versão invalido',
                descricao: 'Teste publicação invalido cy',
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
                if (c.nome === 'Modelo publicação versão invalido') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '85652545',
                    descricao: 'Leiaute 85652545 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-01-01T02:00:00',
                        fim: '2025-02-21T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {

            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '85652545') codigoLeiaute = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (codigoLeiaute),
                    codigo: '202233',
                    descricao: 'Duplicidade código 111.99',
                    publicacao: '2025-13-01T02:00:00',
                    status: 'Ativo'
                    
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.publicacao[0]).to.be.equal('O campo publicacao está em um formato inválido!')
            })
        })
    
    })

    it('E - POST - Campo idLeiaute vazio (Não foi possível encontrar o Leiaute especificado)', () => {
        cy.request({
            method: 'POST',
            url: '/Versao',
            body: {
                    codigo: '11.99',
                    descricao: 'Versão 11.99',
                    publicacao: '2025-03-01T02:00:00',
                    status: 'Inativo'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(resposta => {
            console.log(resposta)
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors[""][0]).to.be.equal('Não foi possível encontrar o Leiaute especificado')
        })
    })

    it('F - POST - Todos os campos obrigatórios vazios', () => {
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.status === 'Inativo') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body: {
                    idLeiaute: (nomeModelo),
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta.body.errors)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Codigo[0]).to.be.equal('O campo de Código é obrigatório')
                expect(resposta.body.errors.Descricao[0]).to.be.equal('O campo de Descrição é obrigatório')
                expect(resposta.body.errors.Publicacao[0]).to.be.equal('O campo de Publicacao é obrigatório')
            })
        })
    })

    it('G - POST - Campo Codigo vazio (O campo de Codigo é obrigatório)', () => {
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.status === 'Inativo') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body: {
                    idLeiaute: (nomeModelo),
                    
                    descricao: 'Versão 12.99',
                    publicacao: '2025-01-01T02:00:00',
                    status: 'Ativo'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Codigo[0]).to.be.equal('O campo de Código é obrigatório')
            })
        })
    })

    it('H - POST - Campo Descrição vazio (O campo de Descrição é obrigatório)', () => {
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.status === 'Inativo') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body: {
                    idLeiaute: (nomeModelo),
                    codigo: '13.99',
                    
                    publicacao: '2025-04-01T02:00:00',
                    status: 'Ativo'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Descricao[0]).to.be.equal('O campo de Descrição é obrigatório')
            })
        })
    })

    it('I - POST - Campo Publicacao vazio (O campo de Publicacao é obrigatório)', () => {
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {
            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.status === 'Inativo') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body: {
                    idLeiaute: (nomeModelo),
                    codigo: '14.99',
                    descricao: 'Versão 14.99',
                    
                    status: 'Ativo'
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Publicacao[0]).to.be.equal('O campo de Publicacao é obrigatório')
            })
        })
    })

    it('J - POST - Cadastrar Versão sem informar o Campo Status (Por padrão deve vir preenchida com Inativo)', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Testando Status',
                descricao: 'Teste de status não preenchido cy',
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
                if (c.nome === 'Testando Status') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '4859',
                    descricao: 'Leiaute 4859 do status cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-05-03T02:00:00',
                        fim: '2025-06-03T02:00:00'
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
                if (c.codigo === '4859') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '15.99',
                    descricao: 'Versão 15.99',
                    publicacao: '2025-05-01T02:00:00'
                    //status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)
            //Verificando se o cenário de teste foi executado corretamente.
            cy.request({
                method: 'GET',
                url: '/Versao'
            }).then(resposta => {
                let codigoLeiaute = null
                let statusLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.codigo === '15.99') codigoLeiaute = c.codigo
                    if (c.status === 'Inativo') statusLeiaute = c.status

                })
                expect(codigoLeiaute).to.be.equal('15.99')
                expect(statusLeiaute).to.be.equal('Inativo')
            })
        })
    })

    it('K - PUT - Alterar (Descrição) de uma Versão', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Alterando descr',
                descricao: 'Teste descr cy',
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
                if (c.nome === 'Alterando descr') nomeModelo = c.id
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
                    codigo: '16.99',
                    descricao: 'Versão 16.99',
                    publicacao: '2025-06-01T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Versao',
            qs:
            {
                codigo: '16.99'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Versao/${resposta.body.retorno[0].id}`,
                body:
                {
                    idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                    codigo: '16.99',
                    descricao: 'Versão 16.99 Alterado cy',
                    publicacao: '2025-06-01T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.retorno').should('exist')
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let descricaoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.descricao === 'Versão 16.99 Alterado cy') descricaoLeiaute = c.descricao
            })
            expect(descricaoLeiaute).to.be.equal('Versão 16.99 Alterado cy')
        })
    })

    it('L - PUT - Alterar (Código) de uma Versão', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Cod Alterar',
                descricao: 'Teste cod cy',
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
                if (c.nome === 'Cod Alterar') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '2603',
                    descricao: 'Leiaute 2603 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-07-04T02:00:00',
                        fim: '2025-08-03T02:00:00'
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
                if (c.codigo === '2603') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '17.99',
                    descricao: 'Versão 17.99',
                    publicacao: '2025-06-11T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Versao',
            qs:
            {
                codigo: '17.99'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Versao/${resposta.body.retorno[0].id}`,
                body:
                {
                    idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                    codigo: '177.99',
                    descricao: 'Versão 17.99',
                    publicacao: '2025-06-11T02:00:00',
                    status: 'Inativo'
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.retorno').should('exist')
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let coLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '177.99') coLeiaute = c.codigo
            })
            expect(coLeiaute).to.be.equal('177.99')
        })
    })

    it('M - PUT - Alterar (publicacao) de uma Versão', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Public Alterar',
                descricao: 'Teste publicacao cy',
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
                if (c.nome === 'Public Alterar') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '6857',
                    descricao: 'Leiaute 6857 do public cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-08-05T02:00:00',
                        fim: '2025-09-04T02:00:00'
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
                if (c.codigo === '6857') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '18.99',
                    descricao: 'Versão 18.99',
                    publicacao: '2025-06-21T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Versao',
            qs:
            {
                codigo: '18.99'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Versao/${resposta.body.retorno[0].id}`,
                body:
                {
                    idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                    codigo: '18.99',
                    descricao: 'Versão 18.99',
                    publicacao: '2025-07-11T02:00:00',
                    status: 'Inativo'
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.retorno').should('exist')
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let pubLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.publicacao === '2025-07-11T02:00:00') pubLeiaute = c.publicacao
            })
            expect(pubLeiaute).to.be.equal('2025-07-11T02:00:00')
        })
    })
    // EA-111 Corrigida
    it('N - PUT - Alterar (publicacao - data inválida) de uma Versão (O campo publicacao está em um formato inválido!)', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Publica invalida Alterar',
                descricao: 'Teste publicacao cy',
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
                if (c.nome === 'Publica invalida Alterar') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '458877',
                    descricao: 'Leiaute 458877 do public cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-08-05T02:00:00',
                        fim: '2025-09-04T02:00:00'
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
                if (c.codigo === '458877') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '877114',
                    descricao: 'Versão 18.99',
                    publicacao: '2025-06-21T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Versao',
            qs:
            {
                codigo: '877114'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Versao/${resposta.body.retorno[0].id}`,
                body:
                {
                    idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                    codigo: '877114',
                    descricao: 'Versão 18.99',
                    publicacao: '2025-06-32T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).as('response')
        })
        cy.get('@response').then(resposta => {
            console.log(resposta)
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.publicacao[0]).to.be.equal('O campo publicacao está em um formato inválido!')

        })
    })

    it('N - PUT - Alterar (Status) de uma Versão', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Status Alterar',
                descricao: 'Teste Status cy',
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
                if (c.nome === 'Status Alterar') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '256314',
                    descricao: 'Leiaute 256314 do public cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-09-06T02:00:00',
                        fim: '2025-10-04T02:00:00'
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
                if (c.codigo === '256314') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '335566',
                    descricao: 'Versão 335566',
                    publicacao: '2025-06-21T02:00:00',
                    status: 'Ativo'
                }
            }).its('status').should('be.equal', 200)

        })
        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Versao',
            qs:
            {
                codigo: '335566'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Versao/${resposta.body.retorno[0].id}`,
                body:
                {
                    idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                    codigo: '335566',
                    descricao: 'Versão 18.99',
                    publicacao: '2025-06-11T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.retorno').should('exist')
        cy.request({
            method: 'GET',
            url: '/Versao'
        }).then(resposta => {
            let codigoLeiaute = null
            let statusLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '335566') codigoLeiaute = c.codigo
                if (c.status === 'Inativo') statusLeiaute = c.status
            })
            expect(codigoLeiaute).to.be.equal('335566')
            expect(statusLeiaute).to.be.equal('Inativo')
        })
    })

    it('O - PUT - Alterar campo Codigo para vazio (O campo de Codigo é obrigatório)', () => {

         //Cadastrando um modelo pra utilizar nos testes de Leiaute
         cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Cod vazio',
                descricao: 'Teste cod vazio cy',
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
                if (c.nome === 'Cod vazio') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '3302',
                    descricao: 'Leiaute 3302 Cod vazio cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-08-05T02:00:00',
                        fim: '2025-09-03T02:00:00'
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
                if (c.codigo === '3302') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '109.99',
                    descricao: 'Versão 109.99',
                    publicacao: '2025-07-11T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Versao',
            qs:
            {
                codigo: '109.99'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Versao/${resposta.body.retorno[0].id}`,
                body:
                {
                    idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                    //codigo: '177.99',
                    descricao: 'Versão 109.99',
                    publicacao: '2025-07-11T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).as('response')
        })

        cy.get('@response').then(resposta => {
            console.log(resposta)
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.Codigo[0]).to.be.equal('O campo de Codigo é obrigatório')

        })
    })

    it('P - PUT - Alterar campo Descrição para vazio (O campo de Descrição é obrigatório)', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
           method: 'POST',
           url: '/ModeloLeiaute',
           body: {
               idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
               nome: 'Descri vazio',
               descricao: 'Teste Descri vazio cy',
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
                if (c.nome === 'Descri vazio') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '1526',
                    descricao: 'Leiaute 1526 Cod vazio cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-08-06T02:00:00',
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
                if (c.codigo === '1526') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '88.98',
                    descricao: 'Versão 88.98',
                    publicacao: '2025-08-11T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)
        })
        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Versao',
            qs:
            {
                codigo: '88.98'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Versao/${resposta.body.retorno[0].id}`,
                body:
                {
                    idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                    codigo: '88.98',
                    //descricao: 'Versão 119.99',
                    publicacao: '2025-08-11T02:00:00',
                    status: 'Inativo'
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

    it('Q - PUT - Alterar campo Publicacao vazio (O campo de Publicacao é obrigatório)', () => {
    //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
        method: 'POST',
        url: '/ModeloLeiaute',
        body: {
            idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
            nome: 'Publicacao vazio',
            descricao: 'Teste Publicacao vazio cy',
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
                if (c.nome === 'Publicacao vazio') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '4815',
                    descricao: 'Leiaute 4815 publicacao vazio cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-09-07T02:00:00',
                        fim: '2025-10-23T02:00:00'
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
                if (c.codigo === '4815') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '129.99',
                    descricao: 'Versão 129.99',
                    publicacao: '2025-08-21T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)
        })
        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Versao',
            qs:
            {
                codigo: '129.99'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Versao/${resposta.body.retorno[0].id}`,
                body:
                {
                    idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                    codigo: '129.99',
                    descricao: 'Versão 129.99',
                    //publicacao: '2025-08-21T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).as('response')
        })
        cy.get('@response').then(resposta => {
            console.log(resposta)
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.Publicacao[0]).to.be.equal('O campo de Publicacao é obrigatório')

        })
    })

    it('R - PUT - Alterar campo Status vazio (Por padrão deve vir preenchida com Inativo)', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
            cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Status vazio',
                descricao: 'Teste status vazio cy',
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
                    if (c.nome === 'Status vazio') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '4301',
                        descricao: 'Leiaute 4301 status vazio cy',
                        status: 'Ativo',
                        vigencia: {
                            inicio: '2025-10-08T02:00:00',
                            fim: '2025-11-03T02:00:00'
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
                    if (c.codigo === '4301') nomeModelo = c.id
                })
                //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
                cy.request({
                    method: 'POST',
                    url: '/Versao',
                    body:
                    {
                        idLeiaute: (nomeModelo),
                        codigo: '139.99',
                        descricao: 'Versão 139.99',
                        publicacao: '2025-09-21T02:00:00',
                        status: 'Inativo'
                    },
                    failOnStatusCode: false
                }).its('status').should('be.equal', 200)
            })
            //Buscar a versão cadastrada anteriormente para alterar o campo descrição
            cy.request({
                method: 'GET',
                url: '/Versao',
                qs:
                {
                    codigo: '139.99'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Versao/${resposta.body.retorno[0].id}`,
                    body:
                    {
                        idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                        codigo: '139.99',
                        descricao: 'Versão 139.99',
                        publicacao: '2025-09-21T02:00:00'
                        
                    },
                    failOnStatusCode: false
                }).its('status').should('be.equal', 200)
                //Verificando se o cenário de teste foi executado corretamente.
                cy.request({
                    method: 'GET',
                    url: '/Versao'
                }).then(resposta => {
                    let codigoLeiaute = null
                    let statusLeiaute = null
                    resposta.body.retorno.forEach(c => {
                        if (c.codigo === '139.99') codigoLeiaute = c.codigo
                        if (c.status === 'Inativo') statusLeiaute = c.status
        
                    })
                    expect(codigoLeiaute).to.be.equal('139.99')
                    expect(statusLeiaute).to.be.equal('Inativo')
            })
        })
    })
    //EA-110 Resolvido
    it('S - PUT - Alterar campo Codigo duplicado (Já existe um Versão com este código)', () => {
         //Cadastrando um modelo pra utilizar nos testes de Leiaute
         cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Código duplicado Alterar',
                descricao: 'Teste duplicação de cod cy',
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
                if (c.nome === 'Código duplicado Alterar') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '741856',
                    descricao: 'Leiaute 741856 do public cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-09-06T02:00:00',
                        fim: '2025-10-04T02:00:00'
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
                if (c.codigo === '741856') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '859674',
                    descricao: 'Versão 859674',
                    publicacao: '2025-06-21T02:00:00',
                    status: 'Ativo'
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
                if (c.codigo === '741856') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '556644',
                    descricao: 'Versão 658147',
                    publicacao: '2025-07-21T02:00:00',
                    status: 'Ativo'
                }
            }).its('status').should('be.equal', 200)

        })
        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Versao',
            qs:
            {
                codigo: '556644'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Versao/${resposta.body.retorno[0].id}`,
                body:
                {
                    idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                    codigo: '859674',
                    descricao: 'Versão codi',
                    publicacao: '2025-06-13T02:00:00',
                    status: 'Ativo'
                },
                failOnStatusCode: false
            }).as('response')
        })

        cy.get('@response').then(resposta => {
            console.log(resposta)
            expect(resposta.status).to.be.equal(400)
            expect(resposta.body.errors.Codigo[0]).to.be.equal('Já existe uma Versão com este código')

        })
    })
    //EA-110 Resolvido
    it('T - PUT - Alterar campo Publicacao duplicado (Já existe uma Versão ativa com esta mesma data de publicação)', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
           method: 'POST',
           url: '/ModeloLeiaute',
           body: {
               idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
               nome: 'Pub duplica Alterar',
               descricao: 'Teste duplicação de pub cy',
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
               if (c.nome === 'Pub duplica Alterar') nomeModelo = c.id
           })
           //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
           cy.request({
               method: 'POST',
               url: '/Leiaute',
               body:
               {
                   idModeloLeiaute: (nomeModelo),
                   codigo: '8855449',
                   descricao: 'Leiaute 8855449 do public cy',
                   status: 'Ativo',
                   vigencia: {
                       inicio: '2025-09-06T02:00:00',
                       fim: '2025-10-04T02:00:00'
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
               if (c.codigo === '8855449') nomeModelo = c.id
           })
           //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
           cy.request({
               method: 'POST',
               url: '/Versao',
               body:
               {
                   idLeiaute: (nomeModelo),
                   codigo: '100256',
                   descricao: 'Versão 100256',
                   publicacao: '2025-06-21T02:00:00',
                   status: 'Ativo'
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
               if (c.codigo === '8855449') nomeModelo = c.id
           })
           //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
           cy.request({
               method: 'POST',
               url: '/Versao',
               body:
               {
                   idLeiaute: (nomeModelo),
                   codigo: '200257',
                   descricao: 'Versão 200257',
                   publicacao: '2025-07-21T02:00:00',
                   status: 'Ativo'
               }
           }).its('status').should('be.equal', 200)

       })
       //Buscar a versão cadastrada anteriormente para alterar o campo descrição
       cy.request({
           method: 'GET',
           url: '/Versao',
           qs:
           {
               codigo: '200257'
           }
       }).then(resposta => {
           cy.request({
               method: 'PUT',
               url: `/Versao/${resposta.body.retorno[0].id}`,
               body:
               {
                   idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                   codigo: '200257',
                   descricao: 'Versão pu',
                   publicacao: '2025-06-21T02:00:00',
                   status: 'Ativo'
               },
               failOnStatusCode: false
           }).as('response')
       })

       cy.get('@response').then(resposta => {
           console.log(resposta)
           expect(resposta.status).to.be.equal(400)
           expect(resposta.body.errors.Publicacao[0]).to.be.equal('Já existe uma Versão ativa com esta mesma data de publicação')

       })
   })
   //EA-110 Resolvido
    it('U - PUT - Alterar Campo Publicação duplicado porem com status diferentes(Já existe uma Versão ativa com esta mesma data de publicação)', () => {
        //Cadastrando um modelo pra utilizar nos testes de Leiaute
        cy.request({
            method: 'POST',
            url: '/ModeloLeiaute',
            body: {
                idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                nome: 'Modelo publicação duplicado Status inativo',
                descricao: 'Teste publicação cy',
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
                if (c.nome === 'Modelo publicação duplicado Status inativo') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '9688',
                    descricao: 'Leiaute 9688 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-01-01T02:00:00',
                        fim: '2025-02-21T02:00:00'
                    }
                }
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {

            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '9688') codigoLeiaute = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (codigoLeiaute),
                    codigo: '33256',
                    descricao: 'Duplicidade da data de publicação',
                    publicacao: '2025-03-01T02:00:00',
                    status: 'Inativo'
                    
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)
        })
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/Leiaute'
        }).then(resposta => {

            let codigoLeiaute = null
            resposta.body.retorno.forEach(c => {
                if (c.codigo === '9688') codigoLeiaute = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (codigoLeiaute),
                    codigo: '68997',
                    descricao: 'Versão 68997',
                    publicacao: '2025-03-01T02:00:00',
                    status: 'Ativo'
                    
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)
            // Editar a versão passando o status para Ativo. Assim o alerta deve ser exibido
            cy.request({
                method: 'GET',
                url: '/Versao',
                qs:
                {
                    codigo: '33256'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Versao/${resposta.body.retorno[0].id}`,
                    body:
                    {
                        idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                        codigo: '33256',
                        descricao: 'Duplicidade da data de publicação',
                        publicacao: '2025-03-01T02:00:00',
                        status: 'Ativo'
                    },
                    failOnStatusCode: false
                }).as('response')
                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Publicacao[0]).to.be.equal('Já existe uma Versão ativa com esta mesma data de publicação')

            })
            })
        })

})


    describe(`2 - Teste API Leiaute (Filtros)`, () => {
    
        it('A - POST - Populando base com Versão', () => {
            //Cadastrando um modelo pra utilizar nos testes de Leiaute
            cy.request({
                method: 'POST',
                url: '/ModeloLeiaute',
                body: {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Teste filtro',
                    descricao: 'Escrituração Contábil Digital cy',
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
                    if (c.nome === 'Teste filtro') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '12345',
                        descricao: 'Leiaute 12345 do modelo EFD Contribuições cy',
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
                        if (c.codigo === '12345') codigoLeiaute = c.codigo
                    })
                    expect(codigoLeiaute).to.be.equal('12345')
                })
            })  
                    cy.request({
                        method: 'GET',
                        url: '/Leiaute'
                    }).then(resposta => {
    
                        let codigoLeiaute = null
                        resposta.body.retorno.forEach(c => {
                            if (c.codigo === '12345') codigoLeiaute = c.id
                        })
                        //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
                        cy.request({
                            method: 'POST',
                            url: '/Versao',
                            body:
                            {
                                idLeiaute: (codigoLeiaute),
                                codigo: '12345.99',
                                descricao: 'Versão 10.99',
                                publicacao: '2025-01-01T02:00:00',
                                status: 'Ativo'
                                
                            }
                        }).its('status').should('be.equal', 200)
                    })
        })

        it('B - GET - (Listar todos) Filtrar Versão pelo Codigo', () => {
            cy.request({
                method: 'GET',
                url: '/Versao',
                qs:
                {
                    Codigo: '12345.99'
                }
            }).then(resposta => {
                let codigoLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.cod === '12345.99') codigoLeiaute = c.cod
                })
                console.log(resposta)
                expect(resposta.body.retorno[0].codigo).to.contain('12345.99')

            })
        })

        it('C - GET - (Listar todos) Filtrar Versão pela Descrição', () => {
            cy.request({
                method: 'GET',
                url: '/Versao',
                qs:
                {
                    descricao: 'Versão 10.99'
                }
            }).then(resposta => {
                let codigoLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.cod === 'Versão 10.99') codigoLeiaute = c.cod
                })
                console.log(resposta)
                expect(resposta.body.retorno[0].descricao).to.contain('Versão 10.99')

            })
        })

        it('D - GET - (Listar todos) Filtrar Versão pela Publicação', () => {
            cy.request({
                method: 'GET',
                url: '/Versao',
                qs:
                {
                    publicacao: '2025-01-01T02:00:00'
                }
            }).then(resposta => {
                let codigoLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.cod === '2025-01-01T02:00:00') codigoLeiaute = c.cod
                })
                console.log(resposta)
                expect(resposta.body.retorno[0].publicacao).to.contain('2025-01-01T02:00:00')

            })
        })

        it('E - GET - (Listar todos) Filtrar Versão pelo Status', () => {
            cy.request({
                method: 'GET',
                url: '/Versao',
                qs:
                {
                    status: 'Ativo'
                }
            }).then(resposta => {
                let codigoLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.cod === 'Ativo') codigoLeiaute = c.cod
                })
                console.log(resposta)
                expect(resposta.body.retorno[0].status).to.contain('Ativo')
                expect(resposta.body.retorno.length).to.be.above(1) //Validando se existema mais de 1 registro nessa página 


            })
        })

        it('F - GET - (Listar todos) Filtrar Versão por uma página especifica e que exista registros', () => {
            cy.request({
                method: 'GET',
                url: '/Versao',
                qs:
                {
                    'Paginacao.Pagina': '1'
                }
            }).then(resposta => {
                console.log(resposta)
                expect(resposta.body.retorno.length).to.be.above(1) //Validando se existema mais de 1 registro nessa página 
            })
        })

        it('G - GET - (Listar todos) Filtrar Versão por uma página que NÃO exista registros', () => {
            cy.request({
                method: 'GET',
                url: '/Versao',
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

        it('H - GET - (Listar todos) Filtrar Versão pelo total de páginas', () => {
            cy.request({
                method: 'GET',
                url: '/Versao',
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

    describe(`3 - Teste API Versão (Validando: Limite de caracteres)`, () => {

        it('A - POST - Limite de caracteres - codigo [50]', () => {
            //Cadastrando um modelo pra utilizar nos testes de Leiaute
            cy.request({
                method: 'POST',
                url: '/ModeloLeiaute',
                body: {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Teste limite',
                    descricao: 'Escrituração Contábil limite cy',
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
                    if (c.nome === 'Teste limite') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
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
                cy.request({
                    method: 'GET',
                    url: '/Leiaute'
                }).then(resposta => {
                    let codigoLeiaute = null
                    resposta.body.retorno.forEach(c => {
                        if (c.codigo === '6789') codigoLeiaute = c.id
                    })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
                cy.request({
                    method: 'POST',
                    url: '/Versao',
                    body: {
                            idLeiaute: (codigoLeiaute),
                            codigo: '11987452445214587459632514785496325174789658214578965214785',
                            descricao: 'Versão 10.99',
                            publicacao: '2025-01-01T02:00:00',
                            status: 'Ativo'
                    },
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Codigo[0]).to.be.equal('O campo deve ter no máximo 50 caracteres')
                })
            })
        })

        })

        it('B - PUT - Limite de caracteres - codigo [50]', () => {
            cy.cadastrarModelo('Nome PUT max')  //Cadastrando um modelo pra utilizar nos testes de Leiaute
        
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Nome PUT max') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '9905',
                    descricao: 'Leiaute 9905 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-07-04T02:00:00',
                        fim: '2025-08-03T02:00:00'
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
                if (c.codigo === '9905') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '911',
                    descricao: 'Versão 119',
                    publicacao: '2025-06-11T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Versao',
            qs:
            {
                codigo: '911'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Versao/${resposta.body.retorno[0].id}`,
                body:
                {
                    idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                    codigo: '11987452445214587459632514785496325174789658214578965214785',
                    descricao: 'Versão 119',
                    publicacao: '2025-06-11T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).as('response')
            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Codigo[0]).to.be.equal('O campo deve ter no máximo 50 caracteres')
            })
        })
        })

        it('C - POST - Limite de caracteres - Descrição [150]', () => {
            //Buscando no cadastro o leiaute registrado no teste acima
            cy.request({
                method: 'GET',
                url: '/Leiaute'
            }).then(resposta => {
                let codigoLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.codigo === '6789') codigoLeiaute = c.id
                })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body: {
                        idLeiaute: (codigoLeiaute),
                        codigo: '98765',
                        descricao: 'Leiaute 005 do modelo EFD Contribuições alterado pelo cy. Este manual visa a orientar a execução dos serviços destinados à emissão de documentos e escrituração de livros fiscais',
                        publicacao: '2025-01-01T02:00:00',
                        status: 'Ativo'
                },
                failOnStatusCode: false
            }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Descricao[0]).to.be.equal('O campo deve ter no máximo 150 caracteres')
                })
            })
        })

        it('D - PUT - Limite de caracteres - Descrição [150]', () => {
            cy.cadastrarModelo('Descrição PUT max')  //Cadastrando um modelo pra utilizar nos testes de Leiaute
        
        //Buscando no cadastro o modelo registrado acima
        cy.request({
            method: 'GET',
            url: '/ModeloLeiaute'
        }).then(resposta => {

            let nomeModelo = null
            resposta.body.retorno.forEach(c => {
                if (c.nome === 'Descrição PUT max') nomeModelo = c.id
            })
            //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: (nomeModelo),
                    codigo: '6889',
                    descricao: 'Leiaute 6889 do descr cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2025-07-04T02:00:00',
                        fim: '2025-08-03T02:00:00'
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
                if (c.codigo === '6889') nomeModelo = c.id
            })
            //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
            cy.request({
                method: 'POST',
                url: '/Versao',
                body:
                {
                    idLeiaute: (nomeModelo),
                    codigo: '1999',
                    descricao: 'Versão 1999',
                    publicacao: '2025-06-11T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

        })
        //Buscar a versão cadastrada anteriormente para alterar o campo descrição
        cy.request({
            method: 'GET',
            url: '/Versao',
            qs:
            {
                codigo: '1999'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/Versao/${resposta.body.retorno[0].id}`,
                body:
                {
                    idLeiaute: `${resposta.body.retorno[0].idLeiaute}`,
                    codigo: '1999',
                    descricao: 'Leiaute 005 do modelo EFD Contribuições alterado pelo cy. Este manual visa a orientar a execução dos serviços destinados à emissão de documentos e escrituração de livros fiscais',
                    publicacao: '2025-06-11T02:00:00',
                    status: 'Inativo'
                },
                failOnStatusCode: false
            }).as('response')
            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Descricao[0]).to.be.equal('O campo deve ter no máximo 150 caracteres')
            })
        })
        })
    })

    describe('4 - Testes API Leiaute - Clonar', () => {

        it('A - POST - Clonar Versão', () => {
            cy.cadastrarModelo('Modelo Clonar')  //Cadastrando um modelo pra utilizar nos testes de Leiaute
        
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {
    
                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.nome === 'Modelo Clonar') nomeModelo = c.id
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
            //Buscar a versão cadastrada anteriormente para alterar o campo descrição
            cy.request({
                method: 'GET',
                url: '/Versao',
                qs:
                {
                    codigo: '2356'
                }
            }).then(resposta => {
                cy.request({
                    method: 'POST',
                    url: `/Versao/${resposta.body.retorno[0].id}/clone`,
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
                url: '/Versao'
            }).then(resposta => {
                let codigoLeiaute = null
                let statusLeiaute = null
                let descLeiaute = null
                let publicaLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.codigo === '2357') codigoLeiaute = c.codigo
                    if (c.status === 'Inativo') statusLeiaute = c.status
                    if (c.descricao === 'Versão 2356') descLeiaute = c.descricao
                    if (c.publicacao === '2025-06-11T02:00:00') publicaLeiaute = c.publicacao

                })
                expect(codigoLeiaute).to.be.equal('2357')
                expect(statusLeiaute).to.be.equal('Inativo')
                expect(descLeiaute).to.be.equal('Versão 2356')
                expect(publicaLeiaute).to.be.equal('2025-06-11T02:00:00')
            })
                })
            })
        })
    })

    describe('5 - Testes API Leiaute - Modifica Status', () => {

        it('A - POST - Modifica o status da Versão para Ativo', () => {
            cy.cadastrarModelo('Modelo Modifica Status')  //Cadastrando um modelo pra utilizar nos testes de Leiaute
        
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {
    
                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.nome === 'Modelo Modifica Status') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '456525',
                        descricao: 'Leiaute 456525 do descr cy',
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
                    if (c.codigo === '456525') nomeModelo = c.id
                })
                //Cadastrando o versão utilizando o ID do leiaute cadastrado acima
                cy.request({
                    method: 'POST',
                    url: '/Versao',
                    body:
                    {
                        idLeiaute: (nomeModelo),
                        codigo: '857595',
                        descricao: 'Versão 857595',
                        publicacao: '2025-06-11T02:00:00',
                        status: 'Inativo'
                    },
                    failOnStatusCode: false
                }).its('status').should('be.equal', 200)
            })
            //Buscar a versão cadastrada anteriormente para alterar o campo descrição
            cy.request({
                method: 'GET',
                url: '/Versao',
                qs:
                {
                    codigo: '857595'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Versao/${resposta.body.retorno[0].id}/modificaStatus`,
                    body:
                    {
                        status: 'Ativo'
                    },
                    failOnStatusCode: false
                }).its('status').should('be.equal', 200)

            cy.request({
                method: 'GET',
                url: '/Versao'
            }).then(resposta => {
                let codigoLeiaute = null
                let statusLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.codigo === '857595') codigoLeiaute = c.codigo
                    if (c.status === 'Ativo') statusLeiaute = c.status
                })
                expect(codigoLeiaute).to.be.equal('857595')
                expect(statusLeiaute).to.be.equal('Ativo')
            })
                })
        })

    })

    describe('6 - Testes API Leiaute - DELETE', () => {
        
        it('A - DELETE - Cadastro de Versão (1-A)', () => {
            cy.excluirVersao(1741)
            cy.excluirLeiaute(99999)
            cy.excluirModelo('Teste para versão')
        })
        //EA-110 Resolvido
        it('B - DELETE - Cadastro de Versão (1-C)', () => {
            cy.excluirVersao(1099)
            cy.excluirLeiaute(7182)
            cy.excluirModelo('Modelo versão ducplicado')
        })

        it('B - DELETE - Cadastro de Versão (1-D)', () => {
            cy.excluirVersao(111.99)
            cy.excluirLeiaute(5060)
            cy.excluirModelo('Modelo publicação versão duplicado')
        })

        it('C - DELETE - Cadastro de Versão (1-J)', () => {
            cy.excluirVersao(15.99)
            cy.excluirLeiaute(4859)
            cy.excluirModelo('Testando Status')
        })

        it('D - DELETE - Cadastro de Versão (1-K)', () => {
            cy.excluirVersao(16.99)
            cy.excluirLeiaute(5926)
            cy.excluirModelo('Alterando descr')
        })

        it('E - DELETE - Cadastro de Versão (1-L)', () => {
            cy.excluirVersao(177.99)
            cy.excluirLeiaute(2603)
            cy.excluirModelo('Cod Alterar')
        })

        it('F - DELETE - Cadastro de Versão (1-M)', () => {
            cy.excluirVersao(18.99)
            cy.excluirLeiaute(6857)
            cy.excluirModelo('Public Alterar')
        })

        it('G - DELETE - Cadastro de Versão (1-N)', () => {
            cy.excluirVersao(877114)
            cy.excluirLeiaute(458877)
            cy.excluirModelo('Publica invalida Alterar')
        })

        it('G - DELETE - Cadastro de Versão (1-N)', () => {
            cy.excluirVersao(335566)
            cy.excluirLeiaute(256314)
            cy.excluirModelo('Status Alterar')
        })

        it('H - DELETE - Cadastro de Versão (1-O)', () => {
            cy.excluirVersao(109.99)
            cy.excluirLeiaute(3302)
            cy.excluirModelo('Cod vazio')
        })

        it('I - DELETE - Cadastro de Versão (1-P)', () => {
            cy.excluirVersao(88.98)
            cy.excluirLeiaute(1526)
            cy.excluirModelo('Descri vazio')
        })

        it('J - DELETE - Cadastro de Versão (1-Q)', () => {
            cy.excluirVersao(129.99)
            cy.excluirLeiaute(4815)
            cy.excluirModelo('Publicacao vazio')
        })

        it('K - DELETE - Cadastro de Versão (1-R)', () => {
            cy.excluirVersao(139.99)
            cy.excluirLeiaute(4301)
            cy.excluirModelo('Status vazio')
        })

        it('L - DELETE - Cadastro de Versão (2-A)', () => {
            cy.excluirVersao(12345.99)
            cy.excluirLeiaute(12345)
            cy.excluirModelo('Teste filtro')
        })

        it('M - DELETE - Cadastro de Versão (3-A)', () => {
            cy.excluirLeiaute(6789)
            cy.excluirModelo('Teste limite')
        })

        it('N - DELETE - Cadastro de Versão (3-B)', () => {
            cy.excluirVersao(911)
            cy.excluirLeiaute(9905)
            cy.excluirModelo('Nome PUT max')
        })

        it('O - DELETE - Cadastro de Versão (3-D)', () => {
            cy.excluirVersao(1999)
            cy.excluirLeiaute(6889)
            cy.excluirModelo('Descrição PUT max')
        })

        it('P - DELETE - Cadastro de Versão (1-S)', () => {
            cy.excluirVersao(556644)
            cy.excluirVersao(859674)
            cy.excluirLeiaute(741856)
            cy.excluirModelo('Código duplicado Alterar')
        })

        it('Q - DELETE - Cadastro de Versão (1-T)', () => {
            cy.excluirVersao(200257)
            cy.excluirVersao(100256)
            cy.excluirLeiaute(8855449)
            cy.excluirModelo('Pub duplica Alterar')
        })

        it('Q - DELETE - Cadastro de Versão (4-A)', () => {
            cy.excluirVersao(2357)
            cy.excluirVersao(2356)
            cy.excluirLeiaute(48891)
            cy.excluirModelo('Modelo Clonar')
        })
        
        it('R - DELETE - Cadastro de Versão (5-A)', () => {
            cy.excluirVersao(857595)
            cy.excluirLeiaute(456525)
            cy.excluirModelo('Modelo Modifica Status')
        })

        it('S - DELETE - Cadastro de Versão (1-E)', () => {
            cy.excluirVersao(8556641)
            cy.excluirVersao(125689)
            cy.excluirLeiaute(784477)
            cy.excluirModelo('Modelo duplicar publicação com o Status inativo')
        })
        
        it('T - DELETE - Cadastro de Versão (1-U)', () => {
            cy.excluirVersao(68997)
            cy.excluirVersao(33256)
            cy.excluirLeiaute(9688)
            cy.excluirModelo('Modelo publicação duplicado Status inativo')
        })

        it('U - DELETE - Identificação da Versão inválida', () => {
            cy.request({
                method: 'DELETE',
                url: `/Versao/asdsafsf-fdsfsd`,
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(404)
                expect(resposta.body.errors[""][0]).to.be.equal('A identificação do Versão é inválida')

            })
        })

    })  

})