import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex);

// Store blir brukt til å lagre studented, token og reservasjonene i en State.
// Vi så at det ble en overdrivelse å bruke dette i en liten applikasjon, de fleste
// queries skjer i de respektive komponentene
// Anders Olai Pedersen - 225280
const getDefaultState = () => {
    return {
        token: '',
        user: {},
    };
};

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState({
        storage: window.localStorage
    })],
    state: {
        default: getDefaultState(),
        user: {}

    },
    getters: {
        isLoggedIn: state => {
            return state.token;
        },
        getUser: state => {
            return state.user;
        },

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
