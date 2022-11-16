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
    async FETCH_RECORDS({ commit, dispatch }) {
      try {
        const uid = await dispatch("GET_UID");
        const records =
          (
            await firebase.database().ref(`/users/${uid}/records`).once("value")
          ).val() || {};
        return Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
  getters: {},
  mutations: {},
};
