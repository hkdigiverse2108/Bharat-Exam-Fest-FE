import { editContestTypeData } from "../Action";

const initialData = {
  privacyPolicy: null,
  bannerDataList: [],
  imageData: [],
  tearmAndCondition: null,
  howtoplayData: [],
  contestData: [],
  editContestData: null,
  contestType: [],
  editContestTypeData: null,
  classesData: [],
  subjectList: [],
  editSubjectData: null,
  subtopicList: [],
  Logintype: "Admin",
};

const DataProvider = (state = initialData, action) => {
  switch (action.type) {
    case "SET_PRIVACY_POLICY":
      return {
          ...state,
          privacyPolicy: action.payload,
          errorMessage: '',
      };
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
        imageData: action.payload,
      };

    case "HOW_TO_PLAY":
      return {
        ...state,
        howtoplayData: [action.payload],
      };

    case "SET_DATA":
      return {
        ...state,
        tearmAndCondition: action.payload,
      };

    case "SET_CONTEST_DATA":
      return { ...state, contestData: action.payload };

    case "CONTEST_TYPE":
      return { ...state, contestData: action.payload };

    case "EDIT_CONTEST_DATA":
      return {
        ...state,
        editContestData: action.payload,
      };

    case "EDIT_CONTEST_TYPE_DATA":
      return {
        ...state,
        editContestTypeData: action.payload,
      };

    case "ADD_CLASSES_DATA":
      return {
        ...state,
        classesData: [...state.classesData, action.payload],
      };

    case "SUBJECT_LIST":
      return {
        ...state,
        subjectData: action.payload,
      };

    case "SUBJECT_EDIT":
      return {
        ...state,
        editSubjectData: action.payload,
      };

    case "SUBTOPICS":
      return {
        ...state,
        subtopicList: action.payload,
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
