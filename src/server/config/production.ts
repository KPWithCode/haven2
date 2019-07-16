export default {
    mysql: {
        connectionLimit:10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_SCHEMA,
        password: process.env.DB_PASS
    },
    auth: {
        secret: process.env.SECRET
    },
    knex: {
        client: 'mysql',
        connection: {
            host:process.env.KNEX_HOST ,
            user: process.env.KNEX_USER,
            database: process.env.KNEX_SCHEMA,
            password: process.env.KNEX_PASS
        },
        pool: {
            min: process.env.KNEX_POOL_MIN,
            max: process.env.KNEX_POOL_MAX
        }
    }
}