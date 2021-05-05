import { login, getInfo, getAllUsers } from '../api/users'
import { setToken, getToken, removeToken, } from '../utils/auth'

//getInfo
//, setToken, removeToken
const moduleUser = {

    state: () => ({
        token: getToken(),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        email: '',
        phone: '',

    }),
    mutations: {

        SET_PHONE: (state, phone) => {
            state.phone = phone;

        },
        SET_TOKEN: (state, token) => {
            state.token = token

        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_NAME: (state, name) => {
            console.log(name);
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },

    },
    actions: {
        login({ commit }, userInfo) {
            console.log(userInfo);
            const { username, password } = userInfo
            return new Promise((resolve, reject) => {
                login({ username: username.trim(), password: password }).then(response => {
                    console.log(response);

                    console.log(response.accessToken);
                    commit('SET_TOKEN', response.accessToken);
                    commit('SET_NAME', response.userName);
                    setToken(response.accessToken);
                    resolve();
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },


        async getInfo({ commit }) {


            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    const { data } = response
                    commit('SET_NAME', response.fullname);
                    commit('SET_PHONE', response.phone);
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        logout({ commit }) {
            removeToken();
            commit('SET_TOKEN', '')
        },


    },
    getters: {
        token(state) {
            console.log(state.token);
            return state.token;
        }
    }
}



export {
    moduleUser
}