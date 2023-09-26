import React , {useContext , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { RoomContext } from '../context/RoomContext';

const Room = () => {
    const { id } = useParams();
    const {webSocket , me}  = useContext(RoomContext);

    useEffect(()=> {
      if(me)  webSocket.emit("join-meeting" , {roomId : id , peerId : me._id});
    },[id , me , webSocket])

  return (
    <div>
      here
    </div>
  )
}

export default Room
