import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
axios.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error);
    if (error?.response?.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("tokenAccess");
    }
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
    <App />
 //</React.StrictMode>
);