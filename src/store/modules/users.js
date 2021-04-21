const state = {
    me: {},
    users: [],
    selectedUser: {
        user: {},
        message: []
    }
}

const mutations = {
    SET_ME: (state, data) => {
        state.me = data
    },
    SET_USERS: (state, data) => {
        state.users =  data 
    }, 
    SET_SELECT_USER: (state, data) => {
        state.selectedUser.user = data
    }, 
    SET_MESSAGE_USER_SELECT: (state, data) => {
        state.selectedUser.message.push(data) 
    }
}

const actions = {
    setMe({commit}, data){
        commit('SET_ME', data)
    },
    setUsers({commit}, data){
        commit('SET_USERS', data)
    },
    setSelectUser({commit}, data){
        commit('SET_SELECT_USER', data)
    },
    setSelectUserMessage({commit}, data){
        commit('SET_MESSAGE_USER_SELECT', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}