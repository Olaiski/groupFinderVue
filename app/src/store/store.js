import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";


import createPersistedState from "vuex-persistedstate";



// import globalAxios from 'axios';
// import router from "../router";





Vue.use(Vuex);




// HERE WE GO AGAIN
const getDefaultState = () => {
    return {
        token: '',
        user: {}
    };
};

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        isLoggedIn: state => {
            return state.token;
        },
        getUser: state => {
            return state.user;
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USER: (state, user) => {
            state.user = user;
        },
        RESET: state => {
            Object.assign(state, getDefaultState());
        },
    },
    actions: {
        login: ({commit,dispatch}, {token, user}) => {
                commit('SET_TOKEN', token);
                commit('SET_USER', user);

                console.log(dispatch);

            // set auth header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        logout: ({commit}) => {
            commit('RESET', '');
        },

    }

});