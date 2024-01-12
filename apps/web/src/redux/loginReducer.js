const initialState = {
    token: null,
    username: null,
    role: null
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload.token,
                username: action.payload.username,
                role: action.payload.role
            }
        case 'LOGOUT':
            return initialState
        default:
            return state
    }
}

export default loginReducer