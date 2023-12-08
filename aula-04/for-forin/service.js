const axios = require('axios')
// No curso é passado a url https://swapi.co/api/people porém a API mudou para .dev
const URL = `https://swapi.dev/api/people`

async function obterPessoas(nome) {
  const url = `${URL}/?search=${nome}&format=json`
  const response = await axios.get(url)

  return response.data
}

module.exports = {
  obterPessoas,
}

// obterPessoas('leia')
//   .then(function (resultado) {
//     console.log('resultado', resultado)
//   })
//   .catch(function (error) {
//     console.error('Erro:', error)
//   })
