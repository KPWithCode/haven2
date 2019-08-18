import * as mysql from 'mysql';
import config from '../config';
import Users from './users'
import Tokens from './tokens';
import Msg from './message'
import Rooms from './rooms'
import * as knex from 'knex';

export const knexPool = knex(config.knex)

export const pool = mysql.createPool(config.mysql);

export const Query = (query: string, values?: Array<string | number>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        pool.query(query, [values], (err, results) => {
            if (err) reject(err);
            return resolve(results);
        });
    });
};

export default {
 Users,
 Tokens,
 Msg,
 Rooms
}