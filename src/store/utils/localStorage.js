var localStorageCart = {

    getLocalStorage: function() {
        var cart = JSON.parse(localStorage.getItem("cart") || "[]");
        return cart;
    },
    setLocalStorage: function(cart) {

        localStorage.setItem("cart", JSON.stringify(cart));
    },

}
export {
    localStorageCart
}