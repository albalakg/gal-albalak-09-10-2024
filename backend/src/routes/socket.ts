import { Server as SocketIOServer, Socket } from 'socket.io';
import MessagesEnum from '../enums/MessagesEnum.js';

class WebSocketManager {
  private io: SocketIOServer;
  private config_modal: IConfigurationModel;

  constructor(io: SocketIOServer, config_modal: IConfigurationModel) {
    this.io = io;
    this.config_modal = config_modal;
    this.initializeSocketEvents();
  }

  private initializeSocketEvents(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log('New client connected:', socket.id);
      this.joinRoom(socket);
      this.leaveRoom(socket);
      this.disconnect(socket);
    });
  }

  private joinRoom(socket: Socket): void {
    socket.on('join-room', (data: { roomId: string; token: string }) => {
      const { roomId, token } = data;

      if (this.config_modal.isClientExistsByToken(token)) {
        socket.join(roomId);
        console.log(`Client ${socket.id} joined room ${roomId}`);
      } else {
        console.log(`Client ${socket.id} attempted to join room ${roomId} with an invalid token`);
        socket.emit(MessagesEnum.ERROR, { message: MessagesEnum.INVALID_CLIENT_TOKEN });
      }
    });
  }

  private leaveRoom(socket: Socket): void {
    socket.on('leave-room', (roomId: string) => {
      socket.leave(roomId);
      console.log(`Client ${socket.id} left room ${roomId}`);
    });
  }

  private disconnect(socket: Socket): void {
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  }
}

export default WebSocketManager;
