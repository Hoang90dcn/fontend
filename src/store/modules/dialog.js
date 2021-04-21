const moduleDialog = {
    state: {
        login: false,
    },
    mutations: {
        CHANGE_LOGIN(state, login) {
            console.log(login);
            state.login = login;

        },


    },
    actions: {


    },
    getters: {

    },

}
export { moduleDialog }