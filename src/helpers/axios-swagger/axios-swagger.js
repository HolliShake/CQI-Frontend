import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import store from '@/state/store'

const axiosSwagger = axios.create({
    baseURL: process.env.VUE_APP_SWAGGER_URL
});
 
axiosSwagger.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
axiosSwagger.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

axiosSwagger.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.auth.user.accessToken}`;
    // config.headers.Authorization = `'x-access-token': ${store.state.account.auth.user.token}`;
    return config;
});

axiosSwagger.interceptors.response.use(response => response, error => {

    if (error.code === "ERR_NETWORK")
    {
        Vue.$toast.error("Something went wrong, check your connection!", {
            duration: 7000
        });
        return Promise.reject(error);
    }
    
    if (error.response.status === 404) {
      router.push({name: '404'})
    }
    else if(error.response.status === 400){
        // console.log('error', error);
        if(error?.response?.data?.errors ?? null){
            const errors = error.response.data.errors;
            const keys = Object.keys(errors);

            keys.forEach((key) => {

                errors[key].forEach((errorData) => {

                    let errorMsg = `${key}: ${errorData}`;
                    // console.log(errorMsg);

                    Vue.$toast.error(errorMsg, {
                        duration: 7000
                    });
                });
            });

        }
    }
    else{

        // console.log('error', error);
        if (error.code && error.message) { 
            Vue.$toast.error(error.message, {
                duration: 7000
            });
        }

    }

    return Promise.reject(error);
});



export {
    axiosSwagger
};