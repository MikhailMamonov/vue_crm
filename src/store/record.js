import firebase from "firebase/compat/app";
export default {
  actions: {
    async CREATE_RECORD({ commit, dispatch }, record) {
      try {
        const uid = await dispatch("GET_UID");
        return await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(record);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
  getters: {},
  mutations: {},
};
