import $http from "./httpInstance";

const getRequest = (url) => {
    return $http.get(url);
}

export { getRequest };