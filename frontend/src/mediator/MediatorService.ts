import store from "@/store/index";
import SocketManager from "./SocketManager";
import APIManager from "./APIManager";

class MediatorService {

  constructor(
    private socketManager: SocketManager, 
    private apiManager: APIManager
  ) {
  }

  public async authenticate(client_id: number) {
    const response = await this.apiManager.login(client_id);
    if (!response?.data.token) {
      return;
    }

    const client = {
      id: client_id,
      token: response.data.token,
    };

    store.dispatch("ClientStore/setClient", client);
    this.socketManager.connectToRoom(client)
  }

  public async getScore() {
    const response = await this.apiManager.getScore();
    if (!response?.data.score) {
      return;
    }

    store.dispatch("ClientStore/setScore", response.data.score);
  }

  public async getConfiguration() {
    const response = await this.apiManager.getConfiguration();
    if (!response?.data.polling_frequency || !response?.data.score) {
      return;
    }

    store.dispatch("ClientStore/setConfiguration", response.data);
  }
}

export default MediatorService;