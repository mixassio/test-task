# How run

- run db `docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres`
- `npm i`
- `npm run start`

`localhost:3000/docs` - swagger 

Api позволяет зарегистрировать пользователя, залогиниться (получить jwt) и с помощью jwt получить список зарегистрированных юзеров