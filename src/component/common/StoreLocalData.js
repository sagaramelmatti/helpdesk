export const getUserLocalStorageData = () => {
  const userInfo = {
    username: localStorage.getItem("username") || "",
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || "",
  };
  return userInfo;
};

export const removeUserLocalStorageData = () => {
  const userInfo = {
    username: localStorage.removeItem("username") || "",
    token: localStorage.removeItem("token") || "",
    role: localStorage.removeItem("role") || "",
  };
  return userInfo;
};
