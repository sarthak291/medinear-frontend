export const getStoreToken = () => {
  return localStorage.getItem("storeToken");
};

export const isStoreLoggedIn = () => {
  return !!localStorage.getItem("storeToken");
};

export const logoutStore = () => {
  localStorage.removeItem("storeToken");
  window.location.href = "/store/login";
};
