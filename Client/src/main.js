import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// import { sync } from 'vuex-router-sync'


import store from "@/store/store"

import axios from 'axios';

import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";


// Global Components Anders
axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;


//Global Components Andreas
const requireComponent = require.context(
    "./components", //The relative path of the directory to search
    false,
    /Base[A-Z]\w+\.(vue|js)$/ //Ser etter alle komponenter som starter med Base% og slutter med hva som helst .vue
);


requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
      camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1")) //Sletter det som er før og etter filnavnet
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.config.productionTip = false;

// sync(store, router);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
