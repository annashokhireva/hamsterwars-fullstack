const { default: axios } = require("axios");

const BASE_URL = "http://localhost:5000/api/";
const PRODUCTS_URL = `${BASE_URL}products`;
const REGISTER_URL = `${BASE_URL}register`;
const AUTH_URL = `${BASE_URL}auth`;
const ORDERS_URL = `${BASE_URL}orders`;
const USER_URL = `${BASE_URL}me`;

const get = async(url) => {
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.log(error);
    }
};

const post = async(url, obj) => {
    try {
        const response = await axios.post(url, obj);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const setToken = (token) => {
	console.log(token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export { USER_URL, AUTH_URL, REGISTER_URL, PRODUCTS_URL, ORDERS_URL, get, post, setToken }