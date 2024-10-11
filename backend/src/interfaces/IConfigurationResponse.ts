interface IConfigurationResponse extends IBaseResponse {
  polling_frequency: number;
  score: IConfigurationScore;
}
