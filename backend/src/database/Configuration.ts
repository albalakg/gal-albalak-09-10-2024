import configuration from "./configuration.json" assert { type: "json" };

export default new (class ConfigurationModel implements IConfigurationModel {
  private config: IConfiguration;

  constructor() {
    this.config = configuration;
  }

  public getConfiguration(): IConfiguration {
    return this.config;
  }

  public isClientExistsById(clientId: number): boolean {
    return this.config.clients.some((client) => client.id === clientId);
  }

  public getClientTokenById(clientId: number): string | null {
    return (
      this.config.clients.find((client) => client.id === clientId)?.token ??
      null
    );
  }

  public isClientExistsByToken(token: string): boolean {
    return this.config.clients.some((client) => client.token === token);
  }

  public getRandomScore(): number {
    const min = this.getMinScore();
    const max = this.getMaxScore();
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getMinScore(): number {
    return this.config.score.min;
  }

  private getMaxScore(): number {
    return this.config.score.max;
  }

  public getPollingFrequency(): number {
    return this.config.polling_frequency;
  }
})();
