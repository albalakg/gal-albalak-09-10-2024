import { ScoreType } from "@/helpers/types";
import { ScoreColorEnum } from "@/helpers/enums";
import { IClient, IConfigurationResponse, IClientStoreState } from '@/helpers/interfaces'

const ClientStore = {
  namespaced: true,

  state: {
    configuration: {} as IConfigurationResponse,
    client: {} as IClient,
    scoresHistory: <number[]>[],
    currentScore: null as null | ScoreType,
  } as IClientStoreState,
  
  getters: {
    isLogged(state: IClientStoreState): boolean {
      return Boolean(state.client.token);
    },

    getCurrentScore(state: IClientStoreState): number | null {
      return state.currentScore;
    },

    getTotalScores(state: IClientStoreState): number {
      return state.scoresHistory.reduce((firstArg, secondArg) => firstArg + secondArg, 0) + (state.currentScore ?? 0);
    },

    getPreviousScore(state: IClientStoreState): number {
      return state.scoresHistory[state.scoresHistory.length - 1];
    },

    getScoreDisplayColor(state: IClientStoreState, getters: { getCurrentScore: number; getPreviousScore: number; }): string | null {
      if (!getters.getCurrentScore) {
        return null;
      }

      return (!state.scoresHistory.length || (getters.getCurrentScore > getters.getPreviousScore))
        ? ScoreColorEnum.GREEN
        : ScoreColorEnum.RED;
    },

    getPollingFrequency(state: IClientStoreState): number {
      return state.configuration.polling_frequency;
    },

    getClientToken(state: IClientStoreState): string | null {
      return state.client.token;
    }
  },

  mutations: {
    SET_CURRENT_SCORE(state: IClientStoreState, newScore: ScoreType) {
      if (state.currentScore) {
        state.scoresHistory.push(state.currentScore);
      }

      state.currentScore = newScore;
    },

    CLEAR_SCORE_HISTORY(state: IClientStoreState) {
      state.scoresHistory = [];
    },

    SET_CLIENT(state: IClientStoreState, client: IClient) {
      state.client = client;
    },

    SET_CONFIGURATION(state: IClientStoreState, config: IConfigurationResponse) {
      state.configuration = config;
    },
  },

  actions: {
    setScore(context: { commit: (arg0: string, arg1: ScoreType) => void; }, score: ScoreType) {
      context.commit("SET_CURRENT_SCORE", score);
    },
    
    setClient(context: { commit: (arg0: string, arg1: IClient) => void; }, client: IClient) {
      context.commit("SET_CLIENT", client);
    },
    
    setConfiguration(context: { commit: (arg0: string, config: IConfigurationResponse) => void; }, config: IConfigurationResponse) {
      context.commit("SET_CONFIGURATION", config);
    },
    
    logout(context: { commit: (arg0: string, payload?: IClient | null) => void; }) {
      context.commit("SET_CLIENT", {
        id: null,
        token: null
      } as IClient);

      context.commit("SET_CURRENT_SCORE", null);
      context.commit("CLEAR_SCORE_HISTORY");
    },
  },

  modules: {},
};


export default ClientStore;