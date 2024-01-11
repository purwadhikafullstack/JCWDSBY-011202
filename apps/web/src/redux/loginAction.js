export const loginSuccess = (token, username, role) => ({
    type: 'LOGIN_SUCCESS',
    payload: {
        token,
        username,
        role
    },
});

export const logout = () => ({
    type: 'LOGOUT',
})