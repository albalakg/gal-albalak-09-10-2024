import configuration from "./configuration.json" assert { type: "json" };
export default new (class ConfigurationModel {
    constructor() {
        this.config = configuration;
    }
    getConfiguration() {
        return this.config;
    }
    isClientExistsById(clientId) {
        return this.config.clients.some((client) => client.id === clientId);
    }
    getClientTokenById(clientId) {
        return (this.config.clients.find((client) => client.id === clientId)?.token ??
            null);
    }
    isClientExistsByToken(token) {
        return this.config.clients.some((client) => client.token === token);
    }
    // TODO: Bonus - add a param that controller the luck rate of the clients
    getRandomScore() {
        const min = this.getMinScore();
        const max = this.getMaxScore();
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getMinScore() {
        return this.config.score.min;
    }
    getMaxScore() {
        return this.config.score.max;
    }
    getPollingFrequency() {
        return this.config.polling_frequency;
    }
})();
