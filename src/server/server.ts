import * as path from 'path';
import * as express from 'express';
import apiRouter from './routes';
import './middleware/bearerstrategy';
import './middleware/localstrategy';
import * as passport from 'passport';
// import * as socketio from 'socket.io';

const app = express();

// Socket set up and binded to http server
// let http = require("http").Server(app);
// let io = require("socket.io")(http);
// // // user connected 
// io.on("connection", function(socket: any) {
//     console.log("a user connected");


    // whenever we receive a 'message' we log it out
//     socket.on("message", function(message: any) {
//         console.log(message);
//       });

//   });
let p = path.join(__dirname, '/public');
app.use(express.json())
app.use(express.static(p));
app.use(apiRouter);
// console.log(p);
app.use(passport.initialize());

app.route('/auth').get(passport.authenticate(''))

app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
})    

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
