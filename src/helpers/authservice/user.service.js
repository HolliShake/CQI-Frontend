import axios from 'axios';
import { authHeader } from './auth-header';

export const userService = {
    login,
    logout,
    register,
    getAll,
};

function login(email, password) {
    return axios.post("/api/Auth/Login", {
        email: email,
        password: password  
    })
    .then(handleResponse)
    .then(user => {
        // eslint-disable-next-line no-console
        console.log(email, password, user);

        // login successful if there's a jwt token in the response
        if (user.accessToken) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`/users/register`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    const data = response.data;

    if (response.statusText != "OK") {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            location.reload(true);
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return Promise.resolve(data);
}
