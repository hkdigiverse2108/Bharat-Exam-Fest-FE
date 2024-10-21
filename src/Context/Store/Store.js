// import { useEffect } from "react";
import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import rootReducer from "../reducers/index";
import loggerMiddleware from "../Middleware/Logger";
import monitorReducerEnhancer from "../Enhancer/MonitorReducer";

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunk);
const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer);

// const Store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(loggerMiddleware),
//   enhancers: (getDefaultEnhancers) =>
//     getDefaultEnhancers().concat(composedEnhancers),
//   preloadedState : persistedState,
// });

// const saveDataFromStorage = (state) => {
//   try {
//     const storageData = JSON.stringify(state);
//     localStorage.setItem("auth", storageData);
//   } catch (error) {
//     console.warn(error.message);
//   }
// };

const loadDataFromStorage = () => {
  try {
    if (localStorage.getItem("auth")) {
      return JSON.parse(localStorage.getItem("auth"));
    } else {
      return undefined;
    }
  } catch (error) {
    console.warn(error.message);
  }
};

const Store = createStore(
  rootReducer,
  loadDataFromStorage(),
  composedEnhancers,
);

// Store.subscribe(() => {
//   saveDataFromStorage(Store.getState());
// });
// if (process.env.NODE_ENV !== "production" && module.hot) {
//   module.hot.accept("../reducers/index", () =>
//     Store.replaceReducer(rootReducer)
//   );
// }

export default Store;
