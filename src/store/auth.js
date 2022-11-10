/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import firebase from "firebase/compat/app";

export default {
  actions: {
    async LOGIN({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async REGISTER({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("GET_UID");
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name,
        });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async LOGOUT({ commit }) {
      await firebase.auth().signOut();
      commit("CLEAR_INFO");
    },
    GET_UID() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
  },
};
