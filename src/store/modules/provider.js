import { loadProvider } from '../api/provider'
const moduleProvider = {
    state: {
        provider: [],

    },
    mutations: {
        SET_PROVIDER(state, provider) {
            state.provider = provider;
        },
    },
    actions: {
        loadAllProvider({ commit }) {
            return new Promise((resolve, reject) => {
                loadProvider().then(response => {
                    commit('SET_PROVIDER', response);

                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }

    },
    getters: {

    },

}
export { moduleProvider }