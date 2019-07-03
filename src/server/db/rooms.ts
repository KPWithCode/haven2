import { knexPool as knex } from './index';


// Query(`SELECT * FROM Categories`);
const showAllRooms = async () => knex('Rooms').select()

// Query(`SELECT * FROM Categories WHERE id = ?`, [id])
const oneRoom = async (id: number) => knex('Rooms').select().where('id', id);


export default {
    showAllRooms,
    oneRoom
}