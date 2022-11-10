import firebase from "firebase/compat/app";
export default {
  state: {
    info: {},
  },
  mutations: {
    SET_INFO(state, info) {
      state.info = info;
    },
    CLEAR_INFO(state) {
      state.info = {};
    },
  },
  actions: {
    async FETCH_INFO({ dispatch, commit }) {
      try {
        const uid = await dispatch("GET_UID");
        const info = (
          await firebase.database().ref(`/users/${uid}/info`).once("value")
        ).val();
        commit("SET_INFO", info);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    },
  },
  getters: {
    INFO: (state) => state.info,
  },
};
