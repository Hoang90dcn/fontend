import { postComment, getCommentByProduct } from '../api/comment'


const moduleComment = {
    state: {
        comments: [],
    },
    getters: {},
    mutations: {
        CHANGE_COMMENTS(state, comments) {
            state.comments = comments;
        }
    },
    actions: {
        getComment({ commit }, { id_product, page }) {

            getCommentByProduct(id_product, page).then(response => {
                console.log(response);
                commit('CHANGE_COMMENTS', response.content);
            }).catch(error => {
                reject(error)
            })
        },
        async postCommentAction({ commit }, ob) {
            await postComment({ "content": ob.content }, ob.id_product)
        },
        async addComment({ dispatch, commit }, { id_product, content, page }) {
            console.log("trươc all")
            await dispatch('postCommentAction', { id_product, content });
            console.log("sau post ");
            console.log("trước get")
            await dispatch('getComment', { id_product, page });
            console.log("sau get");
        }

    }

}
export { moduleComment }