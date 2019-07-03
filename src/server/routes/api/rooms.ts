import * as express from 'express';
import DB from '../../db';

const roomsRouter = express.Router();



roomsRouter.get('/', async (req, res, next) => {
    try {
        let categories = await DB.Rooms.showAllRooms();
        res.send(categories)
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

roomsRouter.get('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let [category] = await DB.Rooms.oneRoom(id);
        res.send(category)
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default roomsRouter;