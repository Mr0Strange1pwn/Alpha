import axios from 'axios'

const BASE_URL ='http://mtmohali.dyndns.org:8034/api/Account'

export const Axios = axios.create({
    baseURL: BASE_URL,
})