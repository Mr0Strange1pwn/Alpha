import axios from 'axios'

const BASE_URL = 'https://alpha-production.herokuapp.com/api'

export const Axios = axios.create({
    baseURL: BASE_URL,
})