import { Server as SocketIOServer, Socket } from 'socket.io';
import MessagesEnum from '../enums/MessagesEnum.js';

class WebSocketManager {
  private roomsManager = <number[]> [];

  constructor(
    private io: SocketIOServer, 
    private config_modal: IConfigurationModel
  ) {
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
    socket.on('join-room', (data: { id: string; token: string }) => {
      const { id, token } = data;

      if (this.config_modal.isClientExistsByToken(token)) {
        socket.join(id);
        console.log(`Client ${socket.id} joined room ${id}`);
        
        this.pushingScores(id);
      } else {
        console.log(`Client ${socket.id} attempted to join room ${id} with an invalid token`);
        socket.emit(MessagesEnum.ERROR, { message: MessagesEnum.INVALID_CLIENT_TOKEN });
      }
    });
  }

  private leaveRoom(socket: Socket): void {
    socket.on('leave-room', (id: string) => {
      socket.leave(id);
      console.log(`Client ${socket.id} left room ${id}`);
    });
  }

  private disconnect(socket: Socket): void {
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  }

  private pushingScores(id: string): void {
    if(this.isRoomTaken(Number(id))) {
      return;
    }

    this.useRoom(Number(id));

    setInterval(() => {
      const randomScore = this.config_modal.getRandomScore();
      this.io.to(id).emit('score-update', { score: randomScore });
      console.log(`Pushed random score ${randomScore} to room ${id}`);
    }, this.config_modal.getPollingFrequency());
  }

  private isRoomTaken(id: number): boolean {
    return this.roomsManager.includes(id);
  }

  private useRoom(id: number): void {
    this.roomsManager.push(Number(id));
  }
}

export default WebSocketManager;
