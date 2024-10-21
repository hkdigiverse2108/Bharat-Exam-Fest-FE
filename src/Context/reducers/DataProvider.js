const initialData = {
  User: [],
  Admin: [],
  Logintype: "User",
};

const DataProvider = (state = initialData, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        User: [...state.User, action.payload],
      };

    case "LOGIN_ADMIN":
      return {
        ...state,
        Admin: [...state.Admin, action.payload],
      };

    case "LOGIN_TYPE":
      return {
        ...state,
        Logintype: action.payload,
      };

    case "UPDATE":
      return {
        ...state,
        User: [action.payload],
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
