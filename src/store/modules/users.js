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
    
}