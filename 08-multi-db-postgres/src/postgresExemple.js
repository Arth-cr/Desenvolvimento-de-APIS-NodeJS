// npm install sequelize
// npm install pg-hstore pg
const Sequelize = require('sequelize')
const driver = new Sequelize('heros', 'arthcr', 'SENHA_DB', {
  host: 'localhost',
  dialect: 'postgres',
  quoteIdentifiers: false,
  operatorsAlianses: false,
})

async function main() {
  const Herois = driver.define(
    'heros',
    {
      id: {
        type: Sequelize.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING,
        required: true,
      },
      poder: {
        type: Sequelize.STRING,
        required: true,
      },
    },
    {
      tableName: 'TB_HEROIS',
      freezeTableName: false,
      timestamps: false,
    },
  )

  await Herois.sync()

  await Herois.create({
    nome: 'Superman',
    poder: 'Todos',
  })

  const result = await Herois.findAll({ raw: true, attributes: ['nome'] })
  console.log('result', result)
}
main()
