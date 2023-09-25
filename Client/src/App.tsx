import React, { useEffect } from 'react';
import io from 'socket.io-client';
const WebHost = 'http://localhost:8080';


function App() {

  useEffect(()=> {
    const socket = io(WebHost);
  },[]);


  return (
    <>
    
    </>
  )
}

export default App
