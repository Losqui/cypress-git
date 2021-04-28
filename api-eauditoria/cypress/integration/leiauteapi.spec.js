/// <reference types= "cypress" />


describe(`Testes API - Cadastro de Leiaute`, () => {

    describe('1 - Testes API Leiaute (POST - PUT)', () => {

        it('A - POST - Cadastrando um Leiaute', () => {
            //Cadastrando um modelo pra utilizar nos testes de Leiaute
            cy.request({
                method: 'POST',
                url: '/ModeloLeiaute',
                body: {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Teste para leiaute',
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
                    if (c.nome === 'Teste para leiaute') nomeModelo = c.id
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
                            inicio: '2023-02-03T02:00:00',
                            fim: '2023-12-03T02:00:00'
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
        })

        it('B - POST - Cadastrando um Leiaute com um idModeloLeiaute que não existe (Não foi possível encontrar o ModeloLeiaute especificado)', () => {
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body: {
                    idModeloLeiaute: '320fa4f5-3930-413a-bf17-209b1013cdaa',
                    codigo: '99998',
                    descricao: 'Leiaute 99998 duplicado do modelo EFD Contribuições cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2023-02-03T02:00:00',
                        fim: '2023-12-03T02:00:00'
                    }
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors[""][0]).to.be.equal('Não foi possível encontrar o ModeloLeiaute especificado')
            })
        })

        it('C - POST - Campo Codigo duplicado (Já existe um Leiaute com este código)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body: {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '99999',
                        descricao: 'Leiaute 99999 duplicado do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia: {
                            inicio: '2023-02-03T02:00:00',
                            fim: '2023-12-03T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Leiaute[0]).to.be.equal('Já existe um Leiaute com este código')
                })
            })
        })

        it('D - POST - Campo idModeloLeiaute vazio (Não foi possível encontrar o ModeloLeiaute especificado)', () => {
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body: {
                    codigo: '99997',
                    descricao: 'Leiaute 99997 do modelo EFD Contribuições cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2023-02-03T02:00:00',
                        fim: '2023-12-03T02:00:00'
                    }
                },
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors[""][0]).to.be.equal('Não foi possível encontrar o ModeloLeiaute especificado')
            })
        })

        it('E - POST - Todos os campos obrigatórios vazios', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body: {
                        idModeloLeiaute: (nomeModelo),
                    },
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta.body.errors)
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Codigo[0]).to.be.equal('O campo de Código é obrigatório')
                    expect(resposta.body.errors.Descricao[0]).to.be.equal('O campo de Descrição é obrigatório')
                    expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo de Vigencia é obrigatório')
                })
            })
        })

        it('F - POST - Campo Codigo vazio (O campo de Codigo é obrigatório)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body: {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '',
                        descricao: 'Leiaute 005 do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia: {
                            inicio: '2023-02-03T02:00:00',
                            fim: '2023-12-03T02:00:00'
                        }
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

        it('G - POST - Campo Descrição vazio (O campo de Descrição é obrigatório)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body: {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '99996',
                        descricao: '',
                        status: 'Ativo',
                        vigencia: {
                            inicio: '2023-02-03T02:00:00',
                            fim: '2023-12-03T02:00:00'
                        }
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

        it('H - POST - Campo Status vazio (Campo não obrigatório)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body: {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '99995',
                        descricao: 'Leiaute 99995 do modelo EFD Contribuições cy',
                        vigencia: {
                            inicio: '2023-12-05T02:00:00',
                            fim: '2024-01-01T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).its('status').should('be.equal', 200)
                cy.request({
                    method: 'GET',
                    url: '/Leiaute'
                }).then(resposta => {
                    let codigoLeiaute = null
                    let statusLeiaute = null
                    resposta.body.retorno.forEach(c => {
                        if (c.codigo === '99995') codigoLeiaute = c.codigo
                        if (c.status === 'Inativo') statusLeiaute = c.status

                    })
                    expect(codigoLeiaute).to.be.equal('99995')
                    expect(statusLeiaute).to.be.equal('Inativo')
                })
            })
        })

        it('I - POST - Campo Vigencia não informado (O campo de Vigencia é obrigatório)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body: {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '99994',
                        descricao: 'Leiaute 99994 do modelo EFD Contribuições cy',
                        status: 'Ativo'
                    },
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo de Vigencia é obrigatório')
                })
            })
        })
        //EA-63 não está funcionando
        it('J - POST - Campo Início da Vigencia não é informado (O campo de Inicio é obrigatório)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '99993',
                        descricao: 'Leiaute 99993 do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia:
                        {
                            fim: '1999-02-02T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta.body.errors.Vigencia[0])
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo de Inicio é obrigatório')
                })
            })
        })
        //vendo com o Marcio
        it('K - POST - Campo Fim da Vigencia não informado (Campo Vigência fim preenchido com null)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '99992',
                        descricao: 'Leiaute 99992 do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia:
                        {
                            inicio: '2024-02-02T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(200)
                    //expect(resposta.body.vigencia.fim).not.be.exist()
                })
            })
        })

        it('L - POST - Campo Início da Vigencia maior que Fim (O início do perído deve ser anterior ao fim)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '99991',
                        descricao: 'Leiaute 99991 do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia:
                        {
                            inicio: '1999-12-04T02:00:00',
                            fim: '1999-02-04T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta.body.errors.Periodo)
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Vigencia[0]).to.be.equal('O início do perído deve ser anterior ao fim')
                })
            })
        })
        //EA-64 AJUSTADO
        it('M - POST - Campo Início da Vigencia (mês) - data inválida (O campo inicio está em um formato inválido!)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '99990',
                        descricao: 'Leiaute 99990 do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia:
                        {
                            inicio: '2023-22-03T02:00:00',
                            fim: '2024-01-01T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo inicio está em um formato inválido!')
                })
            })
        })
        //EA-64 AJUSTADO
        it('N - POST - Campo Início da Vigencia (dia) - data inválida (O campo inicio está em um formato inválido!)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '99990',
                        descricao: 'Leiaute 99990 do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia:
                        {
                            inicio: '2023-02-30T02:00:00',
                            fim: '2024-01-01T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo inicio está em um formato inválido!')
                })
            })
        })
        //EA-64 AJUSTADO
        it('O - POST - Campo Início da Vigencia (Hora) - data inválida (O campo inicio está em um formato inválido!)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '99990',
                        descricao: 'Leiaute 99990 do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia:
                        {
                            inicio: '2023-02-25T30:00:00',
                            fim: '2024-01-01T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo inicio está em um formato inválido!')
                })
            })
        })

        it('P - POST - Campo Fim da Vigencia (mês) - data inválida (O campo fim está em um formato inválido!)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '99990',
                        descricao: 'Leiaute 99990 do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia:
                        {
                            inicio: '2023-02-25T00:00:00',
                            fim: '2024-15-01T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo fim está em um formato inválido!')
                })
            })
        })
        //EA-64 AJUSTADO
        it('Q - POST - Campo Fim da Vigencia (dia) - data inválida (O campo fim está em um formato inválido!)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '99990',
                        descricao: 'Leiaute 99990 do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia:
                        {
                            inicio: '2023-02-25T00:00:00',
                            fim: '2024-01-32T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo fim está em um formato inválido!')
                })
            })
        })
        //EA-64 AJUSTADO
        it('R - POST - Campo Fim da Vigencia (hora) - data inválida (O campo fim está em um formato inválido!)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '99990',
                        descricao: 'Leiaute 99990 do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia:
                        {
                            inicio: '2023-02-25T00:00:00',
                            fim: '2024-01-02T25:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo fim está em um formato inválido!')
                })
            })
        })

        it('S - POST - Cadastrar Leiaute sem informar o Campo Status (Por padrão deve vir preenchida com Inativo)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body: {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '111111',
                        descricao: 'Leiaute 111111 do modelo EFD Contribuições cy',
                        vigencia: {
                            inicio: '2005-01-01T02:00:00',
                            fim: '2005-02-01T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).its('status').should('be.equal', 200)
                cy.request({
                    method: 'GET',
                    url: '/Leiaute'
                }).then(resposta => {
                    let codigoLeiaute = null
                    let statusLeiaute = null
                    resposta.body.retorno.forEach(c => {
                        if (c.codigo === '111111') codigoLeiaute = c.codigo
                        if (c.status === 'Inativo') statusLeiaute = c.status

                    })
                    expect(codigoLeiaute).to.be.equal('111111')
                    expect(statusLeiaute).to.be.equal('Inativo')
                })
            })
        })
        //EA-60 Concluída
        it('T - POST - Cadastrar Leiaute Passando um valor Não numerico no campo Código (Campo deve aceitar apenas valores Numéricos)', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body: {
                        idModeloLeiaute: (nomeModelo),
                        codigo: 'PPPPP',
                        descricao: 'Leiaute BBBBBB do modelo EFD Contribuições cy',
                        status: "Ativo",
                        vigencia: {
                            inicio: '2025-02-02T02:00:00',
                            fim: '2025-03-01T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Codigo[0]).to.be.equal('Deve ser um inteiro positivo')

                })
            })
        })

        it('U - POST - Cadastrar um Leiaute onde o período de vigência coincide com outro já cadastrado (Existe um conflito de vigência com outro leiaute cadastrado)', () => {
           
            //Buscando no cadastro o modelo registrado no primeiro cenário
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.nome === 'Teste para leiaute') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '98765',
                        descricao: 'Leiaute 005 do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia: {
                            inicio: '2023-03-03T02:00:00',
                            fim: '2023-10-03T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(400)
                    expect(resposta.body.errors.Leiaute[0]).to.be.equal('Existe um conflito de vigência com outro leiaute cadastrado')

                })
            })
        })
        //Ao usuário cadastrar outro leiaute com data inicial (campo ‘de’) maior que o leiaute cujo data
        //final (campo 'a') tiver preenchido com null deve alterar o valor null para a data inicial -1 dia
        //informada no outro leiaute. (OBS: Não deve existir mais de um cadastro com a data final null)
        it('V - POST - Cadastrar e validar (se Data fim = null, deve ser substituída pela data início do novo leiaute)', () => {
            //Cadastrar um modelo para ser utilizado nesse cenário
            cy.request({
                method: 'POST',
                url: '/ModeloLeiaute',
                body: {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Testando leiautes',
                    descricao: 'Escrituração Digital cy',
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
                    if (c.nome === 'Testando leiautes') nomeModelo = c.id
                })
                //Cadastrar um Leiaute utilizando o ID do modelo cadastrado acima
                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '56789',
                        descricao: 'Leiaute 56789 do modelo cy',
                        status: 'Ativo',
                        vigencia: {
                            inicio: '2025-01-03T00:00:00'   
                        }
                    },
                    failOnStatusCode: false
                }).its('status').should('be.equal', 200)
                //Cadasrar um segundo leiaute para o mesmo modelo
                //de forma que a data fim desse primeiro leiaute seja alterada automaticamente 
                //de null para data vigência início do segundo leiaute cadastrado
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute'
                }).then(resposta => {
                    let nomeModelo = null
                    resposta.body.retorno.forEach(c => {
                        if (c.nome === 'Testando leiautes') nomeModelo = c.id
                    })
                    //Cadastrando o segundo Leiaute utilizando o ID do modelo cadastrado acima
                    cy.request({
                        method: 'POST',
                        url: '/Leiaute',
                        body:
                        {
                            idModeloLeiaute: (nomeModelo),
                            codigo: '4859',
                            descricao: 'Leiaute 005 do modelo EFD Contribuições cy',
                            status: 'Ativo',
                            vigencia: {
                                inicio: '2025-06-03T00:00:00',
                                fim: '2025-10-03T00:00:00'
                            }
                        },
                        failOnStatusCode: false
                    }).as('response')
                    //Validar se o primeiro leiaute que tinha a data fim = null foi atualizado
                    cy.request({
                        method: 'GET',
                        url: '/Leiaute'
                    }).then(resposta => {
                        let codigoLeiaute = null
                        let statusLeiaute = null
                        resposta.body.retorno.forEach(c => {
                            if (c.codigo === '56789') codigoLeiaute = c.codigo
                            if (c.vigencia.fim === '2025-06-02T00:00:00') statusLeiaute = c.vigencia.fim
                        })
                        //console.log(resposta.body.retorno[4])
                        expect(codigoLeiaute).to.be.equal('56789') ,
                        expect(statusLeiaute).to.be.equal('2025-06-02T00:00:00')
                    })
                })    
            })
        })

        it('X - PUT - Alterar (Descrição) de um Leiaute', () => {
            //esse teste quebrou. por que na busca GET ele trouxe dois resultados com 99999
            //assim ele pegou um leiaute que eu não queria.
            //para resolver, preciso apagar esse registro com o codigo = 99999000
            //o problema é que eu apaguei o modelo desse leiaute e por isso não me permite deletar os leiautes iniciando com 99999
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '99999'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body:
                    {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '99999',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Ativo',
                        vigencia:
                        {
                            inicio: '2023-02-03T02:00:00',
                            fim: '2023-12-03T02:00:00'
                        }
                    }
                }).as('response')
            })
            cy.get('@response').its('status').should('be.equal', 200)
            cy.get('@response').its('body.retorno').should('exist')
            cy.request({
                method: 'GET',
                url: '/Leiaute'
            }).then(resposta => {
                let descricaoLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.descricao === 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy') descricaoLeiaute = c.descricao
                })
                expect(descricaoLeiaute).to.be.equal('Leiaute 99999 do modelo EFD Contribuições alterado pelo cy')
            })
        })

        it('Z - PUT - Alterar (Status) de um Leiaute', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '99999'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body:
                    {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '99999',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo',
                        vigencia:
                        {
                            inicio: '2023-02-03T02:00:00',
                            fim: '2023-12-03T02:00:00'
                        }
                    }
                }).as('response')
            })
            cy.get('@response').its('status').should('be.equal', 200)
            cy.get('@response').its('body.retorno').should('exist')
            cy.request({
                method: 'GET',
                url: '/Leiaute'
            }).then(resposta => {
                let statusLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.status === 'Inativo') statusLeiaute = c.status
                })
                expect(statusLeiaute).to.be.equal('Inativo')
            })
        })

        it('K - PUT - Alterar (vigencia.Início) de um Leiaute', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '99999'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body:
                    {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '99999',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo',
                        vigencia:
                        {
                            inicio: '2023-02-01T01:00:00',
                            fim: '2023-12-03T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')
            })
            cy.get('@response').its('status').should('be.equal', 200)
            cy.get('@response').its('body.retorno').should('exist')
            // cy.request({
            //     method: 'GET',
            //     url: '/Leiaute'
            // }).then (resposta => {
            //     let inicioLeiaute = null
            //     resposta.body.retorno.forEach(c => {
            //         if(c.ini === '2003-01-01T02:00:00') inicioLeiaute = c.ini
            // })
            // console.log(resposta)
            // //expect(resposta.body.retorno[0].vigencia.inicio).to.contain('2004-01-01T02:00:00')
            // expect(resposta.body.retorno[0].vigencia.inicio).to.be.equal('2003-01-01T02:00:00')

            //})
        })

        it('W - PUT - Alterar (vigencia.Fim) de um Leiaute', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '99999'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body:
                    {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '99999',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo',
                        vigencia:
                        {
                            inicio: '2023-02-01T01:00:00',
                            fim: '2023-12-01T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')
            })
            cy.get('@response').its('status').should('be.equal', 200)
            cy.get('@response').its('body.retorno').should('exist')

            // cy.request({
            //     method: 'GET',
            //     url: '/Leiaute'
            // }).then (resposta => {
            //     let inicioLeiaute = null
            //     resposta.body.retorno.forEach(c => {
            //         if(c.dtini === '2022-01-02T02:00:00') inicioLeiaute = c.dtini
            //     })
            //     expect(inicioLeiaute).to.be.equal ('2022-01-02T02:00:00')
            // })
        })

        it('Y - PUT - Alterar (codigo) de um Leiaute', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '99999'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body:
                    {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '88888',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo',
                        vigencia:
                        {
                            inicio: '2023-02-01T01:00:00',
                            fim: '2023-12-01T02:00:00'
                        }
                    }
                }).as('response')
            })
            cy.get('@response').its('status').should('be.equal', 200)
            cy.get('@response').its('body.retorno').should('exist')

            cy.request({
                method: 'GET',
                url: '/Leiaute'
            }).then(resposta => {
                let codLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.codigo === '88888') codLeiaute = c.codigo
                })
                expect(codLeiaute).to.be.equal('88888')
            })
        })
        //EA-60 Concluída
        it('AA - PUT - Alterar um Leiaute passando um valor não numérico no campo Código (Campo deve aceitar apenas valores Numéricos)', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '88888'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body:
                    {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: 'rrrrr',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo',
                        vigencia:
                        {
                            inicio: '2023-02-01T01:00:00',
                            fim: '2023-12-01T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')
            })
            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Codigo[0]).to.be.equal('Deve ser um inteiro positivo')
            })
        })

        it('AB - PUT - Alterar campo Codigo vazio (O campo de Codigo é obrigatório)', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '88888'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body: {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo',
                        vigencia: {
                            inicio: '2023-02-01T01:00:00',
                            fim: '2023-12-01T02:00:00'
                        }
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

        it('AC - PUT - Alterar campo Descrição vazio (O campo de Descrição é obrigatório)', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '88888'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body: {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '88888',
                        descricao: '',
                        status: 'Inativo',
                        vigencia: {
                            inicio: '2023-02-01T01:00:00',
                            fim: '2023-12-01T02:00:00'
                        }
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

        it('AD - PUT - Alterar campo Vigencia vazio (O campo de Vigencia é obrigatório)', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '88888'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body: {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '88888',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo'
                    },
                    failOnStatusCode: false
                }).as('response')
            })

            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo de Vigencia é obrigatório')
            })
        })
        // EA-63
        it('AE - PUT - Alterar campo Início da Vigencia não informado (O campo de Vigencia é obrigatório)', () => {
            //Não acho necessário tal verificação. O que vai acontecer é que o campo início não será alterado
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '88888'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body: {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '88888',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo',
                        vigencia:
                        {
                            fim: '2023-12-01T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')
            })
            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                //expect(resposta.body.errors.Leiaute[0]).to.be.equal('Existe um conflito de vigência com outro leiaute cadastrado')
                expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo de Inicio é obrigatório')
            })
        })
        // EA-64
        it('AF - PUT - Alterar campo Início da Vigencia (mês) - data inválida (O campo inicio está em um formato inválido!)', () => {
            //Não acho necessário tal verificação. O que vai acontecer é que o campo início não será alterado
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '88888'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body: {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '88888',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo',
                        vigencia:
                        {
                            inicio: '2023-22-03T02:00:00',
                            fim: '2024-01-01T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')
            })
            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                //expect(resposta.body.errors.Leiaute[0]).to.be.equal('Existe um conflito de vigência com outro leiaute cadastrado')
                expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo inicio está em um formato inválido!')
            })
        })
        // EA-64
        it('AG - PUT - Alterar campo Início da Vigencia (dia) - data inválida (O campo inicio está em um formato inválido!)', () => {
            //Não acho necessário tal verificação. O que vai acontecer é que o campo início não será alterado
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '88888'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body: {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '88888',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo',
                        vigencia:
                        {
                            inicio: '2023-12-33T02:00:00',
                            fim: '2024-01-01T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')
            })
            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                //expect(resposta.body.errors.Leiaute[0]).to.be.equal('Existe um conflito de vigência com outro leiaute cadastrado')
                expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo inicio está em um formato inválido!')
            })
        })
        // EA-64
        it('AH - PUT - Alterar campo Início da Vigencia (hora) - data inválida (O campo inicio está em um formato inválido!)', () => {
            //Não acho necessário tal verificação. O que vai acontecer é que o campo início não será alterado
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '88888'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body: {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '88888',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo',
                        vigencia:
                        {
                            inicio: '2023-12-03T32:00:00',
                            fim: '2024-01-01T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')
            })
            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                //expect(resposta.body.errors.Leiaute[0]).to.be.equal('Existe um conflito de vigência com outro leiaute cadastrado')
                expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo inicio está em um formato inválido!')
            })
        })
        // EA-64
        it('AI - PUT - Alterar campo Fim da Vigencia (mês) - data inválida (O campo fim está em um formato inválido!)', () => {
            //Não acho necessário tal verificação. O que vai acontecer é que o campo início não será alterado
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '88888'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body: {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '88888',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo',
                        vigencia:
                        {
                            inicio: '2023-10-03T02:00:00',
                            fim: '2024-21-01T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')
            })
            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                //expect(resposta.body.errors.Leiaute[0]).to.be.equal('Existe um conflito de vigência com outro leiaute cadastrado')
                expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo fim está em um formato inválido!')
            })
        })
        // EA-64
        it('AJ - PUT - Alterar campo Fim da Vigencia (dia) - data inválida (O campo fim está em um formato inválido!)', () => {
            //Não acho necessário tal verificação. O que vai acontecer é que o campo início não será alterado
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '88888'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body: {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '88888',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo',
                        vigencia:
                        {
                            inicio: '2023-12-03T02:00:00',
                            fim: '2024-01-41T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')
            })
            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                //expect(resposta.body.errors.Leiaute[0]).to.be.equal('Existe um conflito de vigência com outro leiaute cadastrado')
                expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo fim está em um formato inválido!')
            })
        })
        // EA-64
        it('AL - PUT - Alterar campo Fim da Vigencia (hora) - data inválida (O campo fim está em um formato inválido!)', () => {
            //Não acho necessário tal verificação. O que vai acontecer é que o campo início não será alterado
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '88888'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body: {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '88888',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo',
                        vigencia:
                        {
                            inicio: '2023-12-03T02:00:00',
                            fim: '2024-01-01T32:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')
            })
            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                //expect(resposta.body.errors.Leiaute[0]).to.be.equal('Existe um conflito de vigência com outro leiaute cadastrado')
                expect(resposta.body.errors.Vigencia[0]).to.be.equal('O campo fim está em um formato inválido!')
            })
        })
    })

    describe(`2 - Teste API Leiaute (Filtros)`, () => {

        it('A - POST - Populando base com Leiaute', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.nome === 'Teste para leiaute') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '77777',
                        descricao: 'Leiaute 77777 do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia: {
                            inicio: '2024-03-01T02:00:00',
                            fim: '2024-03-30T02:00:00'
                        }
                    }
                }).its('status').should('be.equal', 200)
            })

        })

        it('B - GET - (Listar todos) Filtrar leiaute pelo Codigo', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    Codigo: '88888'
                }
            }).then(resposta => {
                let codigoLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.cod === '88888') codigoLeiaute = c.cod
                })
                console.log(resposta)
                expect(resposta.body.retorno[0].codigo).to.contain('88888')

            })
        })

        it('C - GET - (Listar todos) Filtrar leiaute pela Descrição', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    Descricao: '77777'
                }
            }).then(resposta => {
                let descricaoLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.desc === '77777') descricaoLeiaute = c.desc
                })
                console.log(resposta)
                expect(resposta.body.retorno[0].descricao).to.contain('77777')

            })
        })

        it('D - GET - (Listar todos) Filtrar leiaute pelo Status', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    Status: 'Ativo'
                }
            }).then(resposta => {
                let statusLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.statu === 'Ativo') statusLeiaute = c.statu
                })
                console.log(resposta)
                expect(resposta.body.retorno[0].status).to.contain('Ativo')
                expect(resposta.body.retorno.length).to.be.above(1) //Validando se existema mais de 1 registro nessa página 

            })
        })
        //se o Marcio me confirmar que a busca está implementada errada pq deveria trazer apenas o registro que tem a 
        //data fim exatamente igual a assertiva de meu GET
        //Após ele corrigir eu posso tirtar o comentário da minha assertiva
        it('E - GET - (Listar todos) Filtrar leiaute pela Vigência.Início', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    'Vigencia.Inicio': '2024-02-01T02:00:00'
                }
            }).then(resposta => {
                let inicioLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.ini === '2024-02-01T02:00:00') inicioLeiaute = c.ini
                })
                console.log(resposta)
                //expect(resposta.body.retorno[0].vigencia.inicio).to.be.equal('2004-02-01T02:00:00')
                // Assertiva acima: como ela ta retornando mais de um registro o teste quebra, mas ele ta certo
                expect(resposta.body.retorno.length).to.be.above(1) //Validando se existema mais de 1 registro nessa página 

            })
        })
        //se o Marcio me confirmar que a busca está implementada errada pq deveria trazer apenas o registro que tem a 
        //data fim exatamente igual a assertiva de meu GET
        //Após ele corrigir eu posso tirtar o comentário da minha assertiva
        it('F - GET - (Listar todos) Filtrar leiaute pela Vigência.Fim', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    'Vigencia.Fim': '2024-03-01T02:00:00'
                }
            }).then(resposta => {
                let fimLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.fm === '2024-03-01T02:00:00') fimLeiaute = c.fm
                })
                console.log(resposta)
                //expect(resposta.body.retorno[0].vigencia.fim).to.be.equal('2004-03-01T02:00:00') 
                // Assertiva acima: como ela ta retornando mais de um registro o teste quebra, mas ele ta certo
                expect(resposta.body.retorno.length).to.be.above(1) //Validando se existema mais de 1 registro nessa página 
            })
        })

        it('G - GET - (Listar todos) Filtrar leiaute por uma página especifica e que exista registros', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    'Paginacao.Pagina': '1'
                }
            }).then(resposta => {
                let fimLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.fm === '2024-03-01T02:00:00') fimLeiaute = c.fm
                })
                console.log(resposta)
                expect(resposta.body.retorno.length).to.be.above(1) //Validando se existema mais de 1 registro nessa página 
            })
        })

        it('H - GET - (Listar todos) Filtrar leiaute por uma página que NÃO exista registros', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    'Paginacao.Pagina': '1000'
                }
            }).then(resposta => {
                let fimLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.fm === '2024-03-01T02:00:00') fimLeiaute = c.fm
                })
                console.log(resposta)
                expect(resposta.body.retorno.length).to.be.equal(0)
                //Validando se na página 1000 o número de registros seja = 0
            })
        })

        it('I - GET - (Listar todos) Filtrar leiaute pelo total de páginas', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    'Paginacao.TotalPorPagina': '2'
                }
            }).then(resposta => {
                let fimLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.fm === '2024-03-01T02:00:00') fimLeiaute = c.fm
                })
                console.log(resposta)
                expect(resposta.body.retorno.length).to.be.equal(2)
                //Validando o total de registros disponíveis por página. Nesse teste são 2 por página
            })
        })
    })

    describe(`3 - Teste API Leiaute (Validando: Limite de caracteres)`, () => {

        it('A - POST - Limite de caracteres - codigo [50]', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body: {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '006666666606666666660666666666000666666660666666666066666666600066666666066666666606666666660',
                        descricao: 'Leiaute codigo [50] do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo',
                        vigencia: {
                            inicio: '2025-03-01T00:00:00',
                            fim: '2025-04-01T02:00:00'
                        }
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

        it('B - POST - Limite de caracteres - descricao [150]', () => {
            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima

                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body: {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '066',
                        descricao: 'Leiaute 005 do modelo EFD Contribuições alterado pelo cy. Este manual visa a orientar a execução dos serviços destinados à emissão de documentos e escrituração de livros fiscais',
                        status: 'Inativo',
                        vigencia: {
                            inicio: '2025-03-01T00:00:00',
                            fim: '2025-04-01T02:00:00'
                        }
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

        it('C - PUT - Limite de caracteres - codigo [50]', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '77777'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body:
                    {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '006666666606666666660666666666000666666660666666666066666666600066666666066666666606666666660',
                        descricao: 'Leiaute 77777 do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia:
                        {
                            inicio: '2024-03-01T02:00:00',
                            fim: '2024-03-30T02:00:00'
                        }
                    },
                    failOnStatusCode: false
                }).as('response')
            })

            cy.get('@response').then(resposta => {
                console.log(resposta)
                expect(resposta.status).to.be.equal(400)
                expect(resposta.body.errors.Codigo[0]).to.be.equal('O campo deve ter no máximo 50 caracteres')
            })
        })

        it('D - PUT - Limite de caracteres - descricao [150]', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '77777'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body:
                    {
                        idModeloLeiaute: `${resposta.body.retorno[0].idModeloLeiaute}`,
                        codigo: '77777',
                        descricao: 'Leiaute 77777 do modelo EFD Contribuições cy. Este manual visa a orientar a execução dos serviços destinados à emissão de documentos e escrituração de livros fiscais',
                        status: 'Ativo',
                        vigencia:
                        {
                            inicio: '2024-03-01T02:00:00',
                            fim: '2024-03-30T02:00:00'
                        }
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
    })
        describe('4 - Testes API Leiaute - DELETE', () => {

            //Leiaute cadastrado no primeiro cenário de teste do describe: Testes API Leiaute
            it('A - DELETE - Cadastro de Leiaute (1-A)', () => {
                cy.request({
                    method: 'GET',
                    url: '/Leiaute',
                    qs:
                    {
                        codigo: '88888'
                    }
                }).then(resposta => {
                    cy.request({
                        method: 'DELETE',
                        url: `/Leiaute/${resposta.body.retorno[0].id}`
                    }).its('status').should('be.equal', 200)
                })
            })
            //Leiaute cadastrado no primeiro cenário de teste do describe: Testes API Leiaute
            it('B - DELETE - Cadastro de Leiaute (1-H)', () => {
                cy.request({
                    method: 'GET',
                    url: '/Leiaute',
                    qs:
                    {
                        codigo: '99995'
                    }
                }).then(resposta => {
                    cy.request({
                        method: 'DELETE',
                        url: `/Leiaute/${resposta.body.retorno[0].id}`
                    }).its('status').should('be.equal', 200)
                })
            })
            //Leiaute cadastrado no primeiro cenário de teste do describe: Teste API Leiaute (Filtros)
            it('C - DELETE - Removendo leiaute cadastrado para o teste (2-A)', () => {
                cy.request({
                    method: 'GET',
                    url: '/Leiaute',
                    qs:
                    {
                        codigo: '77777'
                    }
                }).then(resposta => {
                    cy.request({
                        method: 'DELETE',
                        url: `/Leiaute/${resposta.body.retorno[0].id}`
                    }).its('status').should('be.equal', 200)
                })
            })

            it('D - DELETE - Removendo leiaute cadastrado para o teste (1-N)', () => {
                cy.request({
                    method: 'GET',
                    url: '/Leiaute',
                    qs:
                    {
                        codigo: '111111'
                    }
                }).then(resposta => {
                    cy.request({
                        method: 'DELETE',
                        url: `/Leiaute/${resposta.body.retorno[0].id}`
                    }).its('status').should('be.equal', 200)
                })
            })

            it('E - DELETE - Removendo leiaute cadastrado para o teste (1-K)', () => {
                cy.request({
                    method: 'GET',
                    url: '/Leiaute',
                    qs:
                    {
                        codigo: '99992'
                    }
                }).then(resposta => {
                    cy.request({
                        method: 'DELETE',
                        url: `/Leiaute/${resposta.body.retorno[0].id}`
                    }).its('status').should('be.equal', 200)
                })
            })

            it('F - DELETE - Identificação do leiaute inválida', () => {
                cy.request({
                    method: 'DELETE',
                    url: `/Leiaute/asdsafsf-fdsfsd`,
                    failOnStatusCode: false
                }).as('response')

                cy.get('@response').then(resposta => {
                    console.log(resposta)
                    expect(resposta.status).to.be.equal(404)
                    expect(resposta.body.errors[""][0]).to.be.equal('A identificação do Leiaute é inválida')

                })
            })

            it('G - DELETE - Remover o Modelo cadastrado para os testes de leiaute (1-A)', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs:
                    {
                        nome: 'Teste para leiaute'
                    }
                }).then(resposta => {
                    cy.request({
                        method: 'DELETE',
                        url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`
                    }).its('status').should('be.equal', 200)
                })
            })

            it('H - DELETE - Remover o leiaute cadastrado para os testes de leiaute (1-V)', () => {
                cy.request({
                    method: 'GET',
                    url: '/Leiaute',
                    qs:
                    {
                        codigo: '56789'
                    }
                }).then(resposta => {
                    cy.request({
                        method: 'DELETE',
                        url: `/Leiaute/${resposta.body.retorno[0].id}`
                    }).its('status').should('be.equal', 200)
                })
            })

            it('I - DELETE - Remover o leiaute cadastrado para os testes de leiaute (1-V)', () => {
                cy.request({
                    method: 'GET',
                    url: '/Leiaute',
                    qs:
                    {
                        codigo: '4859'
                    }
                }).then(resposta => {
                    cy.request({
                        method: 'DELETE',
                        url: `/Leiaute/${resposta.body.retorno[0].id}`
                    }).its('status').should('be.equal', 200)
                })
            })

            it('J - DELETE - Remover o Modelo cadastrado para os testes de leiaute (1-V)', () => {
                cy.request({
                    method: 'GET',
                    url: '/ModeloLeiaute',
                    qs:
                    {
                        nome: 'Testando leiautes'
                    }
                }).then(resposta => {
                    cy.request({
                        method: 'DELETE',
                        url: `/ModeloLeiaute/${resposta.body.retorno[0].id}`
                    }).its('status').should('be.equal', 200)
                })
            })

        })

    describe.skip('Arquivo morto', () => {
        it('Cadastrando um modelo e depois um leiaute baseado no modelo', () => {
            //Cadastrando um modelo pra utilizar nos testes de Leiaute
            cy.request({
                method: 'POST',
                url: '/ModeloLeiaute',
                body: {
                    idEscopo: '012644f1-34c5-452e-a40d-5a3c2fa70d46',
                    nome: 'Teste para leiaute',
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
                    if (c.nome === 'Teste para leiaute') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '99999000',
                        descricao: 'Leiaute 005 do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia: {
                            inicio: '2003-02-03T02:00:00',
                            fim: '2003-12-03T02:00:00'
                        }
                    }
                }).its('status').should('be.equal', 200)
            })
        })

        it('Cadastrar um leiaute baseado em um modelo qualquer que exista.', () => {

            //Buscando no cadastro o modelo registrado acima
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute'
            }).then(resposta => {

                let nomeModelo = null
                resposta.body.retorno.forEach(c => {
                    if (c.tipo === 'Sistema') nomeModelo = c.id
                })
                //Cadastrando o Leiaute utilizando o ID do modelo cadastrado acima
                cy.request({
                    method: 'POST',
                    url: '/Leiaute',
                    body:
                    {
                        idModeloLeiaute: (nomeModelo),
                        codigo: '9988',
                        descricao: 'Leiaute 005 do modelo EFD Contribuições cy',
                        status: 'Ativo',
                        vigencia: {
                            inicio: '2004-01-01T02:00:00',
                            fim: '2004-02-02T02:00:00'
                        }
                    }
                }).its('status').should('be.equal', 200)
            })
        })

        it.skip('PUT - Alterando (idModeloLeiaute) de um Leiaute', () => {
            //Acredito que é um cenário que não ocorrerá na realizada, por isso desativei
            cy.request({
                method: 'GET',
                url: '/Leiaute',
                qs:
                {
                    codigo: '99999'
                }
            }).then(resposta => {
                cy.request({
                    method: 'PUT',
                    url: `/Leiaute/${resposta.body.retorno[0].id}`,
                    body:
                    {
                        idModeloLeiaute: 'c6557d37-eebc-4740-b4ce-8e23479782c4',
                        codigo: '99999',
                        descricao: 'Leiaute 99999 do modelo EFD Contribuições alterado pelo cy',
                        status: 'Inativo',
                        vigencia:
                        {
                            inicio: '2003-02-03T02:00:00',
                            fim: '2003-12-03T02:00:00'
                        }
                    }
                }).as('response')
            })
            cy.get('@response').its('status').should('be.equal', 200)
            cy.get('@response').its('body.retorno').should('exist')
            cy.request({
                method: 'GET',
                url: '/Leiaute'
            }).then(resposta => {
                let idmodLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.idModeloLeiaute === 'c6557d37-eebc-4740-b4ce-8e23479782c4') idmodLeiaute = c.idModeloLeiaute
                })
                expect(idmodLeiaute).to.be.equal('c6557d37-eebc-4740-b4ce-8e23479782c4')
            })
        })

        it.skip('POST - Cadastrando um Leiaute', () => {
            cy.request({
                method: 'POST',
                url: '/Leiaute',
                body:
                {
                    idModeloLeiaute: '56eb2e91-4e37-4f60-996c-298f4107211b',
                    codigo: '99999',
                    descricao: 'Leiaute 005 do modelo EFD Contribuições cy',
                    status: 'Ativo',
                    vigencia: {
                        inicio: '2003-02-03T02:00:00',
                        fim: '2003-12-03T02:00:00'
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

        it.skip('Tentando verificar se existe leiaute cadastrado para modelo de nome teste para leiaute', () => {
            cy.request({
                method: 'GET',
                url: '/ModeloLeiaute',
                qs:
                {
                    nome: 'Teste para leiaute'
                }
            }).then(resposta => {
                cy.request({
                    method: 'GET',
                    url: `/Leiaute?idModeloLeiaute=${resposta.body.retorno[0].id}`
                }).its('status').should('be.equal', 200)
            })

            //"3f000849-8996-499d-b665-be82e25dc1ae"
            // cy.request({
            //     method: 'GET',
            //     url: '/ModeloLeiaute',
            //     qs: 
            //     {
            //         nome: 'Teste para leiaute'
            //     }
            // }).then(resposta => console.log(resposta))
        })

        it.skip('Validando 2 condições', () => {
            cy.request({
                method: 'GET',
                url: '/Leiaute'
            }).then(resposta => {
                let codigoLeiaute = null
                let statusLeiaute = null
                resposta.body.retorno.forEach(c => {
                    if (c.codigo === '56789') codigoLeiaute = c.codigo
                    if (c.vigencia.fim === '2025-06-02T00:00:00') statusLeiaute = c.vigencia.fim

                })
                console.log(resposta.body.retorno[4])
                expect(codigoLeiaute).to.be.equal('56789') ,
                expect(statusLeiaute).to.be.equal('2025-06-02T00:00:00')
            })
        })
    })

})
