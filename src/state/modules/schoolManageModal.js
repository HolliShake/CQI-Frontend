

export const state = {
    school: null
};

export const getters = {
    school: () => state.school
}

export const actions = {

    show({commit}, {modal, target, data}) {
        commit("setData", data)
        modal.show(target)
    },

    clear({commit}) {
        commit("clearData")
    }

}

export const mutations = {
    setData(state, data) {
        state.school = data
    },

    clearData(state) {
        state.school = null
    }
}