const ErrorsStore = {
    namespaced: true,

  state: {
    errors: <IError[]>[],
  },

  getters: {},

  mutations: {
    ADD_ERROR(state: { errors: IError[]; }, error: IError) {
      state.errors.push(error);
    },

    CLEAR_ERRORS(state: { errors: never[]; }) {
      state.errors = [];
    },
  },

  actions: {
    addError(context: { commit: (arg0: string, arg1: IError) => void; }, error: IError) {
      context.commit("ADD_ERROR", error);
    },

    clearErrors(context: { commit: (arg0: string) => void; }) {
      context.commit("CLEAR_ERRORS");
    },
  },

  modules: {},
};

export default ErrorsStore;