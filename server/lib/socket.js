const { Server } = require('socket.io');

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Allow all for prototype
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Doctor dashboard joins 'doctors' room
        socket.on('join_dashboard', () => {
            socket.join('doctors');
            console.log(`Socket ${socket.id} joined doctors room`);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};

// Helper to broadcast alerts to doctors
const emitAlert = (alertData) => {
    if (io) {
        io.to('doctors').emit('ALERT', alertData);
        console.log('Alert emitted:', alertData);
    }
};

module.exports = { initSocket, getIO, emitAlert };
