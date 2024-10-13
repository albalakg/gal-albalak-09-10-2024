interface IBaseResponse {
  message: string;
  error_code?: number;
}

interface IClient {
  id: number;
  token: string;
}

interface IError {
  message: string;
  code: string;
}

interface ILoginResponse extends IBaseResponse {
  token: string | null;
}

interface IGetScoreResponse extends IBaseResponse {
  score: number;
}

interface IConfigurationScore {
  min: number;
  max: number;
}

interface IConfigurationResponse extends IBaseResponse {
  polling_frequency: number;
  score: IConfigurationScore;
}
