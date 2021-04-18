const state = {
    miniSidebar: false
}
const mutations = {
    TOGGLE_SIDEBAR: (state) => {
        state.miniSidebar = !state.miniSidebar
    }
}

const actions = {
    toggleSidbar({ commit }) {
        commit("TOGGLE_SIDEBAR")
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}