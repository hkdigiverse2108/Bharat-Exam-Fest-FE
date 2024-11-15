
const initialData = {
  bannerDataList: [],
  Logintype: "Admin",
};

const DataProvider = (state = initialData, action) => {
  switch (action.type) {
    case "BANNER":
      return {
        ...state,
        bannerDataList: [action.payload],
      };

    case "QUESTIONS":
      return {
        ...state,
        Questions: [ action.payload],
      };

    case "CURRENT":
      return {
        ...state,
        CurrentSubject: [ action.payload],
      };

    case "LOGIN_TYPE":
      return {
        ...state,
        Logintype: action.payload,
      };

    case "EDIT":
      return {
        ...state,
        CurrentQue: [action.payload],
      };

    case "LOGOUT":
      return {
        User: [],
        Logintype: "User",
      };

    default:
      return state;
  }
};

export default DataProvider;
