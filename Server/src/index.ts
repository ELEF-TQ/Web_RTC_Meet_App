import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { roomHandler } from './controllers/roomHandler';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

io.on('connection', (socket) => {
  console.log('user connected');

  roomHandler(socket)

  //__DISCONNECT :
  socket.on('disconnect', () =>{
    console.log('user disconnected');
  })

});

server.listen(8080, () => {
  console.log('Listening on port 8080');
});
