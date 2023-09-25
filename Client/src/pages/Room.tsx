import React , {useContext , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { RoomContext } from '../context/RoomContext';

const Room = () => {
    const { id } = useParams();
    const {webSocket}  = useContext(RoomContext);

    useEffect(()=> {
        webSocket.emit("join-meeting" , {roomId : id});
    },[])

  return (
    <div>
      here
    </div>
  )
}

export default Room
