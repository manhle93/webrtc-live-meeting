const state = {
    me: {},
    usernameAlreadySelected: false,
    users: {}
}

const mutations = {
    SET_ME: (state, data) => {
        state.me = data
    },
    SET_USERS: (state, data) => {
        state.users = data
    }
}

const actions = {
    setMe({commit}, data){
        commit('SET_ME', data)
    },
    setUsers({commit}, data){
        commit('SET_USERS', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}