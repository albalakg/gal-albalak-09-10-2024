import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { RoutesEnum, ErrorEnum, NotificationTypeEnum } from '../helpers/enums'
import store from "@/store/index";
import { ILoginResponse, IGetScoreResponse, IConfigurationResponse } from '@/helpers/interfaces'

class APIManager {
  constructor(
    baseServerUrl: string
  ) {
    axios.defaults.baseURL = baseServerUrl + '/api';
  }

  public async getConfiguration(): Promise<{data: IConfigurationResponse} | null> {
    return await this.get(RoutesEnum.GET_CONFIGURATION);
  }

  public async login(client_id: number): Promise<{data: ILoginResponse} | null> {
    return await this.post(RoutesEnum.LOGIN, { client_id });
  }

  public async getScore(client_token: string): Promise<{data: IGetScoreResponse} | null> {
    return await this.post(RoutesEnum.GET_SCORE, { client_token });
  }


  private async get<T>(url: string, params: object = {}): Promise<T | null> {
    try {
      const config: AxiosRequestConfig = {
        params,
      };
      const response: AxiosResponse<T> = await axios.get(`${url}`, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  private async post<T>(url: string, data: object = {}): Promise<T | null> {
    try {
      const response: AxiosResponse<T> = await axios.post(`${url}`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  private handleError(error: any): void {
    if (axios.isAxiosError(error)) {
      store.dispatch('notification/addNotification', {
        message: error.response?.data.message ?? error.message ?? ErrorEnum.UNKNOWN_ERROR_MESSAGE,
        type: NotificationTypeEnum.ERROR,
        error_code: error.response?.data.error_code ?? ErrorEnum.UNKNOWN_ERROR_CODE,
      });
    } else {
      store.dispatch('notification/addNotification', {
        message: (error as Error).message ?? ErrorEnum.UNKNOWN_ERROR_MESSAGE,
        type: NotificationTypeEnum.ERROR,
        error_code: ErrorEnum.UNKNOWN_ERROR_CODE,
      });
    }
  }
}

export default APIManager;