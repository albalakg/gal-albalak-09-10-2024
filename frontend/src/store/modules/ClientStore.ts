import { ScoreType } from "@/helpers/types";
import { ScoreColorEnum } from "@/helpers/enums";

const ClientStore = {
  namespaced: true,

  state: {
    configuration: {} as IConfigurationResponse,
    client: {} as IClient,
    scoresHistory: <ScoreType[]>[],
    currentScore: null as null | ScoreType,
  },
  
  getters: {
    getCurrentScore(state: { currentScore: number | null; }): number | null {
      return state.currentScore;
    },

    getTotalScores(state: { scoresHistory: string | any[]; }): number {
      return state.scoresHistory.length;
    },

    getPreviousScore(state: { scoresHistory: number[]; }, getters: { getTotalScores: number; }): number {
      return state.scoresHistory[getters.getTotalScores - 1];
    },

    getScoreDisplayColor(state: any, getters: { getCurrentScore: number; getPreviousScore: number; }): string | null {
      if (!getters.getCurrentScore) {
        return null;
      }

      return getters.getCurrentScore > getters.getPreviousScore
        ? ScoreColorEnum.GREEN
        : ScoreColorEnum.RED;
    },
  },

  mutations: {
    SET_CURRENT_SCORE(state: { currentScore: number; scoresHistory: ScoreType[]; }, newScore: ScoreType) {
      if (state.currentScore) {
        state.scoresHistory.push(state.currentScore);
      }

      state.currentScore = newScore;
    },

    SET_CLIENT(state: { client: IClient; }, client: IClient) {
      state.client = client;
    },

    SET_CONFIGURATION(state: { configuration: IConfigurationResponse; }, config: IConfigurationResponse) {
      state.configuration = config;
    },
  },

  actions: {
    setScore(context: { commit: (arg0: string, arg1: number) => void; }, score: ScoreType) {
      context.commit("SET_CURRENT_SCORE", score);
    },
    
    setClient(context: { commit: (arg0: string, arg1: IClient) => void; }, client: IClient) {
      context.commit("SET_CLIENT", client);
    },
    
    setConfiguration(context: { commit: (arg0: string, config: IConfigurationResponse) => void; }, config: IConfigurationResponse) {
      context.commit("SET_CONFIGURATION", config);
    },
  },

  modules: {},
};


export default ClientStore;