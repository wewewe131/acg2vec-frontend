import axios, { AxiosInstance } from "axios";

const http: AxiosInstance = axios.create({
    timeout: 50000,
    headers: { "X-Custom-Header": "foobar" },
    baseURL: process.env.NODE_ENV == 'production' ? 'https://acg2vec.cheerfun.dev/' : '/api'
});

http.interceptors.request.use((config) => {
    // Do something before request is sent
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
}
);

// Add a response interceptor
http.interceptors.response.use((response) => {
    // Do something with response data
    return response;
}, (error) => {
    // 判断是否404
    // if (error.response.status === 404) {
    //     console.log("404");
    // }
    console.log(error);

    // Do something with response error
    return Promise.reject(error);
}
);

export default http;