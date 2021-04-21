import { localStorageCart } from '../utils/localStorage'
import { saveCart } from '../api/cart'

const moduleCart = {

    state: () => ({
        cart: [],
        address: '',

    }),
    mutations: {
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


        }



    },
    actions: {
        saveCart({ commit, state }) {
            return new Promise((resolve, reject) => {
                saveCart({ list: state.cart }).then(response => {
                    console.log(response)
                    commit('SET_CART');

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