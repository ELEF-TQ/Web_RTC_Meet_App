import React, { createContext, useEffect, useState, ReactNode , useReducer } from 'react';
import {useNavigate} from 'react-router-dom'
import io from 'socket.io-client';
import Peer from 'peerjs';
import { v4 as uuidV4} from 'uuid';
import { peersReducer  } from '../store/peerReducer';
import {addPeerStreamAction ,removePeerStreamAction}  from '../store/peerActions';

const WebHost = 'http://localhost:8080';
const webSocket = io(WebHost);


const RoomContext = createContext<null | any>(null);

type RoomProviderProps = {children: ReactNode};



const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [me, setMe] = useState<Peer>();
  const [stream , setStream]  = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peersReducer, {}); 

  
  const enterMeet = ({ roomId }: { roomId: string }) => {
    navigate(`/room/${roomId}`);
  };

  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log({ participants });
  };

  const handleUserLeft = ({ peerId }: { peerId: string }) => {
    console.log(`User left the room: ${peerId}`);
    dispatch(removePeerStreamAction(peerId));
  };

  useEffect(() => {
    const meId = uuidV4();
    const peer = new Peer(meId);
    setMe(peer);

    try {
      navigator.mediaDevices.getUserMedia({ video :true , audio :true }).then((stream)=> {
        setStream(stream);
      });
    } catch (error) {
      console.log(error);
    }
    webSocket.on('meeting-created', enterMeet);
    webSocket.on('get-users', getUsers);
    webSocket.on('user-left', handleUserLeft);

    return () => {
      webSocket.off('meeting-created', enterMeet);
      webSocket.off('get-users', getUsers);
      webSocket.off('user-left', handleUserLeft);
    };
  }, []);

  useEffect(()=> {
   if(!me) return ;
   if(!stream) return

   webSocket.on("user-joined" , ({peerId}) => {
    const call = me.call(peerId , stream);
    call.on('stream',(peerStream)=> {
      dispatch(addPeerStreamAction( peerId,peerStream));
    })
   })

   me.on('call', (call) => {
    call.answer(stream);
    call.on('stream',(peerStream)=> {
      dispatch(addPeerStreamAction( call.peer ,peerStream));
    })
   });


  },[me , stream])

 
  return (
    <RoomContext.Provider value={{ webSocket, me ,stream ,peers }}>
      {children}
    </RoomContext.Provider>
  );
};

export { RoomContext, RoomProvider };
