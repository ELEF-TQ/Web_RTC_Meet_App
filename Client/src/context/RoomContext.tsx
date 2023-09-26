import React, { createContext, useEffect, useState, ReactNode } from 'react';
import {useNavigate} from 'react-router-dom'
import io from 'socket.io-client';
import Peer from 'peerjs';
import { v4 as uuidV4} from 'uuid';
const WebHost = 'http://localhost:8080';
const webSocket = io(WebHost);


const RoomContext = createContext<null | any>(null);

type RoomProviderProps = {children: ReactNode};



const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [me, setMe] = useState<Peer>();

  const enterMeet = ({ roomId }: { roomId: string }) => {
    navigate(`/room/${roomId}`);
  };

  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log({ participants });
  };

  const handleUserLeft = ({ peerId }: { peerId: string }) => {
    console.log(`User left the room: ${peerId}`);
  };

  useEffect(() => {
    const meId = uuidV4();
    const peer = new Peer(meId);
    setMe(peer);
    webSocket.on('meeting-created', enterMeet);
    webSocket.on('get-users', getUsers);
    webSocket.on('user-left', handleUserLeft);

    return () => {
      webSocket.off('meeting-created', enterMeet);
      webSocket.off('get-users', getUsers);
      webSocket.off('user-left', handleUserLeft);
    };
  }, []);

  return (
    <RoomContext.Provider value={{ webSocket, me }}>
      {children}
    </RoomContext.Provider>
  );
};

export { RoomContext, RoomProvider };
