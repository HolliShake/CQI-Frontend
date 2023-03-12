

export const state = {
    data: null
};

export const getters = {
    data: () => state.data
}

export const actions = {

    // eslint-disable-next-line no-unused-vars
    createSchool(x={}, {modal, target}) {
        modal.show(target)
    },

    updateSchool({commit}, {modal, target, data}) {
        commit("setData", data)
        modal.show(target)
    },

    clear({commit}) {
        commit("clearData")
    }

}

export const mutations = {
    setData(state, data) {
        state.data = data
    },

    clearData(state) {
        state.data = null
    }
}