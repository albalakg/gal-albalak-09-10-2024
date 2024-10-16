import store from "@/store/index";
import SocketManager from "./SocketManager";
import APIManager from "./APIManager";
import { IMediatorService, IClient } from '@/helpers/interfaces'
import { MessageEnum, NotificationTypeEnum } from '@/helpers/enums'

class MediatorService implements IMediatorService {
  private defaultPollingFrequency = 5000 as number; // 5 seconds
  private fallbackMechanismTimeOut: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private socketManager: SocketManager, 
    private apiManager: APIManager
  ) {
    this.getConfiguration();
  }

  public async authenticate(client_id: number): Promise<boolean> {
    const response = await this.apiManager.login(client_id);
    if (!response?.data.token) {
      return false;
    }

    const client = {
      id: client_id,
      token: response.data.token,
    } as IClient;

    store.dispatch("client/setClient", client);
    this.socketManager.connectToRoom(client, this.fallbackMechanism.bind(this));

    store.dispatch("notification/addNotification", {
      message: MessageEnum.LOGIN_MESSAGE,
      type: NotificationTypeEnum.INFO,
    });

    return true;
  }

  public async fallbackMechanism() {
    const isResponseValid = await this.getScore();
    if(!isResponseValid) {
      console.error('Failed to fetch score from fallback');
      return;
    }

    this.fallbackMechanismTimeOut = setTimeout(() => {
      this.fallbackMechanism();
    }, store.getters["client/getPollingFrequency"] ?? this.defaultPollingFrequency);
  }

  public clearFallbackMechanism() {
    if(this.fallbackMechanismTimeOut) {
      clearTimeout(this.fallbackMechanismTimeOut);
    }
  }

  public async getScore(): Promise<boolean> {
    const response = await this.apiManager.getScore(store.getters["client/getClientToken"]);
    if (!response?.data.score) {
      return false;
    }

    store.dispatch("client/setScore", response.data.score);
    return true;
  }

  public async getConfiguration(): Promise<boolean>  {
    const response = await this.apiManager.getConfiguration();
    if (!response?.data.polling_frequency || !response?.data.score) {
      return false;
    }

    store.dispatch("client/setConfiguration", response.data);
    return true;
  }

  public logout(): boolean  {
    this.socketManager.disconnect();
    store.dispatch("client/logout");
    
    return true;
  }
}

export default MediatorService;