const initialData = {
  bannerDataList: [],
  imageData: [],
  howtoplayData: [],
  Logintype: "Admin",
};

const DataProvider = (state = initialData, action) => {
  switch (action.type) {
    case "BANNER":
      return {
        ...state,
        bannerDataList: [action.payload],
      };

    case "EDITIMG":
      return {
        ...state,
        bannerDataList: state.bannerDataList.map((banner) =>
          banner._id === action.payload._id
            ? { ...banner, ...action.payload }
            : []
        ),
      };

    case "UPDATE_IMAGE_DATA":
      return {
        ...state,
        imageData: [action.payload],
      };
    case "HOW_TO_PLAY":
      return {
        ...state,
        howtoplayData: [action.payload],
      };

    case "LOGIN_TYPE":
      return {
        ...state,
        Logintype: action.payload,
      };

    case "LOGOUT":
      return state;

    default:
      return state;
  }
};

export default DataProvider;
