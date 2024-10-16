import MessagesEnum from '../enums/MessagesEnum.js';
class WebSocketManager {
    constructor(io, config_modal) {
        this.io = io;
        this.config_modal = config_modal;
        this.roomsManager = [];
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
            const { id, token } = data;
            if (this.config_modal.isClientExistsByToken(token)) {
                socket.join(id);
                console.log(`Client ${socket.id} joined room ${id}`);
                this.pushingScores(id);
            }
            else {
                console.log(`Client ${socket.id} attempted to join room ${id} with an invalid token`);
                socket.emit(MessagesEnum.ERROR, { message: MessagesEnum.INVALID_CLIENT_TOKEN });
            }
        });
    }
    leaveRoom(socket) {
        socket.on('leave-room', (id) => {
            socket.leave(id);
            console.log(`Client ${socket.id} left room ${id}`);
        });
    }
    disconnect(socket) {
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    }
    pushingScores(id) {
        if (this.isRoomTaken(Number(id))) {
            return;
        }
        this.useRoom(Number(id));
        setInterval(() => {
            const randomScore = this.config_modal.getRandomScore();
            this.io.to(id).emit('score-update', { score: randomScore });
            console.log(`Pushed random score ${randomScore} to room ${id}`);
        }, this.config_modal.getPollingFrequency());
    }
    isRoomTaken(id) {
        return this.roomsManager.includes(id);
    }
    useRoom(id) {
        this.roomsManager.push(Number(id));
    }
}
export default WebSocketManager;
