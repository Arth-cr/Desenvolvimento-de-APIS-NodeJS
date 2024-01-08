const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')
require('dotenv/config')

const context = new Context(new Postgres())

const MOCK_HEROI_CADASTRAR = { nome: 'Arqueiro Verde', poder: 'Mira' }
const MOCK_HEROI_ATUALIZAR = { nome: 'Batman', poder: 'Dinheiro' }

describe('Postgres Strategy', function () {
  this.timeout(Infinity)
  this.beforeAll(async () => {
    await context.connect()
    await context.delete()
    await context.create(MOCK_HEROI_ATUALIZAR)
  })
  it('PostgresSQL Connection', async function () {
    const result = await context.isConnected()
    assert.equal(result, true)
  })
  it('Cadastrar Novo Heroi', async function () {
    const result = await context.create(MOCK_HEROI_CADASTRAR)
    delete result.id
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
  })
  it('Listar Herois', async function () {
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
    delete result.id

    assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
  })
  it('Atualizar Herois', async function () {
    const [itemAtualizar] = await context.read({
      nome: MOCK_HEROI_ATUALIZAR.nome,
    })
    const novoItem = {
      ...MOCK_HEROI_ATUALIZAR,
      nome: 'Homem de Ferro',
    }
    const [result] = await context.update(itemAtualizar.id, novoItem)
    const [itemAtualizado] = await context.read({ id: itemAtualizar.id })

    assert.deepEqual(result, 1)
    assert.deepEqual(itemAtualizado.nome, novoItem.nome)
  })
  it('Remover Heroi por ID', async () => {
    const [item] = await context.read({})
    const result = await context.delete(item.id)
    assert.deepEqual(result, 1)
  })
})
