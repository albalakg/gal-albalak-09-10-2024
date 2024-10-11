import { createStore } from "vuex";
import { ScoreType } from "@/assets/helpers/types";
import { ScoreColorEnum } from "@/assets/helpers/enums";
export default createStore({
  state: {
    client: {} as IClient,
    scoresHistory: <ScoreType[]>[],
    currentScore: null as null | ScoreType,
  },
  
  getters: {
    getCurrentScore(state): number | null {
      return state.currentScore;
    },

    getTotalScores(state): number {
      return state.scoresHistory.length;
    },

    getPreviousScore(state, getters): number {
      return state.scoresHistory[getters.getTotalScores - 1];
    },

    getScoreDisplayColor(state, getters): string | null {
      if (!getters.getCurrentScore) {
        return null;
      }

      return getters.getCurrentScore > getters.getPreviousScore
        ? ScoreColorEnum.GREEN
        : ScoreColorEnum.RED;
    },
  },

  mutations: {
    SET_CURRENT_SCORE(state, newScore: ScoreType) {
      if (state.currentScore) {
        state.scoresHistory.push(state.currentScore);
      }

      state.currentScore = newScore;
    },
  },

  actions: {
    setScore(context, score: ScoreType) {
      context.commit("SET_CURRENT_SCORE", score);
    },
  },

  modules: {},
});
