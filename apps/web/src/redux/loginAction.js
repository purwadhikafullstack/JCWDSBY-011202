export const loginSuccess = (token, username) => ({
    type: 'LOGIN_SUCCESS',
    payload: {
        token,
        username,
    },
});

export const logout = () => ({
    type: 'LOGOUT',
});