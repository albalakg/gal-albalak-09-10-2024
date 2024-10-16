import { NotificationType, NotificationRelationMapType, ScoreType } from './types'

// ***** Base Interfaces *****
interface IBaseResponse {
  message: string;
  error_code?: number;
}

export interface IMediatorService {
  authenticate(client_id: number): Promise<boolean>;
  getScore(): Promise<boolean>;
  getConfiguration(): Promise<boolean>;
  logout(): boolean;
}

export interface IClient {
  id: number | null;
  token: string | null;
}

export interface INotification {
  message: string;
  type: NotificationType;
  error_code?: number;
}

export interface ILoginResponse extends IBaseResponse {
  token: string | null;
}

export interface IGetScoreResponse extends IBaseResponse {
  score: number;
}

export interface IConfigurationScore {
  min: number;
  max: number;
}

export interface IConfigurationResponse extends IBaseResponse {
  polling_frequency: number;
  score: IConfigurationScore;
}

export interface INotificationStoreState {
  notifications: INotification[];
  currentNotification: INotification | null;
  notificationDisplayTime: number,
  notificationRelationMap: NotificationRelationMapType;
} 

export interface IClientStoreState {
  configuration: IConfigurationResponse;
  client: IClient;
  scoresHistory: number[];
  currentScore: null | ScoreType;
} 