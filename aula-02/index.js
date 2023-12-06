/*
  0 obter um usuario
  1 obter o numero de telefone de um usuario apartir de seu id
  2 obter o endereco do usuario pelo id
*/

function obterUsuario(callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      nome: 'Arthur',
      nascimento: new Date(),
    })
  }, 1000)
}

function obterTelefone(id, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: '99270-7070',
      ddd: 11,
    })
  }, 2000)
}

function obterEndereco(id, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'Rua do Carmelo',
      numero: 120,
    })
  }, 2000)
}

obterUsuario(function resolverUsuario(erro, usuario) {
  if (erro) {
    console.erro('Erro em Usuário', erro)
    return
  }
  obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
    if (erro1) {
      console.erro('Erro em Telefone', erro1)
      return
    }
    obterEndereco(usuario.id, function resolverTelefone(erro2, endereco) {
      if (erro2) {
        console.erro('Erro em Endereço', erro)
        return
      }

      console.log(`
      Nome: ${usuario.nome}
      Endereco: ${endereco.rua}, ${endereco.numero}
      Telefone: (${telefone.ddd}) ${telefone.telefone}
      `)
    })
  })
})
// const telefone = obterTelefone(usuario.id)

// console.log('tel', telefone)
