const { obterPessoas } = require('./service')

Array.prototype.meuReduce = function (callback, valorInicial) {
  let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]

  // for (let index = 0; index <= this.length - 1; index++) {
  //   valorFinal = callback(valorFinal, this[index], this)
  // }

  for (index of this) {
    valorFinal = callback(valorFinal, index, this)
  }

  return valorFinal
}

async function main() {
  try {
    const { results } = await obterPessoas('a')
    //trazer o peso das pessoas, somar e verificar o peso de cada um

    const pesos = results.map(item => parseInt(item.height))

    // const total = pesos.reduce((anterior, proximo) => {
    //   console.log(`
    //   anterior: ${anterior},
    //   proximo: ${proximo}
    //   `)
    //   return anterior + proximo
    // }, 0)

    const minhaLista = [
      ['Arthur', 'Ribeiro'],
      ['NodeBR', 'GitHub'],
    ]

    const total = minhaLista
      .meuReduce((anterior, proximo) => {
        return anterior.concat(proximo)
      }, [])
      .join(', ')
    // console.log('pesos', pesos)
    console.log('total', total)
  } catch (error) {
    console.log('Error: ', error)
  }
}
main()
