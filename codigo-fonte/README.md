# Instruções de utilização

## Instalação do Back-end da Aplicação

O back-end da aplicação foi utilizado o framework NestJS e o ORM Prisma. Para instalar e rodar o servidor basta seguir as seguintes instruções:

- Instalação (necessário ter instalado o NodeJS, Yarn e Docker Desktop no computador)

```bash
$ yarn install
```

- Start da Aplicação em Desenvolvimento Local

```bash
$ docker-compose up -d

$ yarn prisma generate

$ yarn run start:dev

$ yarn prisma studio
```

Após realizar os comandos, basta acessar a documentação do Swagger pela url http://localhost:3000/api-doc e o banco de dados pela url http://localhost:5555/

- Start da Aplicação em Desenvolvimento usando Docker Compose

```bash
$ docker-compose up -d

$ yarn prisma studio
```

Após realizar os comandos, basta acessar a documentação do Swagger pela url http://localhost:3000/api-doc e o banco de dados pela url http://localhost:5555/

## Instalação do Front-end Web da Aplicação

- Instalação (necessário ter instalado o NodeJS e Yarn no computador)

```bash
$ yarn install
```

- Start da Aplicação em Desenvolvimento Local

```bash
$ yarn dev
```

## Histórico de versões

### [0.1.0] - 07/04/2024

#### Adicionado:

1. Autenticação de Usuário (back-end e front-end).
2. Autorização de Acesso de Usuário (back-end e front-end).
3. CRUD de Usuário (back-end e front-end).
4. CRUD de Cargos dos Usuários (back-end e front-end).

Essas implementações garantem segurança, gestão de usuários e administração de cargos no sistema.

### [1.0.0] - 23/06/2024

#### Adicionado:

1. Todas as funcionalidades implantadas (back-end e front-end).
2. Aplicação publicada na AWS (back-end e front-end).
