## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Docker Compose

```bash
# init docker
$ docker compose -f stack-compose.yml up -d postgres

```

## Prisma

```bash
# init migrate
$ yarn prisma migrate dev --name init

# start migrates in database
$ yarn prisma migrate reset

# start database view
$ yarn prisma studio

```
