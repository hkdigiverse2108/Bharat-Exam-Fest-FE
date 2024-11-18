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

export const logOutAdmin = (data) => {
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

export const bannerDataList = (data) => {
    return {
      type: "BANNER",
      payload: data,
    };
  };

  export const editBanner = (data) => {
    return {
      type: "EDITIMG",
      payload: data,
    };
  };
  export const updateImageData = (data) => ({
    type: "UPDATE_IMAGE_DATA",
    payload: data,
  });

  export const howtoplayList = (data) => {
    return {
      type: "HOW_TO_PLAY",
      payload: data,
    };
  };
  export const setTearmAndConditionData = (data) => {
    return {
      type: 'SET_DATA',
      payload: data,
    };
  };