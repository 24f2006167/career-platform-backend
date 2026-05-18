// import axios from "axios";

// const API = axios.create({
//   // baseURL: "http://127.0.0.1:8000",
//     baseURL: "http://localhost:8000",

// });

// export default API;

import axios from "axios";

const API = axios.create({

  baseURL: "http://localhost:8000",

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },

});

export default API;