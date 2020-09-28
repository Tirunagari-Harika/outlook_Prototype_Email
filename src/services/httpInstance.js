import axios from "axios";

const $http = axios.create({
    baseURL: window.location.origin,
    contentType: "application/json"
});

$http.interceptors.request.use((config) => {
    console.log("SERVER REQUEST: ", config.url);
    return config;
}, (err) => {
    console.log("SERVER REQUEST: Error", err);
    return Promise.reject(err);
});

$http.interceptors.response.use((config) => {
    console.log("SERVER RESPONSE: ", config);
    return config;
}, (err) => {
    console.log("SERVER RESPONSE: Error", err);
    return Promise.reject(err);
});

export default $http;