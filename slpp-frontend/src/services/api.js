import axios from "axios";

const API_BASE_URL = "https://localhost:8443/slpp";

//Get token from the localstorage
export const getToken = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    return localStorage.getItem(`jwt_${currentUser}`);
  }
  return null;
};

//Set token and other details
const setToken = (email, token, fullName, role) => {
  localStorage.setItem(`jwt_${email}`, token);
  localStorage.setItem("currentUser", email);
  localStorage.setItem("currentUserFullName", fullName);
  localStorage.setItem("currentUserRole", role);
};

//Delete token
const removeToken = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    localStorage.removeItem(`jwt_${currentUser}`);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserFullName");
    localStorage.removeItem("currentUserRole");
    localStorage.setItem("logout", Date.now());
  }
};

//Intercept request
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//Intercept response
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      removeToken();

      if (window.location.pathname.startsWith("/petitioner")) {
        window.location.href = "/petitioner/login";
      } else if (window.location.pathname.startsWith("/petitions-committee")) {
        window.location.href = "/petitions-committee/login";
      }
    }
    return Promise.reject(error);
  }
);

//Register API hit
export const registerPetitioner = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/petitioner/register`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Registration failed");
  }
};

//Get toke n from backend and set it in localstorage
export const loginPetitioner = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(`${API_BASE_URL}/petitioner/login`, data);
    console.log(response);

    const token = response.data.token;
    const name = response.data.fullName;
    const email = data.email;
    setToken(email, token, name, "PETITIONER");
    return "Login successful!";
  } catch (error) {
    throw new Error(error.response?.data || "Petitioner login failed");
  }
};

//Get toke n from backend and set it in localstorage
export const loginAdmin = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/petitions-committee/login`,
      data
    );
    const token = response.data.token;
    const email = data.email;
    const name = response.data.fullName;
    setToken(email, token, name, "PETITIONS_COMMITTEE");
    return "Login successful!";
  } catch (error) {
    throw new Error(error.response?.data || "Admin login failed");
  }
};

export const logout = () => {
  removeToken();
  window.location.href = "/";
};

//User is logged in in multiple tabs and logs out of one of the tabs others should also be loged out
window.addEventListener("storage", (event) => {
  if (event.key === "logout") {
    localStorage.clear();
    window.location.href = "/";
  }
});
