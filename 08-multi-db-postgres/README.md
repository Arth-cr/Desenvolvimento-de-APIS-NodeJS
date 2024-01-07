# Comandos para iniciar o Postgres com Docker

Rode esses comandos no GitBash/cms/PowerShell ou terminal de sua preferência.

## Comandos para Postgres

Para um passo-a-passo mais detalhado acesse: [Postgres](https://hub.docker.com/_/postgres).

```bash
docker run --name postgres -e POSTGRES_USER=arthcr -e POSTGRES_PASSWORD=04341528 -e POSTGRES_DB=nomeDataBase -p 5432:5432 -d postgres
```

Verifique se foi instalado corretamente com o comando:

```bash
 docker ps
```

Para inicializar rode:

```bash
 docker exec -ti postgres psql -U POSTGRES_USER { name }
```

### Comandos para instalar o Adminer (Painel de Admin SQL)

O adminer é um painel de controle rodado no localhost do seu browser, para iniciar ele siga os passos:

```bash
 docker run --name adminer -p 8080:8080 --link {name}:{name} -d adminer
```

Vá para o localhost:8080 no seu browser e você verá o formulário de login.

| Sistema: PostgresSQL | \
| Servidor: { name } | \
| Usuário: POSTGRES_USER | \
| Senha: POSTGRES_PASSWORD | \
| Base de dados: POSTGRES_DB |

## Comandos para Mongodb

Para um passo-a-passo mais detalhado acesse: [MongoDB](https://hub.docker.com/_/mongo).

```bash
docker run
 --name mongodb
 -p 27017:27017
 -e MONGO_INITDB_ROOT_USERNAME=admin
 -e MONGO_INITDB_ROOT_PASSWORD=senha
 -d mongo:4
```

Irá criar um localhost para execução

```bash
docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient
```

### Em seguida você irá no [localhost:3000](http://localhost:3000/).

| Clicar em Conect | \
| Create New | \
| Conection Name: mongodb | \
| Host/Port: mongodb | \
| Database Name: admin | \
| Clica em Authentication | \
| Authentication Type: A primeira opção (Sram-Sha-1) | \
| Username: admin | \
| Senha: { senha }| \
| Authentication DB: admin |

### Crie um usuário de readWrite

```bash
docker exec -it mongodb
 mongo --host localhost
 -u admin -p {senha}
 --authenticationDatabase admin
 --eval "db.getSiblingDB('Sua Database').createUser({user: 'novo user', pwd: 'senha', roles: [{role: 'readWrite', db: 'Sua Database'}]})"
```

Desconecte do admin no [localhost:3000](http://localhost:3000/) e crie um novo usuário como no passo-a-passo:

| Clicar em Conect | \
| Create New | \
| Conection Name: mongodb-readWrite | \
| Host/Port: mongodb | \
| Database Name: Sua Database | \
| Clica em Authentication | \
| Authentication Type: A primeira opção (Sram-Sha-1) | \
| Username: novo user | \
| Senha: { senha }| \
| Authentication DB: Sua Database |
