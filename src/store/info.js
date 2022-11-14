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
    async UPDATE_INFO({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch("GET_UID");
        const updateData = { ...getters.INFO, ...toUpdate };
        await firebase.database().ref(`/users/${uid}/info`).update(updateData);
        commit("SET_INFO", updateData);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async FETCH_INFO({ dispatch, commit }) {
      try {
        const uid = await dispatch("GET_UID");
        const info = (
          await firebase.database().ref(`/users/${uid}/info`).once("value")
        ).val();
        commit("SET_INFO", info);
        // eslint-disable-next-line no-empty
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
  getters: {
    INFO: (state) => state.info,
  },
};
