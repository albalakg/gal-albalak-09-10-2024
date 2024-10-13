import { io, Socket } from 'socket.io-client';

class SocketManager {
  private socket: Socket | null = null;

  constructor(
    private server_url: string
  ) {
  }

  public connectToRoom(data: IClient): void {
    if (!data.id || !data.token) {
      return;
    }

    this.socket = io(this.server_url, {
      auth: data,
    });

    console.log('nice');

    // Handle connection
    this.socket.on('connect', () => {
      console.log(`Client ${data.id} connected to the server.`);
      this.joinRoom(data);
    });

    // Handle authentication error
    this.socket.on('auth_error', (error: string) => {
      console.error('Authentication error:', error);
    });

    // Handle general connection errors
    this.socket.on('connect_error', (error: Error) => {
      console.error('Connection error:', error.message);
    });
  }

  // Method to join a room by client_id
  private joinRoom(data: IClient): void {
    if (this.socket) {
      this.socket.emit('join-room', data, (response: any) => {
        if (response.success) {
          console.log(`Client ${data.id} successfully joined the room.`);
        } else {
          console.error(`Failed to join the room: ${response.message}`);
        }
      });
    } else {
      console.error('Socket connection is not established.');
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Client disconnected from the WebSocket server.');
    }
  }
}

export default SocketManager;