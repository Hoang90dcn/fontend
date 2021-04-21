import Vue from 'vue'
import Vuex from 'vuex'
import { axios } from './utils/axios'
import { moduleProvider } from './modules/provider'
import { moduleCart } from './modules/cart'
import { postComment } from './api/comment'
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
        productSearch: {},
        numberProduct: 0,
        loading: false,




    },
    getters: {




    },
    mutations: {


        CHANGE_LOADING(state, loading) {
            state.loading = loading;
        },


        //     }
        // },
        // SEARCH_KEY(state, ob) {
        //     const URL = "http://localhost:9000/api/test3?key=" + ob.key + "&page=" + ob.page;
        //     const axios = require("axios").default;
        //     axios.get(URL).then((response) => {

        //         state.productSearch = response.data;

        //     });


        // },
        LOAD_CARTEGORY(state, ob) {
            const URL = "http://localhost:9000/api/find-all-by-category?id_category=" + ob.key + "&page=" + ob.page;
            axios.get(URL).then((response) => {
                state.productSearch = response.data;
            });
            console.log(URL);
        },
        ADD_COMMENT(state, ob) {

            postComment({ "content": ob.content }, ob.id_product);



        },

        GET_NEW_CART(state) {
            const URL = "http://localhost:9000/api/find-all-new-cart?page=0";

            axios.get(URL).then((response) => {
                state.cart = response.data

            });
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

        },




        DELETE_PRODUCT(state, id_product) {
            console.log(id_product)



            const URL = "http://localhost:9000/api/delete-product/" + id_product;
            axios.delete(URL)
                .then(response => {
                    alert("Xóa Thành Thành Công");
                })
                .catch(e => {
                    alert("Xóa Thất Bại !!!");
                })
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },

    },
    actions: {

        addItem(context, ob) {
            context.commit("ADD_Item", ob);
        },
        getNumerItem(context) {
            context.commit("Get_Item");
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