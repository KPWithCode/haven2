import { knexPool as knex } from './index';
import { Query } from './index';
//Fixed
const getAllMsgs = () => knex('Message').select();

// Query(`SELECT * FROM Message WHERE id = '${id}'`) FIXED
const oneMsg = async (id: number) => knex('Message').select().where('id', id);

//Fixed
const deleteMsg = async (id: number) => knex('Message').where({ id }).del();

// Query(`INSERT INTO Message (content,userid) VALUES ("${content}",${userid})`)
// const newMsg = async (content: string, userid: number) => knex('Message').insert({ content, userid })
const newMsg = async (content:string, userid:number) => Query(`INSERT INTO Message (content,userid) VALUES ("${content}", "${userid}")`);
// Query(`UPDATE Message SET id = ${id}, title = "${title}", price = "${[content]}" WHERE id = ?`, [id])
const changeMsg = async (id: number, content: string) => knex('Message').update(id, content)

export default {
    getAllMsgs,
    oneMsg,
    deleteMsg,
    newMsg,
    changeMsg
}
