import * as bcrypt from 'bcrypt';
import passport = require('passport');

export const HashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

export const ComparePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
};

// console.log(HashPassword('Kyle'))