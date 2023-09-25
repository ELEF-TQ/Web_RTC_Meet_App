import React, { createContext, useEffect, useState, ReactNode } from 'react';
import {useNavigate} from 'react-router-dom'
import io from 'socket.io-client';
const WebHost = 'http://localhost:8080';
const webSocket = io(WebHost);


const RoomContext = createContext<null | any>(null);

type RoomProviderProps = {children: ReactNode};



const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {

  const navigate = useNavigate()
  const enterMeet = ({roomId} : { roomId: "string"})=> {
    navigate( `/room/${roomId}`);
  }
  
  useEffect(() => {
    webSocket.on('meeting-created', enterMeet)
  }, []);


  return (
    <RoomContext.Provider value={{ webSocket }}>
      {children}
    </RoomContext.Provider>
  );
};

export { RoomContext, RoomProvider };
