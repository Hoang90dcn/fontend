import { localStorageCart } from '../utils/localStorage'
import { saveCart, getAllCart, confirm, cancel } from '../api/cart'

const moduleCart = {

    state: () => ({
        cart: [],
        address: '',
        listCart: [],


    }),
    mutations: {
        CHANGE_ADDRESS(state, address) {
            state.address = address;

        },

        getLocalStorage: function(state) {

            state.cart = JSON.parse(localStorage.getItem("cart") || "[]");

        },
        addItem: function(state, newItem) {
            console.log(newItem);
            if (state.cart.length == 0) {
                state.cart.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    amount: newItem.amount,
                    avatar: newItem.avatar,
                });
            } else {
                let check = true;
                for (let i = 0; i < state.cart.length; i++) {
                    if (state.cart[i].id === newItem.id) {
                        state.cart[i].amount += 1;
                        check = false;
                    }
                }
                if (check) {
                    state.cart.push({
                        id: newItem.id,
                        name: newItem.name,
                        price: newItem.price,
                        amount: newItem.amount,
                        avatar: newItem.avatar,
                    });
                }
            }
            localStorageCart.setLocalStorage(state.cart);
        },
        deleteItemInCart(state, item) {
            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].id === item.id) {
                    state.cart.splice(i, 1);
                }
            }
            localStorageCart.setLocalStorage(state.cart);
        },
        editItemInCart(state, item) {
            console.log(item);
            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].id === item.id) {
                    state.cart[i].amount = item.amount;
                }
            }
            localStorageCart.setLocalStorage(state.cart);
        },
        SET_CART(state) {
            state.cart = [];
            localStorageCart.setLocalStorage(state.cart);


        },
        CHANGE_listCart(state, listCart) {
            state.listCart = listCart;
        }



    },
    actions: {
        saveCart({ commit, state }) {
            return new Promise((resolve, reject) => {
                saveCart({
                    list: state.cart,
                    address: state.address,
                }).then(response => {
                    console.log(response)
                    commit('SET_CART');
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getAllCart({ commit }) {
            return new Promise((resolve, reject) => {
                getAllCart().then(response => {
                    console.log(response)
                    commit('CHANGE_listCart', response);

                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        confirm({ commit }, cart_id) {
            return new Promise((resolve, reject) => {
                confirm(cart_id).then(response => {
                    console.log(response)


                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        cancelCart({ commit }, cart_id) {
            //cancel
            return new Promise((resolve, reject) => {
                cancel(cart_id).then(response => {
                    console.log(response);
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



export {
    moduleCart
}