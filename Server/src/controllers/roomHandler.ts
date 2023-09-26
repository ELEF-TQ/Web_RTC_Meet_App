import { Socket } from 'socket.io';
import { v4 as uuidV4 } from 'uuid';

const rooms: Record<string, string[]> = {};

interface IRoomParams {
  roomId: string;
  peerId: string;
}

export const roomHandler = (socket: Socket) => {
  //__CREATE MEET :
  const createMeet = () => {
    const roomId = uuidV4();
    rooms[roomId] = [];
    socket.emit('meeting-created', { roomId });
  };

  //__JOIN MEET :
  const joinMeeting = ({ roomId, peerId }: IRoomParams) => {
    if (rooms[roomId]) {
      console.log('user joined', roomId, peerId);
      rooms[roomId].push(peerId);
      socket.join(roomId);
      socket.emit('get-users', {
        roomId,
        participants: rooms[roomId],
      });
    }

    socket.on('disconnect', () => {  
      console.log("user left the room", peerId);
      leaveMeeting({ roomId, peerId });});
  };

  //__DISCONNECT MEET :
  const leaveMeeting = ({ roomId, peerId }: IRoomParams) => {
    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
      socket.to(roomId).emit('user-left', peerId);
    }
  };
  

  //__SOCKETS :
  socket.on('create-meeting', () => createMeet());
  socket.on('join-meeting', (data) => joinMeeting(data));
 
};
