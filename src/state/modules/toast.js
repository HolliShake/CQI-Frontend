import Vue from "vue";



export const actions = {
    // eslint-disable-next-line no-unused-vars
    success({dispatch, commit}, message) {
        Vue.$toast.success(message);
    },
    // eslint-disable-next-line no-unused-vars
    error({dispatch, commit}, message) {
        Vue.$toast.error(message);
    },
    // eslint-disable-next-line no-unused-vars
    info({dispatch, commit}, message) {
        Vue.$toast.info(message);
    },
    // eslint-disable-next-line no-unused-vars
    connectionProblem({dispatch, commit}) {
        Vue.$toast.error("Something went wrong, check your connection!");
    },
}