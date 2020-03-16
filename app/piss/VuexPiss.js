// export default new Vuex.Store({ // FUNKER!
//     strict: true,  // Kan ikke endres (bare via action/mutation)
//     state: { // Globale 'states', gjør at man kan endre det brukeren ser
//         token: null, // For å endre token, må man 'gjennom' mutation -> actions
//         user: null,
//         isUserLoggedIn: false
//         // Global states, brukes til å endre hva som vises (logged in / eller ikke)
//     },
//     mutations: {
//         setToken(state, token) {
//             state.token = token;
//             if (token) {
//                 state.isUserLoggedIn = true;
//             } else {
//                 state.isUserLoggedIn = false;
//             }
//         },
//         setUser(state, user) {
//             state.user = user;
//         }
//     },
//     actions: { // Håndterer async logikken..
//         setToken ({commit}, token) {
//             commit('setToken', token); // Kall på 'mutation / setToken', send token objektet
//         },
//         setUser ({commit}, user) {
//             commit('setUser', user);
//         }
//     }
// })


// Max Udemy
// export default new Vuex.Store({
//     state: { // Globale 'states', gjør at man kan endre det brukeren ser
//         idToken: null, // For å endre token, må man 'gjennom' mutation -> actions
//         userId: null,
//         student: null
//     },
//     mutations: {
//         authUser (state, userData) {
//            state.idToken = userData.token;
//            state.userId = userData.userId;
//         },
//         storeUser (state, student) {
//             state.student = student;
//         },
//         clearAuthData (state) {
//             state.idToken = null;
//             state.userId = null;
//         }
//     },
//     actions: { // Håndterer async logikken..
//         register({commit}, authData) { // Commit -> Mutations
//             axios.post('/register', {
//                 firstname: authData.firstname,
//                 lastname: authData.lastname,
//                 email: authData.email,
//                 phonenumber: authData.phonenumber,
//                 password: authData.password
//             })
//                 .then(res => {
//                     console.log(res);
//                     commit('authUser', {
//                         token: res.data.token,
//                         userId: res.data.userId
//                     });
//                     localStorage.setItem('token', res.data.idToken);
//                     // dispatch('storeUser', authData);
//                 })
//                 .catch(err => console.log(err));
//         },
//
//         login({commit}, authData) {
//             axios.post('/login', {
//                 email: authData.email,
//                 password: authData.password,
//             })
//                 .then(res => {
//                     console.log(res);
//                     commit('authUser', {
//                         token: res.data.token,
//                         userId: res.data.userId
//                     });
//                 })
//                 .catch(err => console.log(err));
//         },
//         tryAutoLogin() {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 return;
//             }
//
//         },
//         logout ({commit}) {
//           commit('clearAuthData');
//             router.replace('/login')
//         },
//         // storeUser ({commit,state}, userData) {
//         //     // if (!state.idToken) return;
//         //     globalAxios.post('/user/home',{
//         //         headers: {
//         //             'Authentication': state.idToken,
//         //             'auth-key': state.idToken
//         //         }
//         //     }, userData)
//         //         .then(res => {
//         //             console.log("HEYO", res);
//         //             commit();
//         //         })
//         //         .catch(err => console.log("LOL", err))
//         // },
//         fetchUser ({state}) {
//             // globalAxios.get('/user/home')
//             if (!state.idToken) return;
//             globalAxios.get('/user/home', {
//             })
//                 .then(res => { // MÅ ENDRES!!!
//                     console.log(res);
//                     // const data = res.data;
//                     // const students = [];
//                     // for (let key in data) {
//                     //     const student = data[key];
//                     //     student.id = key;
//                     //     students.push(student);
//                     // }
//                     const data = res.data;
//                     const students = [];
//                     for (let key in data) {
//                         const student = data[key];
//                         student.id = key;
//                         students.push(student);
//                     }
//                     console.log(students[1 - state.userId]);
//                 })
//                 .catch(err => console.log(err))
//         },
//     },
//     getters: {
//         user (state) {
//             return state.student;
//         },
//         isAuthenticated (state) {
//             return state.idToken !== null;
//         }
//     }
// });