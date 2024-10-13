import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RoutesEnum, ErrorEnum } from '../helpers/enums'
import store from "@/store/index";

class APIManager {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }


  /** API ACTIONS **/

  public async getConfiguration(): Promise<{data: IConfigurationResponse} | null> {
    return await this.get(RoutesEnum.GET_CONFIGURATION);
  }

  public async login(client_id: number): Promise<{data: ILoginResponse} | null> {
    return await this.post(RoutesEnum.LOGIN, { client_id });
  }

  public async getScore(): Promise<{data: IGetScoreResponse} | null> {
    return await this.get(RoutesEnum.GET_SCORE);
  }


  /** Base Methods **/

  private async get<T>(url: string, params: object = {}): Promise<T | null> {
    try {
      const config: AxiosRequestConfig = {
        params,
      };
      const response: AxiosResponse<T> = await axios.get(`${this.baseURL}${url}`, config);
      return response.data;
      // TODO: fix this type
    } catch (error: any) {
      this.handleError(error);
      return null;
    }
  }

  private async post<T>(url: string, data: object = {}): Promise<T | null> {
    try {
      const response: AxiosResponse<T> = await axios.post(`${this.baseURL}${url}`, data);
      return response.data;
      // TODO: fix this type
    } catch (error: any) {
      this.handleError(error);
      return null;
    }
  }

  // Error handling method
  private handleError(error: any): void {
    console.log({ error });
    
    if (axios.isAxiosError(error)) {
      store.dispatch("ErrorStore/addError", {
        message: error.response?.data.message ?? error.message ?? ErrorEnum.UNKNOWN_ERROR_MESSAGE,
        code: error.response?.data.error_code ?? ErrorEnum.UNKNOWN_ERROR_CODE 
      });
    } else {
      store.dispatch("ErrorStore/addError", {
        message: error.response.data.message ?? error.message ?? ErrorEnum.UNKNOWN_ERROR_MESSAGE,
        code: error.response.data.error_code ?? ErrorEnum.UNKNOWN_ERROR_CODE 
      });
    }
  }
}

export default APIManager;