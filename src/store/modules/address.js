import { getAllByParentId } from '../api/address'

const moduleAddress = {

    state: () => ({
        city: [],
        district: [],
        wards: [],

    }),
    mutations: {
        CHANGE_CITY(state, city) {
            state.city = city;
        },
        CHANGE_DISTRICT(state, district) {
            state.district = district;
        },
        CHANGE_WARDS(state, wards) {
            console.log(wards);
            state.wards = wards;
        }
    },
    actions: {
        getAllCity({ commit }, id) {
            return new Promise((resolve, reject) => {
                getAllByParentId(id).then(response => {
                    console.log(response)
                    commit('CHANGE_CITY', response);

                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getAllDistrict({ commit }, id) {
            return new Promise((resolve, reject) => {
                getAllByParentId(id).then(response => {
                    console.log(response)
                    commit('CHANGE_DISTRICT', response);

                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getAllWards({ commit }, id) {
            return new Promise((resolve, reject) => {
                getAllByParentId(id).then(response => {
                    console.log(response)
                    commit('CHANGE_WARDS', response);

                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

    },
    getters: {

    },

}



export {
    moduleAddress
}