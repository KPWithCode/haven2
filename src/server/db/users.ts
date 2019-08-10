import { knexPool as knex } from './index';

// Query(`SELECT * FROM Users WHERE email = "${email}" LIMIT 1`);
const findOneByEmail = async (email: any) => knex('Users').select(email)

// Query(`SELECT * FROM Users WHERE id = ? LIMIT 1`, [id]|| .select().where('id',id));
const findOneById = async (id: number) => knex('Users').where('id')

// Query(`INSERT INTO Users (email, password,username) VALUES (?) `, [user]);
const insert = async (query:any) => knex('Users').insert(query)

// knex('Users').insert(user)
export default {
    findOneByEmail,
    findOneById,
    insert
}
