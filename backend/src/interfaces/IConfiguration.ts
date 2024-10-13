interface IConfiguration {
  polling_frequency: number;
  score: IConfigurationScore;
  clients: IClient[];
}

interface IClient {
  id: number;
  token: string;
}

interface IConfigurationScore {
  min: number;
  max: number;
}