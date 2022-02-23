import axios from 'axios';

// export default axios.create({
//   // localURL: https://localhost:5000
//   // baseURL: "https://api.letspondr.com", // I will make this official eventually
//   baseUrl: 'https://merlinv1.azurewebsites.net/'
// });

const merlinApp = axios.create({
    // baseURL: 'http://dev.letspondr.com/'
    baseURL: 'https://prod.letspondr.com/'
    // baseURL: 'http://localhost:5000/'
});

export default merlinApp;
