/*
  0 obter um usuario
  1 obter o numero de telefone de um usuario apartir de seu id
  2 obter o endereco do usuario pelo id
*/

function obterUsuario() {
  // quando der algum problema => reject(ERRO)
  // quando sucess => resolve

  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      // return reject(new Error('Reject Erro resolvePromise'))
      return resolve({
        id: 1,
        nome: 'Arthur',
        nascimento: new Date(),
      })
    }, 1000)
  })
}

const usuarioPromise = obterUsuario()
// para manipular o sucesso utilize a função .then
// para manipular o erro usamos .catch

function obterTelefone(id) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '99270-7070',
        ddd: 11,
      })
    }, 2000)
  })
}

usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
        },
        telefone: result,
      }
    })
  })
  .then(function (resultado) {
    console.log('resultado', resultado)
  })
  .catch(function (error) {
    console.error('Erro usuarioPromise', error)
  })

// function obterEndereco(id, callback) {
//   setTimeout(() => {
//     return callback(null, {
//       rua: 'Rua do Carmelo',
//       numero: 120,
//     })
//   }, 2000)
// }

// obterUsuario(function resolverUsuario(erro, usuario) {
//   if (erro) {
//     console.erro('Erro em Usuário', erro)
//     return
//   }
//   obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
//     if (erro1) {
//       console.erro('Erro em Telefone', erro1)
//       return
//     }
//     obterEndereco(usuario.id, function resolverTelefone(erro2, endereco) {
//       if (erro2) {
//         console.erro('Erro em Endereço', erro)
//         return
//       }

//       console.log(`
//       Nome: ${usuario.nome}
//       Endereco: ${endereco.rua}, ${endereco.numero}
//       Telefone: (${telefone.ddd}) ${telefone.telefone}
//       `)
//     })
//   })
// })
// const telefone = obterTelefone(usuario.id)

// console.log('tel', telefone)
