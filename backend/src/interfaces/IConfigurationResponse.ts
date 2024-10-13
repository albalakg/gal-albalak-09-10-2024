interface IConfigurationResponse extends IBaseResponse {
  data: {
    polling_frequency: number;
    score: IConfigurationScore;
  } | null;
}
