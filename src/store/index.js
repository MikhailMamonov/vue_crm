import { createStore } from "vuex";
import auth from "./auth";
import category from "./category";
import info from "./info";
import record from "./record";

export default createStore({
  state: {
    error: null,
  },
  getters: { ERROR: (s) => s.error },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async FETCH_CURRENCY() {
      const key = process.env.VUE_APP_FIXER;
      var myHeaders = new Headers();
      myHeaders.append("apikey", key);

      var requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };

      const res = await fetch(
        "https://api.apilayer.com/fixer/latest?symbols=EUR,USD,RUB",
        requestOptions
      );
      return await res.json();
    },
  },
  modules: { auth, info, category, record },
});
