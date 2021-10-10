import Vue from 'vue'
import Vuex from 'vuex'
import { axios } from './utils/axios'
import { moduleProvider } from './modules/provider'
import { moduleCart } from './modules/cart'
import { loadCategories, saveCategoryApi, loadCategory, updateStatus } from './api/category'
import { getAllUsers, updateStatusUser, getAllRoles, updateRoles } from './api/users'
import { moduleProduct } from './modules/product'
import { moduleComment } from './modules/comment'
import { moduleUser } from './modules/user'
import { moduleAddress } from './modules/address'
import { moduleDialog } from './modules/dialog'
Vue.use(Vuex)

export
const store = new Vuex.Store({

    state: {

        Categories: [],
        category: '',
        productSearch: {},
        loading: false,
        users: '',
        roles: [],



    },
    getters: {




    },
    mutations: {


        CHANGE_LOADING(state, loading) {
            state.loading = loading;
        },
        SET_USERS(state, users) {
            console.log(users);
            state.users = users;

        },



        SEARCH_KEY(state, ob) {
            const URL = "http://localhost:9000/api/test3?key=" + ob.key + "&page=" + ob.page;
            const axios = require("axios").default;
            axios.get(URL).then((response) => {

                state.productSearch = response.data;

            });


        },

        ADD_COMMENT(state, ob) {

            postComment({ "content": ob.content }, ob.id_product);



        },


        loadAllProduct(state) {
            const URL = "http://localhost:9000/api/admin/find-all-product";
            axios.get(URL).then((response) => {
                state.product = response.data
                console.log(response.data)
            });
        },

        LOAD_CATEGORY(state) {
            const URL = "http://localhost:9000/find-all-category";

            axios.get(URL).then((response) => (state.Categories = response.data));
            console.log("load data")
        },


        GET_ID_CATEGORY(state, id) {
            const URL = "http://localhost:9000/api/get-id-catgory?id=1";
            axios.get(URL).then((response) => (state.id = response.data.id));
            return new Promise((resolve, reject) => {
                loadCategories(id).then(response => {
                    console.log(response)
                    commit('CHANGE_DISTRICT', response);

                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })

        },
        CHANGE_CATEGORY(state, categories) {
            console.log(categories);
            state.Categories = categories;
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        LOAD_CARTEGORY(state, ob) {
            const URL = "http://localhost:9000/api/find-all-by-category?id_category=" + ob.key + "&page=" + ob.page;
            axios.get(URL).then((response) => {
                state.productSearch = response.data;
            });
            console.log(URL);
        },
        CHANGE_CATEGORY1(state, category) {
            console.log(category);
            state.category = category;
        },
        CHANGE_ROLES(state, roles) {
            state.roles = roles;
        }
    },
    actions: {



        LOAD_CATEGORY({ commit }, id) {

            return new Promise((resolve, reject) => {
                loadCategories(id).then(response => {


                    response.forEach(element => {
                        console.log(element.id);
                        loadCategories(element.id).then(res => {
                            var newElement = Object.assign({}, element, {
                                subCategory: res,
                            })
                            Vue.set(response, response.indexOf(element), newElement)
                        })


                    });

                    commit('CHANGE_CATEGORY', response);

                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })

        },
        saveCategory({ commit }, data) {
            console.log(data);
            return new Promise((resolve, reject) => {
                saveCategoryApi(data).then(response => {
                    console.log(response);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //updateStatus
        loadCategory({ commit }, id) {
            return new Promise((resolve, reject) => {
                loadCategory(id).then(response => {
                    console.log(response);
                    commit('CHANGE_CATEGORY1', response);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })

        },
        updateStatus({ commit }, id) {
            return new Promise((resolve, reject) => {
                updateStatus(id).then(response => {
                    console.log(response);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })

        },
        getAllUsers({ commit }) {
            return new Promise((resolve, reject) => {
                getAllUsers().then(response => {
                    const { data } = response
                    commit('SET_USERS', response);
                    console.log(response);
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        updateStatusUser({ commit }, id) {
            return new Promise((resolve, reject) => {
                updateStatusUser(id).then(response => {

                    console.log(response);
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //getAllRoles
        getAllRoles({ commit }) {
            return new Promise((resolve, reject) => {
                getAllRoles().then(response => {

                    console.log(response);
                    commit("CHANGE_ROLES", response);
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //updateRoles
        updateRoles({ commit }, data) {
            return new Promise((resolve, reject) => {
                updateRoles(data).then(response => {

                    console.log(response);

                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

    },
    modules: {
        provider: moduleProvider,
        cart: moduleCart,
        product: moduleProduct,
        comments: moduleComment,
        user: moduleUser,
        address: moduleAddress,
        dialog: moduleDialog
    }

})