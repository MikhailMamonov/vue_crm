import { createApp } from "vue";
import messagePlugin from "./utils/message.plugin";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import filters from "./helpers/filters";
import tooltipDirective from "./directives/tooltip.directive";

import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import Pagination from "vuejs-paginate-next";
console.log(firebase);

firebase.initializeApp({
  apiKey: "AIzaSyDE0MQNWtbyYgShPEN6oZt08dZSQ8b7sI4",
  authDomain: "vue-crm-d3618.firebaseapp.com",
  projectId: "vue-crm-d3618",
  storageBucket: "vue-crm-d3618.appspot.com",
  messagingSenderId: "1028453206413",
  appId: "1:1028453206413:web:90118c6e1cbca9ee6ad5c4",
  measurementId: "G-SCS2LZQLBP",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(messagePlugin).use(store).use(router);
    // eslint-disable-next-line vue/multi-word-component-names
    app.component("paginate", Pagination);
    app.directive("tooltip", tooltipDirective);
    app.config.globalProperties.$filters = filters;
    app.mount("#app");
  }
});
