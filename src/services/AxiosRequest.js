// cSpell:word tiaozhuan
import axios from 'axios';

const BASE_URL = `api/`;

const AxiosRequest = axios.create({
    baseURL: BASE_URL
});

window.isPing = false;
window.tiaozhuan = (url) => {
    if (!window.isPing) {
        window.isPing = true
        location.href = url
    }
}
AxiosRequest.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    const { response } = error
    if (response.status === 401) {
        let r = response.data
        let href = encodeURIComponent(location.host + "/#/login")
        window.tiaozhuan(r.message + `?callback=${href}`)
    }
    return Promise.reject(error);
})

export default AxiosRequest









