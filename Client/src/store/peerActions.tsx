
export const ADD_PEER_STREAM = "ADD_PEER_STREAM" as const;
export const REMOVE_PEER_STREAM = "REMOVE_PEER_STREAM" as const;


export const addPeerStreamAction = (peerId: string, stream: MediaStream) => ({
    type: ADD_PEER_STREAM,
    payload: { peerId, stream },
});

export const removePeerStreamAction = (peerId: string) => ({
    type: REMOVE_PEER_STREAM,
    payload: { peerId },
});

