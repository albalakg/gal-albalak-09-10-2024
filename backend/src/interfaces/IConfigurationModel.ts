interface IConfigurationModel {
  isClientExistsById(clientId: number): boolean;
  isClientExistsByToken(token: string): boolean;
  getClientTokenById(clientId: number): string | null;
  getPollingFrequency(): number;
  getRandomScore(): number;
}
