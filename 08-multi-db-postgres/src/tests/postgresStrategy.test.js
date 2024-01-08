const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')
require('dotenv/config')

const context = new Context(new Postgres())

const MOCK_HEROI_CADASTRAR = { nome: 'Arqueiro Verde', poder: 'Mira' }

describe('Postgres Strategy', function () {
  this.timeout(Infinity)
  this.beforeAll(async () => {
    console.log('Key', process.env.SENHA_DB)
    db = await context.connect()
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
})
