export const loginUser = (data) => {
    return {
        type: "LOGIN_USER",
        payload: data,
    };
}

export const loginAdmin = (data) => {
    return {
        type: "LOGIN_ADMIN",
        payload: data
    };
}

export const loginType = (data) => {
    return {
        type: "LOGIN_TYPE",
        payload: data
    };
}

export const logOut = (data) => {
    return {
        type: "LOGOUT",
        payload: data
    };
}

export const updateData = (data) => {
    return {
        type: "UPDATE",
        payload: data
    };
}
