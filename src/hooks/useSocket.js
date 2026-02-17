import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const URL = 'http://localhost:5000';

export const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(URL);
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return socket;
};
