import { Socket } from 'socket.io';
import { v4 as uuidV4 } from 'uuid';

export const roomHandler = (socket: Socket) => {
  //__CREATE MEET :
  const createMeet = () => {
    const roomId = uuidV4();
    socket.emit('meeting-created', { roomId });
  };

  //__JOIN MEET :
  const joinMeeting = ({ roomId }: { roomId: string }) => {
    console.log('user joined', roomId);
    socket.join(roomId);

  };

  //__SOCKETS :
  socket.on('create-meeting', () => createMeet()); // Invoke createMeet
  socket.on('join-meeting', (data) => joinMeeting(data)); // Invoke joinMeeting
};
