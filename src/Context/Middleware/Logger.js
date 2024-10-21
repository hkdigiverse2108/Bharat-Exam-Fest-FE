const Logger = (store) => (next) => (action) => {
  try {
    console.group(action.type);
    console.info("dispatching", action);
    let result = next(action);
    const authState = store.getState();
    console.log("store data", authState);
    localStorage.setItem("auth", JSON.stringify(authState));
    console.groupEnd();
    return result;
  } catch (error) {
    console.warn(error);
  }
};

export default Logger;
