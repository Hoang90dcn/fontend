import { loadProductHomePage, loadAllProduct, addProduct, deleteProduct, getDetailProduct } from '../api/product'


const moduleProduct = {
    state: {
        product: [],
        editProduct: '',

    },
    mutations: {
        SET_PRODUCT(state, product) {
            console.log(product);
            state.product = product;
        },
        SET_EditProduct(state, editProduct) {
            state.editProduct = editProduct;
        },

    },
    actions: {
        loadHomePage({ commit }) {
            return new Promise((resolve, reject) => {
                loadProductHomePage().then(response => {
                    commit('SET_PRODUCT', response.content);
                    console.log(response.content);

                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        loadAllProduct({ commit }) {
            return new Promise((resolve, reject) => {
                loadAllProduct().then(response => {
                    commit('SET_PRODUCT', response);
                    console.log(response);

                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        addProduct({ commit }, data) {


            return new Promise((resolve, reject) => {
                addProduct(data).then(response => {
                    console.log(response);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })

        },
        deleteProduct({ commit }, product_id) {

            return new Promise((resolve, reject) => {
                deleteProduct(product_id).then(response => {
                    console.log(response);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })

        },
        loadDetailProduct({ commit }, product_id) {
            getDetailProduct;
            return new Promise((resolve, reject) => {
                getDetailProduct(product_id).then(response => {
                    console.log(response);
                    commit('SET_EditProduct', response);
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

export { moduleProduct }