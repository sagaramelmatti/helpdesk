export const getUserLocalStorageData = () => {
  const userInfo = {
    name: localStorage.getItem("name") || "",
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || "",
    email: localStorage.getItem("email") || "",
    userId: localStorage.getItem("userId") || "",
  };
  return userInfo;
};

export const removeUserLocalStorageData = () => {
  const userInfo = {
    name: localStorage.removeItem("name") || "",
    token: localStorage.removeItem("token") || "",
    role: localStorage.removeItem("role") || "",
    email: localStorage.removeItem("email") || "",
    userId: localStorage.removeItem("userId") || "",
  };
  return userInfo;
};
