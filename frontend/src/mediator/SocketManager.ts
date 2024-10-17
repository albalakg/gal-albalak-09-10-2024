import { io, Socket } from "socket.io-client";
import { IClient, IGetScoreResponse } from "@/helpers/interfaces";
import store from "@/store";

class SocketManager {
  private socket: Socket | null = null;
  private fallbackMechanism: (() => void) | null = null;

  constructor(private baseServerUrl: string) {}

  public connectToRoom(data: IClient, fallbackMechanism: () => void, cancelFallbackMechanism: () => void): void {
    try {
      if (!data.id || !data.token) {
        return;
      }

      this.fallbackMechanism = fallbackMechanism;

      this.socket = io(this.baseServerUrl, {
        auth: data,
        reconnectionAttempts: 3,
        reconnectionDelay: 3000, // 3 seconds
      });

      this.socket.on("connect", () => {
        cancelFallbackMechanism();
        this.joinRoom(data);
      });

      this.socket.on("connect_error", (error: Error) => {
        console.error("Connection error:", error.message);
        this.runFallback();
      });

      this.listenToServerEvents();
    } catch (error: any) {
      this.runFallback();
      console.error("Failed to connect to room:", error.message);
    }
  }

  public disconnect(withFallback = true as boolean): void {
    if (this.socket) {
      this.socket.disconnect();
      if(withFallback) {
        this.runFallback();
      }
    }
  }

  private joinRoom(data: IClient): void {
    if (!this.socket) {
      console.error("Socket connection is not established.");
      return;
    }

    this.socket.emit("join-room", data, (response: any) => {
      if (!response.success) {
        this.disconnect();
      }
    });
  }

  private listenToServerEvents(): void {
    if (!this.socket) {
      console.error("Socket connection is not established.");
      return;
    }

    this.socket.on("score-update", (data: IGetScoreResponse) => {
      if (data.score) {
        store.dispatch("client/setScore", data.score);
      } else {
        console.error("Socket connection is not valid.");
        this.disconnect();
      }
    });
  }

  private runFallback(): void {
    if (this.fallbackMechanism) {
      this.fallbackMechanism();
    }
  }
}

export default SocketManager;
