import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';
import { VideoPlayer } from '../components/VedioPlayer'; 
import { PeerState } from '../store/peerReducer';

const Room = () => {
  const { id } = useParams();
  const { webSocket, me, stream, peers } = useContext(RoomContext);
  
  useEffect(() => {
    if (me) webSocket.emit("join-meeting", { roomId: id, peerId: me._id });
  }, [id, me, webSocket]);

  return (
    <div>
      {stream && <VideoPlayer stream={stream} />}
      
      {Object.values(peers as PeerState).map((peer) => (
        <VideoPlayer key={peer.peerId} stream={peer.stream} />
      ))}
    </div>
  );
};

export default Room;
