import MessagesEnum from '../enums/MessagesEnum.js';
class WebSocketManager {
    constructor(io, config_modal) {
        this.io = io;
        this.config_modal = config_modal;
        this.initializeSocketEvents();
    }
    initializeSocketEvents() {
        this.io.on('connection', (socket) => {
            console.log('New client connected:', socket.id);
            this.joinRoom(socket);
            this.leaveRoom(socket);
            this.disconnect(socket);
        });
    }
    joinRoom(socket) {
        socket.on('join-room', (data) => {
            const { roomId, token } = data;
            if (this.config_modal.isClientExistsByToken(token)) {
                socket.join(roomId);
                console.log(`Client ${socket.id} joined room ${roomId}`);
            }
            else {
                console.log(`Client ${socket.id} attempted to join room ${roomId} with an invalid token`);
                socket.emit(MessagesEnum.ERROR, { message: MessagesEnum.INVALID_CLIENT_TOKEN });
            }
        });
    }
    leaveRoom(socket) {
        socket.on('leave-room', (roomId) => {
            socket.leave(roomId);
            console.log(`Client ${socket.id} left room ${roomId}`);
        });
    }
    disconnect(socket) {
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    }
}
export default WebSocketManager;
