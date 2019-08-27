import * as express from 'express';
import DB from '../../db';
import { RequestHandler } from 'express-serve-static-core';



const msgRouter = express.Router()

const isAdmin: RequestHandler = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401);
    } else {
        return next();
    }
};

msgRouter.get('/', async (req, res, next) => {
    try {
        let msgs = await DB.Msg.getAllMsgs();
        res.send(msgs);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Logic to search for a bookon the front end
msgRouter.get('/:id?', async (req, res, next) => {
    try {
        let id = req.params.id;
        let [oneMsg] = await DB.Msg.oneMsg(id);
        res.send(oneMsg);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


msgRouter.post('/', async (req, res, next) => {
    try {
        // let id= req.body.id;
        // let created = req.body._created
        let content = req.body.content
        // let userid = req.body.userid
        let newMsg = await DB.Msg.newMsg(content);
        res.json({ message: "Posted" })
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
});





msgRouter.delete('/:id', isAdmin, async (req, res, next) => {
    try {
        let id = req.params.id;
        let msg = await DB.Msg.deleteMsg(id)
        res.json({ message: "Deletion" });
    } catch (e) {
        console.log(e);
        res.sendStatus(500)
    }
});


export default msgRouter;