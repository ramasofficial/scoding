import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    //withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

const apiClientOn = (props) => axios.create({
    baseURL: "http://127.0.0.1:8000/",
    //withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + props.accessToken
    }
});

export { apiClient, apiClientOn };