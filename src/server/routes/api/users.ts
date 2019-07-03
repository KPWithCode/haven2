import * as express from 'express';
import db from '../../db/index'



const usersRouter = express.Router();

usersRouter.get('/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        let user = await db.Users.findOneById(id);
        res.send(user);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


usersRouter.post('/', async (req, res, next) => {
    try {
        let query = req.body.query;
        let newUser = await db.Users.insert(query);
        res.json({ message: 'posted! ' })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

export default usersRouter;