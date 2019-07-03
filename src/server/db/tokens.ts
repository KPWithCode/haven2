import { knexPool as knex } from './index';
// Query(`SELECT * FROM Tokens WHERE id = ${id} AND token = ?`, [token]);
const findOne = async (id: number, token: string) => knex('Tokens').where({ id, token });
// id instead of userid

// Query(`INSERT INTO Tokens (userid) VALUES (${userid})`);
const insert = async (userid: number) =>  knex('Tokens').insert(userid)

// Query(`UPDATE Tokens SET token = "${token}" WHERE id = ?`, [id]);
const update = async (id: number, token: string) => knex('Tokens').update(token).where('id', id)
// knex('Tokens').update(id, token)

export default {
    findOne,
    insert,
    update
}